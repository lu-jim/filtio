import React from 'react'
import CallForm from './CallForm'
import { Link } from '@inertiajs/react'
import { Navbar } from '../../components/Navbar'

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
      <Navbar />

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
