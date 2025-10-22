import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import {
  TrendingUp,
  AlertTriangle,
  Target,
  Zap,
  DollarSign,
  Users,
  BarChart3,
  Flag,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"

interface KeyTakeaway {
  id: string
  title: string
  description: string
  impact: "high" | "medium" | "low"
  category: "financial" | "technical" | "market" | "team"
  confidence: number
}

interface RedFlag {
  id: string
  title: string
  description: string
  severity: "critical" | "high" | "medium"
  source: string
}

interface RecurringTheme {
  id: string
  theme: string
  mentions: number
  participants: string[]
  sentiment: "positive" | "negative" | "neutral"
}

const keyTakeaways: KeyTakeaway[] = [
  {
    id: "kt1",
    title: "Strong Revenue Growth",
    description: "300% YoY revenue growth with 150 enterprise customers demonstrates product-market fit",
    impact: "high",
    category: "financial",
    confidence: 95,
  },
  {
    id: "kt2",
    title: "Proven Customer Value",
    description: "Customers report 25% cost reduction and 40% efficiency gains with clear ROI",
    impact: "high",
    category: "market",
    confidence: 92,
  },
  {
    id: "kt3",
    title: "Technical Differentiation",
    description: "Sophisticated MLOps pipeline with federated learning provides competitive advantage",
    impact: "medium",
    category: "technical",
    confidence: 88,
  },
  {
    id: "kt4",
    title: "Large Market Opportunity",
    description: "30M+ SMBs with <5% AI adoption represents massive TAM",
    impact: "high",
    category: "market",
    confidence: 90,
  },
]

const redFlags: RedFlag[] = [
  {
    id: "rf1",
    title: "Competitive Pressure",
    description: "Major cloud providers entering the market could commoditize AI services",
    severity: "high",
    source: "Expert Analysis",
  },
  {
    id: "rf2",
    title: "Differentiation Risk",
    description: "Need for stronger moats as AI becomes more accessible",
    severity: "medium",
    source: "Market Analysis",
  },
  {
    id: "rf3",
    title: "CAC Visibility",
    description: "Limited discussion of customer acquisition costs and unit economics",
    severity: "medium",
    source: "Financial Review",
  },
]

const recurringThemes: RecurringTheme[] = [
  {
    id: "rt1",
    theme: "AI Democratization",
    mentions: 8,
    participants: ["Sarah Chen", "Michael Rodriguez", "Dr. Jennifer Walsh"],
    sentiment: "positive",
  },
  {
    id: "rt2",
    theme: "Implementation Speed",
    mentions: 5,
    participants: ["Sarah Chen", "Michael Rodriguez"],
    sentiment: "positive",
  },
  {
    id: "rt3",
    theme: "Market Competition",
    mentions: 6,
    participants: ["Dr. Jennifer Walsh"],
    sentiment: "negative",
  },
  {
    id: "rt4",
    theme: "ROI & Cost Savings",
    mentions: 7,
    participants: ["Michael Rodriguez", "Sarah Chen"],
    sentiment: "positive",
  },
]

export function InsightsColumn() {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-chart-3 bg-chart-3/10 border-chart-3/30"
      case "medium":
        return "text-chart-4 bg-chart-4/10 border-chart-4/30"
      case "low":
        return "text-muted-foreground bg-muted/10 border-muted/30"
      default:
        return "text-muted-foreground bg-muted/10 border-muted/30"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-destructive bg-destructive/10 border-destructive/30"
      case "high":
        return "text-chart-5 bg-chart-5/10 border-chart-5/30"
      case "medium":
        return "text-chart-4 bg-chart-4/10 border-chart-4/30"
      default:
        return "text-muted-foreground bg-muted/10 border-muted/30"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "financial":
        return <DollarSign className="h-3 w-3" />
      case "technical":
        return <Zap className="h-3 w-3" />
      case "market":
        return <BarChart3 className="h-3 w-3" />
      case "team":
        return <Users className="h-3 w-3" />
      default:
        return <Target className="h-3 w-3" />
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <CheckCircle className="h-3 w-3 text-chart-3" />
      case "negative":
        return <XCircle className="h-3 w-3 text-chart-5" />
      case "neutral":
        return <Clock className="h-3 w-3 text-muted-foreground" />
      default:
        return <Clock className="h-3 w-3 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Key Insights & Summary</h2>
        <Badge variant="outline" className="text-xs">
          Investment Analysis
        </Badge>
      </div>

      {/* Investment Score */}
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-chart-3" />
            Investment Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-chart-3">8.2</span>
            <span className="text-xs text-muted-foreground">out of 10</span>
          </div>
          <Progress value={82} className="h-3 mb-3" />
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="text-center">
              <div className="text-chart-3 font-semibold">Strong</div>
              <div className="text-muted-foreground">Traction</div>
            </div>
            <div className="text-center">
              <div className="text-chart-4 font-semibold">Medium</div>
              <div className="text-muted-foreground">Risk</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Takeaways */}
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
            <Target className="h-4 w-4" />
            Key Takeaways
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {keyTakeaways.map((takeaway) => (
              <div key={takeaway.id} className="border-l-2 border-primary/30 pl-3 py-2">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-sm font-medium text-foreground">{takeaway.title}</h4>
                  <div className="flex items-center gap-1">
                    <Badge className={`text-xs border ${getImpactColor(takeaway.impact)}`}>
                      {getCategoryIcon(takeaway.category)}
                      <span className="ml-1">{takeaway.impact}</span>
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">{takeaway.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground capitalize">{takeaway.category} insight</span>
                  <span className="text-xs text-primary font-medium">{takeaway.confidence}% confidence</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Red Flags */}
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
            <Flag className="h-4 w-4 text-chart-5" />
            Red Flags & Concerns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {redFlags.map((flag) => (
              <div key={flag.id} className="border-l-2 border-chart-5/30 pl-3 py-2">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-sm font-medium text-foreground">{flag.title}</h4>
                  <Badge className={`text-xs border ${getSeverityColor(flag.severity)}`}>
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {flag.severity}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">{flag.description}</p>
                <span className="text-xs text-muted-foreground">Source: {flag.source}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recurring Themes */}
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Recurring Themes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recurringThemes.map((theme) => (
              <div key={theme.id} className="flex items-center justify-between py-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getSentimentIcon(theme.sentiment)}
                    <span className="text-sm font-medium text-foreground">{theme.theme}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {theme.participants.length} participants • {theme.mentions} mentions
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-foreground">{theme.mentions}</div>
                  <div className="text-xs text-muted-foreground">mentions</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-foreground">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2">
            <button className="flex items-center gap-2 p-2 text-xs text-left hover:bg-accent/50 rounded-md transition-colors">
              <DollarSign className="h-3 w-3 text-chart-3" />
              Generate Investment Memo
            </button>
            <button className="flex items-center gap-2 p-2 text-xs text-left hover:bg-accent/50 rounded-md transition-colors">
              <BarChart3 className="h-3 w-3 text-chart-2" />
              Export Analysis Report
            </button>
            <button className="flex items-center gap-2 p-2 text-xs text-left hover:bg-accent/50 rounded-md transition-colors">
              <Flag className="h-3 w-3 text-chart-5" />
              Schedule Follow-up
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
