import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
  plugins: [react(), githubPagesSpaFallback()],
})
