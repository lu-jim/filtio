import { Head, Link, useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Label } from '../../components/ui/label'
import { Select } from '../../components/ui/select'
import { Textarea } from '../../components/ui/textarea'
import { MessageSquare } from 'lucide-react'

interface Model {
  id: number
  name: string
}

interface Props {
  selected_model?: string
  models: Model[]
}

export default function ChatNew({ selected_model, models }: Props) {
  const [prompt, setPrompt] = useState<string>('')
  
  const { data, setData, post, processing, errors } = useForm({
    model: selected_model || '',
    prompt: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim() || !data.model) return

    setData('prompt', prompt)
    post('/chats', {
      data: {
        chat: {
          model: data.model,
          prompt: prompt
        }
      }
    })
  }

  return (
    <>
      <Head title="New Chat" />
      
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="mx-auto max-w-2xl space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">New Chat</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Start a conversation with an AI language model
            </p>
          </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageSquare className="size-5 text-primary" />
              <CardTitle>Create a new conversation</CardTitle>
            </div>
            <CardDescription>
              Choose a model and start chatting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Select
                  id="model"
                  value={data.model}
                  onChange={(e) => setData('model', e.target.value)}
                  required
                  aria-invalid={!!errors.model}
                >
                  <option value="">Select a model...</option>
                  {models.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </Select>
                {errors.model && (
                  <p className="text-destructive text-sm">{errors.model}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="prompt">Your message</Label>
                <Textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Type your message here..."
                  rows={4}
                  required
                  aria-invalid={!!errors.prompt}
                />
                {errors.prompt && (
                  <p className="text-destructive text-sm">{errors.prompt}</p>
                )}
              </div>
              
              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={processing || !prompt.trim() || !data.model}
                  className="flex-1"
                  size="lg"
                >
                  {processing ? 'Starting chat...' : 'Start Conversation'}
                </Button>
                
                <Link href="/chats" className="flex-shrink-0">
                  <Button type="button" variant="outline" size="lg">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
        </div>
      </div>
    </>
  )
}
