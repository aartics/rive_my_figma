import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/rive_my_figma/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
