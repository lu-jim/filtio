import { Link } from '@inertiajs/react'
import React, { Suspense } from 'react'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <main>
        <header className="border-b border-border px-8 py-6" role="banner">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-foreground">Filt.io</h1>
              </div>
            </div>
            <nav className="flex items-center gap-4">
              <Link 
                href="/" 
                className="text-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </header>
        <article>
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </article>
      </main>
      {/* <Analytics /> */}
    </div>
  )
}