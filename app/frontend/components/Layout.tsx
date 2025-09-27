import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="container mx-auto mt-28 px-5 flex">
      {children}
    </main>
  )
}
