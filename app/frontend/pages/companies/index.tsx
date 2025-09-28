import React from 'react'
import Layout from '../../components/Layout'
import { Link } from '@inertiajs/react'
import { ThemeToggle } from '../../components/ThemeToggle'

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
              href="/companies/new"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Add New Company
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 w-full" role="main">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Portfolio Companies</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-card rounded-lg shadow-md hover:shadow-lg transition duration-200 p-6 border border-border"
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
                    <h2 className="text-xl font-semibold text-card-foreground mb-1">
                      {company.name}
                    </h2>
                    {company.tagline && (
                      <p className="text-muted-foreground text-sm mb-2">{company.tagline}</p>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      {company.year && (
                        <span>Founded {company.year}</span>
                      )}
                      {company.size && (
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                          {company.size} employees
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/companies/${company.id}`}
                    className="text-primary hover:text-primary/80 text-sm"
                  >
                    View
                  </Link>
                  <Link
                    href={`/companies/${company.id}/edit`}
                    className="text-chart-2 hover:text-chart-2/80 text-sm"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/companies/${company.id}`}
                    method="delete"
                    data={{ confirm: 'Are you sure?' }}
                    className="text-destructive hover:text-destructive/80 text-sm"
                  >
                    Delete
                  </Link>
                </div>
              </div>
              
              {company.website && (
                <p className="text-muted-foreground mb-3">
                  <span className="inline-flex items-center">
                    🌐 
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-primary hover:underline"
                    >
                      {company.website}
                    </a>
                  </span>
                </p>
              )}

              <div className="border-t border-border pt-3">
                <h3 className="text-sm font-medium text-card-foreground mb-2">Founders</h3>
                {company.founders && company.founders.length > 0 ? (
                  <div className="space-y-1">
                    {company.founders.map((founder) => (
                      <div
                        key={founder.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-card-foreground">{founder.name}</span>
                        {founder.linkedin && (
                          <a
                            href={founder.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80"
                          >
                            LinkedIn
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No founders listed</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {companies.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🏢</div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                No companies yet
              </h2>
              <p className="text-muted-foreground mb-6">
                Start building your portfolio by adding your first company.
              </p>
              <Link
                href="/companies/new"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-lg transition duration-200"
              >
                Add First Company
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
