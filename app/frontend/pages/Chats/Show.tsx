import { Head, Link, useForm } from '@inertiajs/react'
import React, { useState, useEffect, useRef } from 'react'
import ChatChannel from '../../entrypoints/chat_cable'
import { Navbar } from '../../components/Navbar'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Textarea } from '../../components/Textarea'
import { Badge } from '../../components/Badge'
import { ScrollArea } from '../../components/Scroll-area'
import { Bot, Send, User } from 'lucide-react'
import { cn } from '../../lib/utils'

interface Message {
  id: number
  role: string
  content: string
  created_at: string
}

interface Chat {
  id: number
  model_name: string
  messages: Message[]
}

interface Props {
  chat: Chat
}

export default function ChatShow({ chat }: Props) {
  const [messages, setMessages] = useState<Message[]>(chat.messages)
  const [streamingMessage, setStreamingMessage] = useState<string>('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatChannelRef = useRef<ChatChannel | null>(null)
  
  const { data, setData, post, processing, errors } = useForm({
    content: ''
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingMessage])

  // Set up Action Cable for real-time updates
  useEffect(() => {
    const handleMessage = (data: any) => {
      if (data.type === 'message_chunk') {
        setStreamingMessage(prev => prev + data.content)
      } else if (data.type === 'message_complete') {
        // Message is complete, add it to the messages list
        setMessages(prev => [...prev, data.message])
        setStreamingMessage('')
      }
    }

    chatChannelRef.current = new ChatChannel(chat.id, handleMessage)

    return () => {
      if (chatChannelRef.current) {
        chatChannelRef.current.unsubscribe()
      }
    }
  }, [chat.id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!data.content.trim()) return

    post(`/chats/${chat.id}/messages`, {
      data: {
        message: {
          content: data.content
        }
      },
      onSuccess: () => {
        setData('content', '')
      }
    })
  }

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />')
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <>
      <Head title={`Chat ${chat.id}`} />
      
      <div className="flex h-screen flex-col bg-background">
        <Navbar>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Chat #{chat.id}</span>
            <Badge variant="secondary" className="text-xs">
              {chat.model_name}
            </Badge>
          </div>
        </Navbar>

        {/* Messages */}
        <ScrollArea className="flex-1">
          <div className="mx-auto max-w-5xl space-y-6 p-6">
            {messages.length === 0 && !streamingMessage ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <Bot className="text-muted-foreground mb-4 size-12" />
                <p className="text-muted-foreground text-lg font-medium">
                  No messages yet
                </p>
                <p className="text-muted-foreground mt-1 text-sm">
                  Start the conversation below!
                </p>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-4",
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.role === 'assistant' && (
                      <div className="bg-primary/10 flex size-8 shrink-0 items-center justify-center rounded-full">
                        <Bot className="text-primary size-4" />
                      </div>
                    )}
                    
                    <Card
                      className={cn(
                        "max-w-3xl",
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      )}
                    >
                      <div className="p-4">
                        <div
                          className={cn(
                            "prose prose-sm max-w-none",
                            message.role === 'user' && "[&_*]:text-primary-foreground"
                          )}
                          dangerouslySetInnerHTML={{
                            __html: formatMessage(message.content)
                          }}
                        />
                        <div
                          className={cn(
                            "mt-2 text-xs",
                            message.role === 'user'
                              ? 'text-primary-foreground/70'
                              : 'text-muted-foreground'
                          )}
                        >
                          {formatTime(message.created_at)}
                        </div>
                      </div>
                    </Card>

                    {message.role === 'user' && (
                      <div className="bg-primary flex size-8 shrink-0 items-center justify-center rounded-full">
                        <User className="size-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Streaming message */}
                {streamingMessage && (
                  <div className="flex gap-4">
                    <div className="bg-primary/10 flex size-8 shrink-0 items-center justify-center rounded-full">
                      <Bot className="text-primary size-4" />
                    </div>
                    
                    <Card className="bg-muted max-w-3xl">
                      <div className="p-4">
                        <div
                          className="prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: formatMessage(streamingMessage)
                          }}
                        />
                        <div className="text-muted-foreground mt-2 text-xs">
                          <span className="animate-pulse">Typing...</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message form */}
        <div className="border-t bg-card px-6 py-4">
          <div className="mx-auto max-w-5xl">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Textarea
                value={data.content}
                onChange={(e) => setData('content', e.target.value)}
                placeholder="Type your message..."
                className="min-h-[60px] resize-none"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
                disabled={processing}
                aria-invalid={!!errors.content}
              />
              <Button
                type="submit"
                disabled={processing || !data.content.trim()}
                size="lg"
                className="self-end"
              >
                <Send />
              </Button>
            </form>
            {errors.content && (
              <p className="text-destructive mt-2 text-sm">{errors.content}</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
