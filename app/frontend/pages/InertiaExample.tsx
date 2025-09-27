import React from 'react'
import Layout from '../components/Layout'

interface Props {
  name: string
}

export default function InertiaExample({ name }: Props) {
  return (
    <Layout>
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Hello, {name}!
        </h1>
        <p className="text-gray-600">
          This is your first Inertia.js page component working with React!
        </p>
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">
            ✅ Inertia.js + React integration is working correctly!
          </p>
        </div>
      </div>
    </Layout>
  )
}
