import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { cloudflare } from '@cloudflare/vite-plugin'
import { cp, mkdir, rm } from 'node:fs/promises'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [
    react(),
    cloudflare(),
    {
      name: 'sites-package-layout',
      apply: 'build',
      async closeBundle() {
        const root = process.cwd()
        await rm(resolve(root, 'dist/client/media/method-wick/incoming'), {
          recursive: true,
          force: true,
        })
        await rm(resolve(root, 'dist/server'), { recursive: true, force: true })
        await mkdir(resolve(root, 'dist/server'), { recursive: true })
        await cp(resolve(root, 'dist/metodo_wick/index.js'), resolve(root, 'dist/server/index.js'))
        await mkdir(resolve(root, 'dist/.openai'), { recursive: true })
        await cp(resolve(root, '.openai/hosting.json'), resolve(root, 'dist/.openai/hosting.json'))
      },
    },
  ],
  build: {
    target: 'es2022',
  },
})
