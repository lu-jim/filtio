import React from 'react'
import CompanyForm from './CompanyForm'
import { Link } from '@inertiajs/react'
import { Navbar } from '../../components/Navbar'

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
  size?: string
  founders?: Founder[]
}

interface Props {
  company: Company
}

export default function CompaniesNew({ company }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8" role="main">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Add New Company</h1>
            <p className="text-muted-foreground">Add a new company to your portfolio with founder information.</p>
          </div>

          <CompanyForm company={company} />
        </div>
      </main>
    </div>
  )
}
