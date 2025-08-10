'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { BuildingOfficeIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

interface Company {
  id: string
  name: string
  description?: string
  industry?: string
}

interface CompanySelectorProps {
  selectedCompanyId: string
  onCompanyChange: (companyId: string) => void
  disabled?: boolean
}

export default function CompanySelector({ 
  selectedCompanyId, 
  onCompanyChange, 
  disabled = false 
}: CompanySelectorProps) {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchUserCompanies()
  }, [])

  const fetchUserCompanies = async () => {
    try {
      setLoading(true)
      
      // Get companies where the user is a member
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError('User not authenticated')
        return
      }

      console.log('Fetching companies for user:', user.id)

      // First, let's check if the tables exist and get basic info
      const { data: tableCheck, error: tableError } = await supabase
        .from('company_members')
        .select('count')
        .limit(1)

      if (tableError) {
        console.error('Table check error:', tableError)
        throw new Error(`Database table error: ${tableError.message}`)
      }

      const { data, error } = await supabase
        .from('company_members')
        .select(`
          company_id,
          companies (
            id,
            name,
            description,
            industry
          )
        `)
        .eq('user_id', user.id)

      if (error) {
        console.error('Query error:', error)
        throw error
      }

      console.log('Raw data from query:', data)

      const userCompanies = data?.map(item => item.companies).filter(Boolean) || []
      console.log('Processed companies:', userCompanies)
      
      setCompanies(userCompanies)

      // Auto-select first company if none selected
      if (userCompanies.length > 0 && !selectedCompanyId) {
        onCompanyChange(userCompanies[0].id)
      }
    } catch (err) {
      console.error('Full error details:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch companies')
    } finally {
      setLoading(false)
    }
  }

  const selectedCompany = companies.find(c => c.id === selectedCompanyId)

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-12 bg-gray-200 rounded-lg"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-600 text-sm">
        Error loading companies: {error}
      </div>
    )
  }

  if (companies.length === 0) {
    return (
      <div className="text-gray-500 text-sm">
        No companies found. Please contact your administrator.
      </div>
    )
  }

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Company *
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'hover:bg-gray-50'}
        `}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
            <div>
              <div className="font-medium text-gray-900">
                {selectedCompany?.name || 'Select a company'}
              </div>
              {selectedCompany?.industry && (
                <div className="text-sm text-gray-500">
                  {selectedCompany.industry}
                </div>
              )}
            </div>
          </div>
          <ChevronDownIcon className="h-5 w-5 text-gray-400" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="max-h-60 overflow-auto">
            {companies.map((company) => (
              <button
                key={company.id}
                type="button"
                onClick={() => {
                  onCompanyChange(company.id)
                  setIsOpen(false)
                }}
                className={`
                  w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none
                  ${company.id === selectedCompanyId ? 'bg-blue-50 border-l-4 border-blue-500' : ''}
                `}
              >
                <div className="font-medium text-gray-900">{company.name}</div>
                {company.industry && (
                  <div className="text-sm text-gray-500">{company.industry}</div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
