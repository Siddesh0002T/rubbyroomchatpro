import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'Rubby Room Chat',
        short_name: 'RubbyChat',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#e81cff',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    allowedHosts: [
      'localhost',
      'aed4-2409-4081-1212-a8f0-edd2-6a93-e97c-e416.ngrok-free.app'
    ]
  }
});
