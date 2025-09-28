import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import RubyPlugin from 'vite-plugin-ruby'

export default defineConfig({
  plugins: [
    tailwindcss(),
    RubyPlugin(),
    react()
  ],
  resolve: {
    alias: {
      '@': '/app/frontend'
    }
  },
  server: {
    host: '192.168.10.10', // replace with the IP address of the Homestead machine
    https: false,
    cors: false,
    hmr: {
        host: '192.168.10.10', // replace with the IP address of the Homestead machine
    }
},
})
