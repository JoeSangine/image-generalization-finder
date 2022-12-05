import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // string shorthand
      '/signup': 'http://localhost:8000',
      '/login': 'http://localhost:8000',
      '/user': 'http://localhost:8000',
      '/logout': 'http://localhost:8000',
      '/bad-images': 'http://localhost:8000',
      '/BadImages': 'http://localhost:8000',
    }
  }
})


