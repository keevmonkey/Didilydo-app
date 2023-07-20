import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import Components from 'unplugin-vue-components/vite'

import path from 'path'
import fs from 'node:fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      dirs: ['src/components/app']
    })
  ],
  optimizeDeps: {
    include: ['@fawmi/vue-google-maps', 'fast-deep-equal']
  },
  resolve: {
    alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/assets/_vars.scss" as *;'
      }
    }
  },
  server: {
    host: 'app.didilydo.dev',
    port: 8080,
    https: {
      key: fs
        .readFileSync(path.resolve(__dirname, '.ssl/_wildcard.didilydo.dev-key.pem'))
        .toString(),
      cert: fs.readFileSync(path.resolve(__dirname, '.ssl/_wildcard.didilydo.dev.pem')).toString()
    }
  },
  envDir: 'environments'
})
