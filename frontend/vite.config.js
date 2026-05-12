import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                // Keep the /api prefix when proxying to the backend so
                // requests like /api/contact map to http://localhost:3000/api/contact
                rewrite: (path) => path
            }
        }
    }
})
