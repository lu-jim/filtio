import { Head, Link } from '@inertiajs/react'
import React, { useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { Button } from '../../components/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/Card'
import { Label } from '../../components/Label'
import { Select } from '../../components/Select'
import { Textarea } from '../../components/Textarea'
import { Badge } from '../../components/Badge'
import { MessageSquare, Plus, Sparkles } from 'lucide-react'

interface Chat {
  id: number
  model_name: string
  created_at: string
  messages_count: number
}

interface Model {
  id: number
  name: string
}

interface Props {
  chats: Chat[]
  models: Model[]
}

export default function ChatIndex({ chats, models }: Props) {
  const [selectedModel, setSelectedModel] = useState<string>('')
  const [prompt, setPrompt] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim() || !selectedModel) return

    // Create new chat with prompt
    window.location.href = `/chats/new?model=${selectedModel}&prompt=${encodeURIComponent(prompt)}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <>
      <Head title="Chats" />
      
      <div className="min-h-screen bg-background">
        <Navbar>
          <Link href="/chats/new">
            <Button size="sm">
              <Plus />
              New Chat
            </Button>
          </Link>
        </Navbar>

        <div className="mx-auto max-w-6xl space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chats</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Have conversations with AI language models
          </p>
        </div>

        {/* Quick start form */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              <CardTitle>Start a new conversation</CardTitle>
            </div>
            <CardDescription>
              Choose a model and begin chatting with AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Select
                  id="model"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  required
                >
                  <option value="">Select a model...</option>
                  {models.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="prompt">Message</Label>
                <Textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Type your message here..."
                  rows={3}
                  required
                />
              </div>
              
              <Button
                type="submit"
                disabled={!prompt.trim() || !selectedModel}
                className="w-full"
                size="lg"
              >
                <MessageSquare />
                Start Conversation
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Chat list */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Conversations</h2>
          {chats.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <MessageSquare className="text-muted-foreground mb-4 size-12" />
                <p className="text-muted-foreground text-lg font-medium">
                  No chats yet
                </p>
                <p className="text-muted-foreground mt-1 text-sm">
                  Start a new conversation to get started!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {chats.map((chat) => (
                <Link key={chat.id} href={`/chats/${chat.id}`}>
                  <Card className="transition-all hover:shadow-md">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="line-clamp-1">
                          Chat #{chat.id}
                        </CardTitle>
                        <Badge variant="secondary" className="shrink-0">
                          {chat.messages_count} msg
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-1">
                        {chat.model_name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-muted-foreground flex items-center gap-1 text-xs">
                      <span>{formatDate(chat.created_at)}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
    </>
  )
}
