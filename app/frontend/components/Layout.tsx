import { Link } from '@inertiajs/react'
import React, { Suspense } from 'react'

export default function Layout({ children }) {
  return (
    <div className="font-sans dark antialiased">
      <main>
        <header>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
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