import React from 'react'
import Layout from '../../components/Layout'
import CallForm from './CallForm'
import { ThemeToggle } from '../../components/ThemeToggle'
import { Link } from '@inertiajs/react'

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

export default function CallsNew({ company, call, participants }: Props) {
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
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Back to Company
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8" role="main">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">New Call for {company.name}</h1>
            <p className="text-muted-foreground">Record a new investment call and transcript</p>
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
