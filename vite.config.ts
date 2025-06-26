import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    allowedHosts: [
      'localhost',
      'aed4-2409-4081-1212-a8f0-edd2-6a93-e97c-e416.ngrok-free.app'
    ]
  }
})
