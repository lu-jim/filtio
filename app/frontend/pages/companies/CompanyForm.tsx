import React, { useState } from 'react'
import { useForm, Link } from '@inertiajs/react'
import { Field, FieldLabel, FieldError, FieldGroup } from '../../components/ui/field'
import { Input } from '../../components/ui/input'
import { Select } from '../../components/ui/select'
import { Button } from '../../components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card'

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
  size?: string
  founders?: Founder[]
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
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-destructive" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-destructive">
                {Object.keys(errors).length} error{Object.keys(errors).length !== 1 ? 's' : ''} prohibited this company from being saved:
              </h3>
              <div className="mt-2 text-sm text-destructive/80">
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
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup className="grid md:grid-cols-2 gap-6">
            <Field>
              <FieldLabel htmlFor="name">Name *</FieldLabel>
              <Input
                type="text"
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                aria-invalid={!!errors.name}
              />
              {errors.name && <FieldError>{errors.name}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="website">Website</FieldLabel>
              <Input
                type="url"
                id="website"
                value={data.website}
                onChange={(e) => setData('website', e.target.value)}
                placeholder="https://example.com"
                aria-invalid={!!errors.website}
              />
              {errors.website && <FieldError>{errors.website}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="logo">Logo URL</FieldLabel>
              <Input
                type="url"
                id="logo"
                value={data.logo}
                onChange={(e) => setData('logo', e.target.value)}
                placeholder="https://example.com/logo.png"
                aria-invalid={!!errors.logo}
              />
              {errors.logo && <FieldError>{errors.logo}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="tagline">Tagline</FieldLabel>
              <Input
                type="text"
                id="tagline"
                value={data.tagline}
                onChange={(e) => setData('tagline', e.target.value)}
                placeholder="Your company's tagline"
                aria-invalid={!!errors.tagline}
              />
              {errors.tagline && <FieldError>{errors.tagline}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="year">Founded Year *</FieldLabel>
              <Input
                type="number"
                id="year"
                value={data.year}
                onChange={(e) => setData('year', e.target.value ? parseInt(e.target.value) : '')}
                placeholder="2020"
                min="1800"
                max={new Date().getFullYear()}
                aria-invalid={!!errors.year}
              />
              {errors.year && <FieldError>{errors.year}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="size">Company Size *</FieldLabel>
              <Select
                id="size"
                value={data.size}
                onChange={(e) => setData('size', e.target.value)}
                aria-invalid={!!errors.size}
              >
                <option value="">Select company size</option>
                <option value="0-10">0-10 employees</option>
                <option value="50-100">50-100 employees</option>
                <option value="100-250">100-250 employees</option>
                <option value="+250">+250 employees</option>
              </Select>
              {errors.size && <FieldError>{errors.size}</FieldError>}
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      {/* Founders Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Founders</CardTitle>
          <Button
            type="button"
            onClick={addFounder}
          >
            Add Founder
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.founders_attributes.map((founder, index) => (
              !founder._destroy && (
                <div key={index} className="founder-fields bg-muted rounded-lg p-4 border border-border">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-card-foreground">Founder Details</h3>
                    <Button
                      type="button"
                      onClick={() => removeFounder(index)}
                      variant="destructive"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </div>
                  
                  <FieldGroup className="grid md:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor={`founder_name_${index}`}>Name</FieldLabel>
                      <Input
                        type="text"
                        id={`founder_name_${index}`}
                        value={founder.name}
                        onChange={(e) => updateFounder(index, 'name', e.target.value)}
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor={`founder_linkedin_${index}`}>LinkedIn</FieldLabel>
                      <Input
                        type="url"
                        id={`founder_linkedin_${index}`}
                        value={founder.linkedin || ''}
                        onChange={(e) => updateFounder(index, 'linkedin', e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </Field>
                  </FieldGroup>
                </div>
              )
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-6">
        <Button asChild variant="secondary" size="lg">
          <Link href="/companies">
            Cancel
          </Link>
        </Button>
        <Button
          type="submit"
          disabled={processing}
          size="lg"
        >
          {processing ? 'Saving...' : (company.id ? 'Update Company' : 'Create Company')}
        </Button>
      </div>
    </form>
  )
}
