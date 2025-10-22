import { Head, Link, useForm } from '@inertiajs/react'
import React, { useState } from 'react'

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
    post('/inertia/chats', {
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
      
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-8">
          <Link 
            href="/inertia/chats" 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            ← Back to chats
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">New Chat</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                Choose a model
              </label>
              <select
                id="model"
                value={data.model}
                onChange={(e) => setData('model', e.target.value)}
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
              {errors.model && (
                <p className="mt-1 text-sm text-red-600">{errors.model}</p>
              )}
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
                rows={4}
                required
              />
              {errors.prompt && (
                <p className="mt-1 text-sm text-red-600">{errors.prompt}</p>
              )}
            </div>
            
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={processing || !prompt.trim() || !data.model}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? 'Starting chat...' : 'Start Conversation'}
              </button>
              
              <Link
                href="/inertia/chats"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
