import React from 'react'
import { useForm, Link } from '@inertiajs/react'

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

export default function CallForm({ company, call, participants }: Props) {
  const { data, setData, post, put, errors, processing } = useForm({
    call_date: call.call_date || '',
    call_time: call.call_time || '',
    transcript_file: call.transcript_file || '',
    participant_ids: call.participant_ids || []
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (call.id) {
      put(`/companies/${company.id}/calls/${call.id}`)
    } else {
      post(`/companies/${company.id}/calls`)
    }
  }

  const handleParticipantChange = (participantId: number, checked: boolean) => {
    const newParticipantIds = checked 
      ? [...data.participant_ids, participantId]
      : data.participant_ids.filter(id => id !== participantId)
    
    setData('participant_ids', newParticipantIds)
  }

  const hasErrors = Object.keys(errors).length > 0

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {hasErrors && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-destructive" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-destructive">
                  Please fix the following errors:
                </h3>
                <div className="mt-2 text-sm text-destructive/80">
                  <ul className="list-disc pl-5 space-y-1">
                    {Object.values(errors).map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="call_date" className="block text-sm font-medium text-card-foreground mb-2">
              Call Date
            </label>
            <input
              type="date"
              id="call_date"
              value={data.call_date}
              onChange={(e) => setData('call_date', e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
            />
          </div>
          
          <div>
            <label htmlFor="call_time" className="block text-sm font-medium text-card-foreground mb-2">
              Call Time
            </label>
            <input
              type="time"
              id="call_time"
              value={data.call_time}
              onChange={(e) => setData('call_time', e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
            />
          </div>
        </div>

        {/* Participants Selection */}
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">Participants</label>
          <div className="bg-muted border border-border rounded-lg p-4 max-h-48 overflow-y-auto">
            {participants.map((participant) => (
              <div key={participant.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`participant_${participant.id}`}
                  checked={data.participant_ids.includes(participant.id)}
                  onChange={(e) => handleParticipantChange(participant.id, e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-ring border-input rounded"
                />
                <label
                  htmlFor={`participant_${participant.id}`}
                  className="ml-2 text-sm text-card-foreground"
                >
                  {participant.name}
                </label>
              </div>
            ))}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Select all participants who attended this call.</p>
        </div>

        {/* Transcript */}
        <div>
          <label htmlFor="transcript_file" className="block text-sm font-medium text-card-foreground mb-2">
            Call Transcript
          </label>
          <textarea
            id="transcript_file"
            rows={12}
            value={data.transcript_file}
            onChange={(e) => setData('transcript_file', e.target.value)}
            placeholder="Enter the full transcript of the call..."
            className="w-full px-3 py-2 border border-input rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
          />
          <p className="mt-2 text-sm text-muted-foreground">Include the complete transcript or key discussion points from the call.</p>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-border">
          <Link
            href={`/companies/${company.id}`}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={processing}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-6 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {processing ? 'Saving...' : (call.id ? 'Update Call' : 'Save Call')}
          </button>
        </div>
      </form>
    </div>
  )
}
