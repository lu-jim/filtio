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
    // Use localhost by default (works well on WSL)
    host: 'localhost',
    // Let vite_ruby dictate the port via config/vite.json when used,
    // otherwise Vite defaults to 5173.
    hmr: {
      host: 'localhost',
    },
    watch: {
      ignored: [
        '**/.overmind.sock',
        '**/node_modules/**',
        '**/tmp/**',
        '**/log/**',
        '**/storage/**',
      ]
    }
  },
})
