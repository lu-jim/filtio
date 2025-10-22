import { Head, Link, useForm } from '@inertiajs/react'
import React, { useState, useEffect, useRef } from 'react'
import ChatChannel from '../../entrypoints/chat_cable'

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

    post(`/inertia/chats/${chat.id}/messages`, {
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

  return (
    <>
      <Head title={`Chat ${chat.id}`} />
      
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Chat #{chat.id}
            </h1>
            <p className="text-sm text-gray-600">
              Using {chat.model_name}
            </p>
          </div>
          <Link
            href="/inertia/chats"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            ← Back to chats
          </Link>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && !streamingMessage ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No messages yet</p>
              <p className="text-sm">Start the conversation below!</p>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-3xl px-4 py-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: formatMessage(message.content)
                      }}
                    />
                    <div
                      className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {new Date(message.created_at).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Streaming message */}
              {streamingMessage && (
                <div className="flex justify-start">
                  <div className="max-w-3xl px-4 py-3 rounded-lg bg-gray-100 text-gray-900">
                    <div
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: formatMessage(streamingMessage)
                      }}
                    />
                    <div className="text-xs mt-2 text-gray-500">
                      <span className="animate-pulse">Typing...</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message form */}
        <div className="bg-white border-t border-gray-200 p-4">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="flex-1">
              <textarea
                value={data.content}
                onChange={(e) => setData('content', e.target.value)}
                placeholder="Type your message..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
                disabled={processing}
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={processing || !data.content.trim()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
