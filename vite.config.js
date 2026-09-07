import { copyFileSync, existsSync, readdirSync } from 'node:fs'
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

function githubPagesSpaFallback() {
  return {
    name: 'github-pages-spa-fallback',
    writeBundle() {
      const dist = import.meta.dirname
      copyFileSync(resolve(dist, 'dist/index.html'), resolve(dist, 'dist/404.html'))
    },
  }
}

export default defineConfig({
  // User site: https://brianlogic.github.io/
  base: '/',
  plugins: [react(), projectMediaCatalog(), githubPagesSpaFallback()],
})
