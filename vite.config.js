import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { dirname } from 'path'
import { resolve } from 'path'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    {
      name: 'copy-404-plugin',
      closeBundle() {
        const outputPath = resolve(dirname(fileURLToPath(import.meta.url)), 'dist')
        const indexFile = resolve(outputPath, 'index.html')
        const errorFile = resolve(outputPath, '404.html')

        fs.copyFileSync(indexFile, errorFile)
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: './',
})
