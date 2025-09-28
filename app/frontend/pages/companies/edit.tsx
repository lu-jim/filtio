import React from 'react'
import Layout from '../../components/Layout'
import CompanyForm from './CompanyForm'
import { Link } from '@inertiajs/react'
import { ThemeToggle } from '../../components/ThemeToggle'

// TypeScript interfaces for the data structure
interface Founder {
  id?: number
  name: string
  linkedin?: string
  _destroy?: boolean
}

interface Company {
  id?: number
  name: string
  website?: string
  logo?: string
  tagline?: string
  year?: number
  size?: '0-10' | '50-100' | '100-250' | '+250'
  founders: Founder[]
}

interface Props {
  company: Company
}

export default function CompaniesEdit({ company }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-8 py-6" role="banner">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-foreground">Filt.io</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href={`/companies/${company.id}`}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              View Company
            </Link>
            <Link
              href="/companies"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Back to Companies
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8" role="main">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Edit {company.name}</h1>
            <p className="text-muted-foreground">Update company information and manage founders.</p>
          </div>

          <CompanyForm company={company} />
        </div>
      </main>
    </div>
  )
}
