import React from 'react'
import CompanyForm from './CompanyForm'
import { Link } from '@inertiajs/react'
import { Navbar } from '../../components/Navbar'
import { Button } from '../../components/Button'

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
      <Navbar>
        <Button asChild size="sm">
          <Link href={`/companies/${company.id}`}>
            View Company
          </Link>
        </Button>
      </Navbar>

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
