import * as React from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { ScrollArea } from "../components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../components/ui/collapsible"
import { Send, Bot, User, ChevronDown, TrendingUp, Users, Target } from "lucide-react"
import { useState } from "react"

const sentimentClusters = [
  {
    id: "competitive",
    title: "Competitive Differentiation",
    description: "Unique value proposition, competitive landscape, stakeholder perceptions",
    icon: Target,
    insights: [
      "Strong AI-first approach differentiates from traditional solutions",
      "Stakeholders see clear competitive advantages in automation",
      "Market positioning as premium solution resonates well",
    ],
    sentiment: "positive",
    count: 8,
  },
  {
    id: "team",
    title: "Startup Team",
    description: "Backgrounds, collaboration history, startup experience, clarity of roles",
    icon: Users,
    insights: [
      "Founders have complementary technical and business backgrounds",
      "Clear role definition between CEO and CTO responsibilities",
      "Previous collaboration history shows strong working relationship",
    ],
    sentiment: "positive",
    count: 12,
  },
  {
    id: "execution",
    title: "Commercial & Executive Execution",
    description: "Growth efficiency, marketing strategy, scalability evidence",
    icon: TrendingUp,
    insights: [
      "Customer acquisition strategy shows promising early results",
      "Revenue growth trajectory indicates strong market fit",
      "Scalability concerns around infrastructure and team growth",
    ],
    sentiment: "neutral",
    count: 15,
  },
]

interface ChatMessage {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

export function SentimentColumn() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hi! I can help you analyze the conversation data. Ask me anything about the interviews, sentiment patterns, or key insights.",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [expandedClusters, setExpandedClusters] = useState<string[]>(["competitive"])

  const toggleCluster = (clusterId: string) => {
    setExpandedClusters((prev) =>
      prev.includes(clusterId) ? prev.filter((id) => id !== clusterId) : [...prev, clusterId],
    )
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response based on conversation data
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: generateBotResponse(inputValue),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsLoading(false)
    }, 1000)
  }

  const generateBotResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    if (
      lowerQuery.includes("competitive") ||
      lowerQuery.includes("differentiation") ||
      lowerQuery.includes("advantage")
    ) {
      return "Based on the competitive differentiation analysis, Embat shows strong positioning with their AI-first approach. Stakeholders consistently mention their unique value proposition in automation, and the market sees clear advantages over traditional solutions."
    }

    if (lowerQuery.includes("team") || lowerQuery.includes("founder") || lowerQuery.includes("background")) {
      return "The startup team analysis reveals strong complementary skills between founders. Sarah Chen brings extensive AI/ML experience while Michael Rodriguez provides deep technical architecture expertise. Their previous collaboration history indicates excellent working dynamics."
    }

    if (lowerQuery.includes("execution") || lowerQuery.includes("commercial") || lowerQuery.includes("growth")) {
      return "Commercial execution shows promising early results with strong customer acquisition metrics. Revenue growth trajectory indicates good market fit, though there are some scalability concerns around infrastructure and team expansion that need attention."
    }

    if (lowerQuery.includes("risk") || lowerQuery.includes("concern")) {
      return "Key risks span across all clusters: competitive pressure in the AI space, potential team scaling challenges, and execution risks around infrastructure scalability. The analysis shows these are manageable with proper planning."
    }

    if (lowerQuery.includes("opportunity") || lowerQuery.includes("potential")) {
      return "Major opportunities include leveraging their competitive differentiation for premium positioning, expanding the team strategically, and scaling their proven commercial execution model to new markets."
    }

    return "I can help you analyze the three key areas: Competitive Differentiation, Startup Team, and Commercial & Executive Execution. Ask me about any specific insights or patterns you'd like to explore."
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600 bg-green-50 border-green-200"
      case "negative":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-base font-medium text-foreground">Sentiment analysis</h2>

      <div className="space-y-3">
        {sentimentClusters.map((cluster) => {
          const Icon = cluster.icon
          const isExpanded = expandedClusters.includes(cluster.id)

          return (
            <Card key={cluster.id} className="border border-border">
              <Collapsible open={isExpanded} onOpenChange={() => toggleCluster(cluster.id)}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-sm font-medium text-foreground">{cluster.title}</CardTitle>
                          <p className="text-xs text-muted-foreground mt-1">{cluster.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`text-xs ${getSentimentColor(cluster.sentiment)}`}>
                          {cluster.count} insights
                        </Badge>
                        <ChevronDown
                          className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {cluster.insights.map((insight, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{insight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          )
        })}
      </div>

      <div className="border border-border rounded bg-card">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium text-foreground">Ask about the data</h3>
          </div>
        </div>

        <ScrollArea className="h-[300px] p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className="flex-shrink-0">
                    {message.type === "bot" ? (
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-3 w-3 text-primary" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-3 w-3 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div
                    className={`rounded-lg px-3 py-2 text-sm ${
                      message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex gap-2 max-w-[80%]">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-3 w-3 text-primary" />
                    </div>
                  </div>
                  <div className="rounded-lg px-3 py-2 text-sm bg-muted text-foreground">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about competitive differentiation, team, or execution..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button onClick={handleSendMessage} size="sm" disabled={!inputValue.trim() || isLoading} className="px-3">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
