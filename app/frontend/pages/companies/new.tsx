import React from 'react'
import Layout from '../../components/Layout'
import CompanyForm from './CompanyForm'

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

export default function CompaniesNew({ company }: Props) {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Company</h1>
            <p className="text-gray-600">Add a new company to your portfolio with founder information.</p>
          </div>

          <CompanyForm company={company} />
        </div>
      </div>
    </Layout>
  )
}
