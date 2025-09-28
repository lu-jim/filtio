import React from 'react'
import Layout from '../../components/Layout'
import { Link } from '@inertiajs/react'

// TypeScript interfaces for the data structure
interface Founder {
  id: number
  name: string
  linkedin?: string
}

interface Company {
  id: number
  name: string
  website?: string
  logo?: string
  tagline?: string
  year?: number
  size?: '0-10' | '50-100' | '100-250' | '+250'
  founders?: Founder[]
}

interface Props {
  companies: Company[]
}

export default function CompaniesIndex({ companies }: Props) {
  return (
    <Layout>
      React version
      <div className="container mx-auto px-4 py-8 w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Companies</h1>
          <Link
            href="/companies/new"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Add New Company
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 p-6 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-3">
                  {company.logo && (
                    <img 
                      src={company.logo} 
                      alt={`${company.name} logo`}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">
                      {company.name}
                    </h2>
                    {company.tagline && (
                      <p className="text-gray-600 text-sm mb-2">{company.tagline}</p>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      {company.year && (
                        <span>Founded {company.year}</span>
                      )}
                      {company.size && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {company.size} employees
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/companies/${company.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    View
                  </Link>
                  <Link
                    href={`/companies/${company.id}/edit`}
                    className="text-green-600 hover:text-green-800 text-sm"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/companies/${company.id}`}
                    method="delete"
                    data={{ confirm: 'Are you sure?' }}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </Link>
                </div>
              </div>
              
              {company.website && (
                <p className="text-gray-600 mb-3">
                  <span className="inline-flex items-center">
                    🌐 
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-blue-600 hover:underline"
                    >
                      {company.website}
                    </a>
                  </span>
                </p>
              )}

              <div className="border-t pt-3">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Founders</h3>
                {company.founders && company.founders.length > 0 ? (
                  <div className="space-y-1">
                    {company.founders.map((founder) => (
                      <div
                        key={founder.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-900">{founder.name}</span>
                        {founder.linkedin && (
                          <a
                            href={founder.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            LinkedIn
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No founders listed</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {companies.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🏢</div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                No companies yet
              </h2>
              <p className="text-gray-600 mb-6">
                Start building your portfolio by adding your first company.
              </p>
              <Link
                href="/companies/new"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
              >
                Add First Company
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
