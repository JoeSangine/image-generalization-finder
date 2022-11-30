import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // string shorthand
      '/signup': 'http://localhost:8080',
      '/login': 'http://localhost:8080',
      '/user': 'http://localhost:8080',
      '/logout': 'http://localhost:8080',
    }
  }
})


