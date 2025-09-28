import React from 'react'
import Layout from '../../components/Layout'
import { Link } from '@inertiajs/react'
// Temporarily comment out demo components to fix hooks issue
// import { ParticipantColumn } from '../../demo/participant-column'
// import { InsightsColumn } from '../../demo/insights-column'
// import { SentimentColumn } from '../../demo/sentiment-column'
import { Button } from '../../components/Button'
import { Menu } from 'lucide-react'

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
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-hover-overlay transition-colors duration-200"
              aria-label="Open main menu"
              aria-haspopup="menu"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8" role="main">
        <section className="lg:col-span-1" aria-labelledby="participants-heading">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Participants</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                {company.logo && (
                  <img 
                    src={company.logo} 
                    alt={`${company.name} logo`}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-gray-900">{company.name}</h3>
                  <p className="text-sm text-gray-600">{company.tagline || 'Company'}</p>
                </div>
              </div>
              
              {company.founders && company.founders.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Founders</h4>
                  <div className="space-y-2">
                    {company.founders.map((founder) => (
                      <div key={founder.id} className="bg-gray-50 rounded-lg p-3">
                        <p className="font-medium text-gray-900">{founder.name}</p>
                        {founder.linkedin && (
                          <a 
                            href={founder.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                          >
                            LinkedIn Profile
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {calls && calls.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Recent Calls</h4>
                  <div className="space-y-2">
                    {calls.slice(0, 3).map((call) => (
                      <div key={call.id} className="bg-gray-50 rounded-lg p-3">
                        <p className="font-medium text-gray-900">
                          {formatDate(call.call_date)} at {formatTime(call.call_time)}
                        </p>
                        {call.participants && call.participants.length > 0 && (
                          <p className="text-sm text-gray-600">
                            Participants: {call.participants.map(p => p.name).join(', ')}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        
        <section className="lg:col-span-1" aria-labelledby="summary-heading">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Investment Insights</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Investment Score</h3>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold text-blue-600">8.2</div>
                  <div className="text-sm text-blue-600">out of 10</div>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '82%'}}></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Key Takeaways</h3>
                <div className="space-y-2">
                  <div className="bg-green-50 border-l-4 border-green-400 p-3">
                    <p className="text-sm font-medium text-green-800">Strong Revenue Growth</p>
                    <p className="text-xs text-green-600">300% YoY revenue growth with 150 enterprise customers</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
                    <p className="text-sm font-medium text-yellow-800">Technical Differentiation</p>
                    <p className="text-xs text-yellow-600">Sophisticated MLOps pipeline with federated learning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="lg:col-span-1" aria-labelledby="sentiment-heading">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Sentiment Analysis</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Analysis Clusters</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Competitive Differentiation</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">8 insights</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Startup Team</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">12 insights</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Commercial Execution</span>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">15 insights</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">AI Chat</h3>
                <div className="space-y-2">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-blue-800">Hi! I can help you analyze the conversation data. Ask me anything about the interviews, sentiment patterns, or key insights.</p>
                  </div>
                  <div className="flex space-x-2">
                    <input 
                      type="text" 
                      placeholder="Ask about competitive differentiation, team, or execution..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      </div>
  )
}
