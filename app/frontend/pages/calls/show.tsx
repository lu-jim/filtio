import React from 'react'
import Layout from '../../components/Layout'
import { Link } from '@inertiajs/react'
import { ThemeToggle } from '../../components/ThemeToggle'

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
  id: number
  call_date: string
  call_time: string
  transcript_file?: string
  participants: Participant[]
}

interface Props {
  company: Company
  call: Call
}

export default function CallsShow({ company, call }: Props) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const formatTranscript = (text: string) => {
    return text.split('\n').map((line, index) => (
      <p key={index} className="mb-2">
        {line}
      </p>
    ))
  }

  // Sort participants by name
  const sortedParticipants = [...call.participants].sort((a, b) => a.name.localeCompare(b.name))

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
              href={`/companies/${company.id}/calls/${call.id}/edit`}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Edit Call
            </Link>
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Call Details</h1>
            <p className="text-muted-foreground">
              {company.name} - {formatDate(call.call_date)} at {formatTime(call.call_time)}
            </p>
          </div>

          {/* Call Details Card */}
          <div className="bg-card rounded-lg shadow-lg p-8 mb-8 border border-border">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Call Info */}
              <div>
                <h2 className="text-xl font-semibold text-card-foreground mb-4">Call Information</h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-card-foreground">Date</label>
                    <p className="text-lg text-card-foreground">{formatDate(call.call_date)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-card-foreground">Time</label>
                    <p className="text-lg text-card-foreground">{formatTime(call.call_time)}</p>
                  </div>
                </div>
              </div>

              {/* Participants */}
              <div>
                <h2 className="text-xl font-semibold text-card-foreground mb-4">Participants</h2>
                {call.participants.length > 0 ? (
                  <div className="space-y-2">
                    {sortedParticipants.map((participant) => (
                      <div key={participant.id} className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        <span className="text-card-foreground">{participant.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No participants recorded</p>
                )}
              </div>
            </div>

            {/* Transcript */}
            <div>
              <h2 className="text-xl font-semibold text-card-foreground mb-4">Transcript</h2>
              <div className="bg-muted rounded-lg p-6 border border-border">
                {call.transcript_file ? (
                  <div className="prose prose-gray max-w-none text-card-foreground">
                    {formatTranscript(call.transcript_file)}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No transcript available</p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center space-x-4">
            <Link
              href={`/companies/${company.id}/calls/${call.id}/edit`}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-lg transition duration-200"
            >
              Edit Call
            </Link>
            <Link
              href={`/companies/${company.id}/calls/${call.id}`}
              method="delete"
              data={{ confirm: 'Are you sure? This will permanently delete the call and transcript.' }}
              className="bg-destructive hover:bg-destructive/90 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
            >
              Delete Call
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
