import React from 'react'
import { Link, router } from '@inertiajs/react'
import { Navbar } from '../../components/Navbar'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from '../../components/Card'
import { Button, buttonVariants } from '../../components/Button'
import { Badge } from '../../components/Badge'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../components/AlertDialog'
import { Plus } from 'lucide-react'

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
      <Navbar>
        <Button asChild size="sm">
          <Link href="/companies/new">
            <Plus />
            Add Company
          </Link>
        </Button>
      </Navbar>

      <main className="max-w-[1600px] mx-auto px-8 py-8 w-full" role="main">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Portfolio Companies</h1>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {companies.map((company) => (
            <Card key={company.id} className="hover:shadow-lg transition-shadow h-full flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-4">
                  {company.logo && (
                    <div className="flex-shrink-0">
                      <img 
                        src={company.logo} 
                        alt={`${company.name} logo`}
                        className="w-12 h-12 rounded-lg object-cover border border-border"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg leading-tight mb-1.5">
                      {company.name}
                    </CardTitle>
                    {company.tagline && (
                      <CardDescription className="line-clamp-2 leading-snug">
                        {company.tagline}
                      </CardDescription>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 pb-4 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {company.year && (
                    <span className="text-xs text-muted-foreground">
                      Founded {company.year}
                    </span>
                  )}
                  {company.size && (
                    <Badge variant="secondary" className="text-xs">
                      {company.size} employees
                    </Badge>
                  )}
                </div>

                {company.website && (
                  <div className="flex items-center gap-1.5 text-sm">
                    <span className="text-muted-foreground">🌐</span>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline truncate text-sm"
                    >
                      {company.website}
                    </a>
                  </div>
                )}

                <div className="pt-2 border-t">
                  <div className="text-xs font-medium text-muted-foreground mb-2">
                    Founders
                  </div>
                  {company.founders && company.founders.length > 0 ? (
                    <div className="space-y-2">
                      {company.founders.map((founder) => (
                        <div
                          key={founder.id}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-foreground">{founder.name}</span>
                          {founder.linkedin && (
                            <Button 
                              variant="link" 
                              size="sm" 
                              asChild 
                              className="h-auto p-0 text-xs"
                            >
                              <a
                                href={founder.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                LinkedIn
                              </a>
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No founders listed</p>
                  )}
                </div>
              </CardContent>

              <CardFooter className="pt-3 pb-4 flex-wrap gap-2">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link href={`/companies/${company.id}`}>
                    View
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link href={`/companies/${company.id}/edit`}>
                    Edit
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="flex-1"
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete <strong>{company.name}</strong>. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className={buttonVariants({ variant: "destructive" })}
                        onClick={() => router.delete(`/companies/${company.id}`)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
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
              <Button size="lg" asChild>
                <Link href="/companies/new">
                  Add First Company
                </Link>
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
