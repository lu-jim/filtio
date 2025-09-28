import React from 'react'
import Layout from '../../components/Layout'
import { Link } from '@inertiajs/react'

// TypeScript interfaces for the data structure
interface Founder {
  id: number
  name: string
  linkedin?: string
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
  participants?: Participant[]
}

interface Company {
  id: number
  name: string
  website?: string
  logo?: string
  tagline?: string
  year?: number
  size?: '0-10' | '50-100' | '100-250' | '+250'
  created_at: string
  founders?: Founder[]
}

interface Props {
  company: Company
  calls?: Call[]
}

export default function CompaniesShow({ company, calls }: Props) {
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

  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + '...' : text
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-start space-x-4">
              {company.logo && (
                <img 
                  src={company.logo} 
                  alt={`${company.name} logo`}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
              )}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{company.name}</h1>
                {company.tagline && (
                  <p className="text-lg text-gray-600 mb-2 italic">"{company.tagline}"</p>
                )}
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                  {company.year && (
                    <span>Founded {company.year}</span>
                  )}
                  {company.size && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {company.size} employees
                    </span>
                  )}
                </div>
                {company.website && (
                  <p className="text-lg text-gray-600">
                    🌐{' '}
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {company.website}
                    </a>
                  </p>
                )}
              </div>
            </div>
            <div className="flex space-x-3">
              <Link
                href={`/companies/${company.id}/edit`}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Edit Company
              </Link>
              <Link
                href="/companies"
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Back to Companies
              </Link>
            </div>
          </div>

          {/* Company Details Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Company Info */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Company Information</h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company Name</label>
                    <p className="text-lg text-gray-900">{company.name}</p>
                  </div>
                  {company.tagline && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tagline</label>
                      <p className="text-lg text-gray-900 italic">"{company.tagline}"</p>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Founded</label>
                    <p className="text-lg text-gray-900">{company.year || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company Size</label>
                    <p className="text-lg text-gray-900">{company.size ? `${company.size} employees` : 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Website</label>
                    {company.website ? (
                      <p className="text-lg">
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {company.website}
                        </a>
                      </p>
                    ) : (
                      <p className="text-gray-500">Not provided</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Added to Portfolio</label>
                    <p className="text-lg text-gray-900">{formatDate(company.created_at)}</p>
                  </div>
                </div>
              </div>

              {/* Founders Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900">Founders</h2>
                  <Link
                    href={`/companies/${company.id}/founders/new`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Add Founder
                  </Link>
                </div>
                
                {company.founders && company.founders.length > 0 ? (
                  <div className="space-y-4">
                    {company.founders?.map((founder) => (
                      <div key={founder.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{founder.name}</h3>
                            {founder.linkedin && (
                              <p className="text-sm text-gray-600">
                                <a
                                  href={founder.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline inline-flex items-center"
                                >
                                  LinkedIn Profile
                                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                  </svg>
                                </a>
                              </p>
                            )}
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <Link
                              href={`/companies/${company.id}/founders/${founder.id}/edit`}
                              className="text-green-600 hover:text-green-800 text-sm"
                            >
                              Edit
                            </Link>
                            <Link
                              href={`/companies/${company.id}/founders/${founder.id}`}
                              method="delete"
                              data={{ confirm: 'Are you sure?' }}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Remove
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-4xl mb-3">👥</div>
                    <p className="text-gray-600 mb-4">No founders added yet</p>
                    <Link
                      href={`/companies/${company.id}/founders/new`}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                    >
                      Add First Founder
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Calls Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Investment Calls</h2>
              <Link
                href={`/companies/${company.id}/calls/new`}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Add New Call
              </Link>
            </div>
            
            {calls && calls.length > 0 ? (
              <div className="space-y-4">
                {calls?.map((call) => (
                  <div key={call.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition duration-200">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <div className="flex items-center text-gray-600 mr-6">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            {formatDate(call.call_date)}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            {formatTime(call.call_time)}
                          </div>
                        </div>
                        
                        {call.participants && call.participants.length > 0 && (
                          <div className="mb-3">
                            <span className="text-sm font-medium text-gray-700">Participants: </span>
                            <span className="text-sm text-gray-600">
                              {call.participants?.map(p => p.name).join(', ')}
                            </span>
                          </div>
                        )}
                        
                        {call.transcript_file && (
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Transcript preview:</span>
                            <p className="mt-1 line-clamp-2">{truncateText(call.transcript_file, 150)}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2 ml-6">
                        <Link
                          href={`/companies/${company.id}/calls/${call.id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View
                        </Link>
                        <Link
                          href={`/companies/${company.id}/calls/${call.id}/edit`}
                          className="text-green-600 hover:text-green-800 text-sm font-medium"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/companies/${company.id}/calls/${call.id}`}
                          method="delete"
                          data={{ confirm: 'Are you sure? This will permanently delete the call transcript.' }}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Delete
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-6xl mb-4">📞</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No calls recorded yet</h3>
                <p className="text-gray-600 mb-6">Start tracking investment calls and transcripts for this company</p>
                <Link
                  href={`/companies/${company.id}/calls/new`}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                >
                  Record First Call
                </Link>
              </div>
            )}

            {calls && calls.length > 5 && (
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">Showing most recent calls</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-center space-x-4">
            <Link
              href={`/companies/${company.id}/edit`}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
            >
              Edit Company
            </Link>
            <Link
              href={`/companies/${company.id}`}
              method="delete"
              data={{ confirm: 'Are you sure? This will also delete all founders and calls.' }}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
            >
              Delete Company
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
