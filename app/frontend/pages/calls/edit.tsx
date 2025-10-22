import React from 'react'
import CallForm from './CallForm'
import { Link } from '@inertiajs/react'
import { Navbar } from '../../components/Navbar'
import { Button } from '../../components/ui/button'

// TypeScript interfaces for the data structure
interface Company {
  id: number
  name: string
}

interface Participant {
  id: number
  name: string
}

interface Call {
  id?: number
  call_date?: string
  call_time?: string
  transcript_file?: string
  participant_ids?: number[]
}

interface Props {
  company: Company
  call: Call
  participants: Participant[]
}

export default function CallsEdit({ company, call, participants }: Props) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar>
        <Button asChild size="sm" variant="outline">
          <Link href={`/companies/${company.id}`}>
            Back to Company
          </Link>
        </Button>
      </Navbar>

      <main className="container mx-auto px-4 py-8" role="main">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Edit Call for {company.name}</h1>
            <p className="text-muted-foreground">
              Update call details and transcript from {call.call_date && formatDate(call.call_date)}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
            <CallForm company={company} call={call} participants={participants} />
          </div>
        </div>
      </main>
    </div>
  )
}
