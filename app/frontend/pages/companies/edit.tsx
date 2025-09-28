import React from 'react'
import Layout from '../../components/Layout'
import CompanyForm from './CompanyForm'
import { Link } from '@inertiajs/react'

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
  founders: Founder[]
}

interface Props {
  company: Company
}

export default function CompaniesEdit({ company }: Props) {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit {company.name}</h1>
              <p className="text-gray-600">Update company information and manage founders.</p>
            </div>
            <div className="flex space-x-3">
              <Link
                href={`/companies/${company.id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                View Company
              </Link>
            </div>
          </div>

          <CompanyForm company={company} />
        </div>
      </div>
    </Layout>
  )
}
