import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { resolvePageComponent } from './utils/resolve-page-component'

const appName = 'Filtio'

createInertiaApp({
  title: (title) => `${title ? `${title} - ` : ''}${appName}`,
  resolve: (name) => resolvePageComponent(name, import.meta.glob('./pages/**/*.tsx', { eager: true })),
  setup({ el, App, props }) {
    const root = createRoot(el)
    root.render(<App {...props} />)
  },
  progress: {
    color: '#4F46E5',
  },
})
