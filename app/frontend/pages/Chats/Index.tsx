import { Head, Link } from '@inertiajs/react'
import React, { useState } from 'react'

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
    window.location.href = `/inertia/chats/new?model=${selectedModel}&prompt=${encodeURIComponent(prompt)}`
  }

  return (
    <>
      <Head title="Chats" />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Chats</h1>
          <Link 
            href="/inertia/chats/new" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            New Chat
          </Link>
        </div>

        {/* Quick start form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Start a new conversation</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                Choose a model
              </label>
              <select
                id="model"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a model...</option>
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                Your message
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your message here..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Start Conversation
            </button>
          </form>
        </div>

        {/* Chat list */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Chats</h2>
          {chats.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No chats yet</p>
              <p className="text-sm">Start a new conversation to get started!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {chats.map((chat) => (
                <Link
                  key={chat.id}
                  href={`/inertia/chats/${chat.id}`}
                  className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Chat #{chat.id}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Using {chat.model_name}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {chat.messages_count} messages
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {new Date(chat.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
