import React from 'react'
import Layout from '../../components/Layout'
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
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
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
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Call Details</h1>
              <p className="text-gray-600">
                {company.name} - {formatDate(call.call_date)} at {formatTime(call.call_time)}
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                href={`/companies/${company.id}/calls/${call.id}/edit`}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Edit Call
              </Link>
              <Link
                href={`/companies/${company.id}`}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Back to Company
              </Link>
            </div>
          </div>

          {/* Call Details Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Call Info */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Call Information</h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <p className="text-lg text-gray-900">{formatDate(call.call_date)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Time</label>
                    <p className="text-lg text-gray-900">{formatTime(call.call_time)}</p>
                  </div>
                </div>
              </div>

              {/* Participants */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Participants</h2>
                {call.participants.length > 0 ? (
                  <div className="space-y-2">
                    {sortedParticipants.map((participant) => (
                      <div key={participant.id} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-gray-900">{participant.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No participants recorded</p>
                )}
              </div>
            </div>

            {/* Transcript */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Transcript</h2>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                {call.transcript_file ? (
                  <div className="prose prose-gray max-w-none">
                    {formatTranscript(call.transcript_file)}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No transcript available</p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center space-x-4">
            <Link
              href={`/companies/${company.id}/calls/${call.id}/edit`}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
            >
              Edit Call
            </Link>
            <Link
              href={`/companies/${company.id}/calls/${call.id}`}
              method="delete"
              data={{ confirm: 'Are you sure? This will permanently delete the call and transcript.' }}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
            >
              Delete Call
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
