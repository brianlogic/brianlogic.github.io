import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const MEDIA_RE = /\.(gif|png|jpe?g|webp|mp4|webm|mov)$/i
const VIRTUAL = 'virtual:project-media'
const VIRTUAL_ID = `\0${VIRTUAL}`

function projectMediaCatalog() {
  const root = () => resolve(import.meta.dirname, 'public/projects')

  const catalog = () => {
    const dir = root()
    const tree = {}
    if (!existsSync(dir)) return tree

    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue
      tree[entry.name] = readdirSync(resolve(dir, entry.name))
        .filter((name) => MEDIA_RE.test(name))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .map((name) => `/projects/${entry.name}/${name}`)
    }

    return tree
  }

  return {
    name: 'project-media-catalog',
    resolveId(id) {
      if (id === VIRTUAL) return VIRTUAL_ID
    },
    load(id) {
      if (id === VIRTUAL_ID) return `export default ${JSON.stringify(catalog())}`
    },
    configureServer(server) {
      server.watcher.add(root())
    },
    handleHotUpdate({ file, server }) {
      if (!file.replace(/\\/g, '/').includes('/public/projects/')) return
      const mod = server.moduleGraph.getModuleById(VIRTUAL_ID)
      if (mod) {
        server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }
    },
  }
}

// Per-route copies of index.html so /projects etc. get their own title and link preview,
// and are served with a 200 by GitHub Pages instead of the 404.html fallback.
const ROUTES = {
  experience: ['Experience', 'Internships and work experience of Brian Tran, full-stack developer and University of Virginia student.'],
  projects: ['Projects', 'Projects by Brian Tran: a Cursor dependency-risk extension, naval systems modeling, HoosMap, a crisis hotline agent, and TheCourseForum.'],
  about: ['About', 'About Brian Tran: computer science student at UVA, full-stack developer, and how to get in touch.'],
}

function githubPagesSpaFallback() {
  return {
    name: 'github-pages-spa-fallback',
    writeBundle() {
      const dist = resolve(import.meta.dirname, 'dist')
      const html = readFileSync(resolve(dist, 'index.html'), 'utf8')
      copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))

      for (const [route, [name, description]] of Object.entries(ROUTES)) {
        const title = `${name} · Brian Tran`
        const page = html
          .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
          .replace(/(name="description"\s+content=")[^"]*/, `$1${description}`)
          .replace(/(property="og:title" content=")[^"]*/, `$1${title}`)
          .replace(/(name="twitter:title" content=")[^"]*/, `$1${title}`)
          .replace(/(property="og:description"\s+content=")[^"]*/, `$1${description}`)
          .replace(/(name="twitter:description"\s+content=")[^"]*/, `$1${description}`)
          .replace(/(property="og:url" content="[^"]*?)\/"/, `$1/${route}"`)
        mkdirSync(resolve(dist, route), { recursive: true })
        writeFileSync(resolve(dist, route, 'index.html'), page)
      }
    },
  }
}

export default defineConfig({
  // User site: https://brianlogic.github.io/
  base: '/',
  plugins: [react(), projectMediaCatalog(), githubPagesSpaFallback()],
})
