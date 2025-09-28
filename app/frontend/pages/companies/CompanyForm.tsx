import React, { useState } from 'react'
import { useForm, Link } from '@inertiajs/react'

// TypeScript interfaces for the data structure
interface Founder {
  id?: number
  name: string
  linkedin?: string
  _destroy?: boolean
}

interface Company {
  id?: number
  name: string
  website?: string
  logo?: string
  tagline?: string
  year?: number
  size?: '0-10' | '50-100' | '100-250' | '+250'
  founders: Founder[]
}

interface Props {
  company: Company
}

export default function CompanyForm({ company }: Props) {
  const { data, setData, post, put, errors, processing } = useForm({
    name: company.name || '',
    website: company.website || '',
    logo: company.logo || '',
    tagline: company.tagline || '',
    year: company.year || '',
    size: company.size || '',
    founders_attributes: company.founders || []
  })

  const [founderIndex, setFounderIndex] = useState(company.founders?.length || 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (company.id) {
      put(`/companies/${company.id}`)
    } else {
      post('/companies')
    }
  }

  const addFounder = () => {
    const newFounders = [...data.founders_attributes, { name: '', linkedin: '' }]
    setData('founders_attributes', newFounders)
    setFounderIndex(founderIndex + 1)
  }

  const removeFounder = (index: number) => {
    const newFounders = [...data.founders_attributes]
    if (newFounders[index].id) {
      // Existing record - mark for destruction
      newFounders[index]._destroy = true
    } else {
      // New record - remove from array
      newFounders.splice(index, 1)
    }
    setData('founders_attributes', newFounders)
  }

  const updateFounder = (index: number, field: string, value: string) => {
    const newFounders = [...data.founders_attributes]
    newFounders[index] = { ...newFounders[index], [field]: value }
    setData('founders_attributes', newFounders)
  }

  const hasErrors = Object.keys(errors).length > 0

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {hasErrors && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                {Object.keys(errors).length} error{Object.keys(errors).length !== 1 ? 's' : ''} prohibited this company from being saved:
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc pl-5 space-y-1">
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Company Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Company Information</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            <input
              type="url"
              id="website"
              value={data.website}
              onChange={(e) => setData('website', e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
              Logo URL
            </label>
            <input
              type="url"
              id="logo"
              value={data.logo}
              onChange={(e) => setData('logo', e.target.value)}
              placeholder="https://example.com/logo.png"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="tagline" className="block text-sm font-medium text-gray-700 mb-2">
              Tagline
            </label>
            <input
              type="text"
              id="tagline"
              value={data.tagline}
              onChange={(e) => setData('tagline', e.target.value)}
              placeholder="Your company's tagline"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
              Founded Year *
            </label>
            <input
              type="number"
              id="year"
              value={data.year}
              onChange={(e) => setData('year', e.target.value ? parseInt(e.target.value) : '')}
              placeholder="2020"
              min="1800"
              max={new Date().getFullYear()}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
              Company Size
            </label>
            <select
              id="size"
              value={data.size}
              onChange={(e) => setData('size', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select company size</option>
              <option value="0-10">0-10 employees</option>
              <option value="50-100">50-100 employees</option>
              <option value="100-250">100-250 employees</option>
              <option value="+250">+250 employees</option>
            </select>
          </div>
        </div>
      </div>

      {/* Founders Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Founders</h2>
          <button
            type="button"
            onClick={addFounder}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Add Founder
          </button>
        </div>

        <div className="space-y-4">
          {data.founders_attributes.map((founder, index) => (
            !founder._destroy && (
              <div key={index} className="founder-fields bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Founder Details</h3>
                  <button
                    type="button"
                    onClick={() => removeFounder(index)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`founder_name_${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id={`founder_name_${index}`}
                      value={founder.name}
                      onChange={(e) => updateFounder(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor={`founder_linkedin_${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      id={`founder_linkedin_${index}`}
                      value={founder.linkedin || ''}
                      onChange={(e) => updateFounder(index, 'linkedin', e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-6">
        <Link
          href="/companies"
          className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={processing}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50"
        >
          {processing ? 'Saving...' : (company.id ? 'Update Company' : 'Create Company')}
        </button>
      </div>
    </form>
  )
}
