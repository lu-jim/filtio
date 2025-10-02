import React, { useState } from "react"
import { ChevronDown, ChevronRight, Clock, User } from "lucide-react"

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

const participantData = {
  founders: [
    {
      id: "founder-1",
      name: "Sarah Chen",
      title: "CEO • TechFlow AI",
      duration: "45 min",
      date: "2024-01-15",
      transcript:
        "Embat was founded with the mission to democratize treasury management for SMEs. We've built a comprehensive platform that provides real-time cash flow visibility, automated forecasting, and intelligent liquidity management.",
    },
    {
      id: "founder-2",
      name: "Michael Rodriguez",
      title: "CTO • TechFlow AI",
      duration: "30 min",
      date: "2024-01-14",
      transcript:
        "From a technical perspective, we've built our platform on a cloud-native architecture with robust security and compliance features. We integrate with over 50 banking partners and accounting systems.",
    },
  ],
  customers: [
    {
      id: "customer-1",
      name: "Ana Martinez",
      title: "CFO • StartupCorp",
      duration: "35 min",
      date: "2024-01-12",
      transcript:
        "We've been using Embat for 8 months and it's transformed our cash flow management. The forecasting accuracy is impressive and has helped us make better financial decisions.",
    },
    {
      id: "customer-2",
      name: "David Kim",
      title: "Finance Director • TechScale",
      duration: "40 min",
      date: "2024-01-11",
      transcript:
        "The platform's integration capabilities are excellent. We connected all our banking and accounting systems seamlessly, giving us real-time visibility into our financial position.",
    },
    {
      id: "customer-3",
      name: "Lisa Thompson",
      title: "Treasurer • GrowthCo",
      duration: "25 min",
      date: "2024-01-10",
      transcript:
        "Embat's automated cash positioning has saved us hours of manual work each week. The risk management features have also helped us optimize our liquidity strategy.",
    },
  ],
  experts: [
    {
      id: "expert-1",
      name: "Robert Wilson",
      title: "Fintech Analyst • Goldman Sachs",
      duration: "50 min",
      date: "2024-01-09",
      transcript:
        "Embat is well-positioned in the treasury management space. Their technology stack is robust and their market approach is sound. The SME focus is a smart strategic choice.",
    },
    {
      id: "expert-2",
      name: "Jennifer Adams",
      title: "Partner • Accel Partners",
      duration: "45 min",
      date: "2024-01-08",
      transcript:
        "The team has deep domain expertise and the product-market fit is evident from their customer traction. The addressable market for treasury management solutions is significant.",
    },
  ],
}

export function ParticipantColumn({ company, calls }: Props) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [expandedInterviews, setExpandedInterviews] = useState<Set<string>>(new Set())

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(category)) {
      newExpanded.delete(category)
    } else {
      newExpanded.add(category)
    }
    setExpandedCategories(newExpanded)
  }

  const toggleInterview = (interviewId: string) => {
    const newExpanded = new Set(expandedInterviews)
    if (newExpanded.has(interviewId)) {
      newExpanded.delete(interviewId)
    } else {
      newExpanded.add(interviewId)
    }
    setExpandedInterviews(newExpanded)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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

  const renderParticipantCategory = (title: string, participants: any[], categoryKey: string) => (
    <div key={categoryKey} className="border border-border rounded-lg bg-card">
      <button
        onClick={() => toggleCategory(categoryKey)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-hover-overlay focus:bg-hover-overlay transition-colors duration-200"
        aria-expanded={expandedCategories.has(categoryKey)}
      >
        <span className="text-sm font-medium text-card-foreground">
          {title} ({participants.length})
        </span>
        {expandedCategories.has(categoryKey) ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {expandedCategories.has(categoryKey) && (
        <div className="border-t border-border">
          {participants.map((participant) => (
            <div key={participant.id} className="border-b border-border last:border-b-0">
              <button
                onClick={() => toggleInterview(participant.id)}
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-hover-overlay focus:bg-hover-overlay transition-colors duration-200"
                aria-expanded={expandedInterviews.has(participant.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-2 rounded-lg border border-primary/20">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-card-foreground">{participant.name}</h4>
                    <p className="text-xs text-muted-foreground">{participant.title || 'Participant'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs">{participant.duration || 'N/A'}</span>
                  </div>
                  <span className="text-xs">{participant.date || 'N/A'}</span>
                  {expandedInterviews.has(participant.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              </button>

              {expandedInterviews.has(participant.id) && (
                <div className="px-4 pb-4 pt-2 bg-secondary/30">
                  <p className="text-xs text-muted-foreground mb-2 font-medium">Transcript</p>
                  <div className="text-sm text-secondary-foreground leading-relaxed">
                    {participant.transcript || 'No transcript available'}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <div className="border border-border rounded-lg bg-card shadow-sm p-6">
          <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-secondary border border-border">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="absolute inset-0 w-full h-full bg-muted flex items-center justify-center">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-card-foreground">{company.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{company.tagline || 'Company'}</p>
              <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                {company.year && <span>Founded {company.year}</span>}
                {company.size && (
                  <>
                    <span>•</span>
                    <span>{company.size} employees</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="space-y-3">
          {renderParticipantCategory("Founders", 
            (company.founders || []).map(founder => ({
              id: `founder-${founder.id}`,
              name: founder.name,
              title: 'Founder',
              duration: 'N/A',
              date: 'N/A',
              transcript: 'Founder information available'
            })), 
            "founders"
          )}
          {renderParticipantCategory("Calls", 
            (calls || []).map(call => ({
              id: `call-${call.id}`,
              name: `Call ${call.id}`,
              title: `${formatDate(call.call_date)} at ${formatTime(call.call_time)}`,
              duration: 'N/A',
              date: formatDate(call.call_date),
              transcript: call.transcript_file || 'No transcript available'
            })), 
            "calls"
          )}
        </div>
      </div>
    </div>
  )
}
