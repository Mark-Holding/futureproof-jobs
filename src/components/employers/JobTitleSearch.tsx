'use client'

import React, { useState, useEffect } from 'react'
import { Search, CheckCircle, AlertCircle, Loader, ChevronDown } from 'lucide-react'
import { createClient } from '@/lib/supabase'

interface JobTitleSearchProps {
  onJobSelected: (job: any) => void
  onNoMatchFound: (jobTitle: string) => void
  selectedJobTitle?: string
}

interface JobSuggestion {
  title: string
  resistance_score: number
  resistance_level: string
}

export default function JobTitleSearch({ onJobSelected, onNoMatchFound, selectedJobTitle }: JobTitleSearchProps) {
  const [searchQuery, setSearchQuery] = useState(selectedJobTitle || '')
  const [suggestions, setSuggestions] = useState<JobSuggestion[]>([])
  const [selectedJob, setSelectedJob] = useState<JobSuggestion | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dbStatus, setDbStatus] = useState({ connected: false, testing: true })

  const supabase = createClient()

  // Test database connection on component mount
  useEffect(() => {
    testDatabaseConnection()
  }, [])

  // Search for job titles as user types
  useEffect(() => {
    if (!selectedJob && searchQuery.trim().length >= 2) {
      searchJobTitles(searchQuery)
    } else if (searchQuery.trim().length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchQuery, selectedJob])

  const testDatabaseConnection = async () => {
    try {
      const { data, error } = await supabase
        .from('job_titles')
        .select('title')
        .limit(1)

      if (error) {
        throw error
      }

      setDbStatus({ 
        connected: true, 
        testing: false
      })
    } catch (err) {
      setDbStatus({ 
        connected: false, 
        testing: false, 
        error: err instanceof Error ? err.message : 'Unknown error'
      })
    }
  }

  const searchJobTitles = async (query: string) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .rpc('search_job_titles', { search_term: query })

      if (error) {
        console.error('Search error:', error)
        setSuggestions([])
        return
      }

      setSuggestions(data || [])
      setShowSuggestions(true)
    } catch (err) {
      console.error('Search failed:', err)
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  }

  const handleJobSelection = (job: JobSuggestion) => {
    setSelectedJob(job)
    setSearchQuery(job.title)
    setShowSuggestions(false)
    setSuggestions([])
    setError(null)
    onJobSelected(job)
  }

  const handleNoMatchFound = () => {
    if (searchQuery.trim()) {
      onNoMatchFound(searchQuery.trim())
      setSelectedJob(null)
      setError(null)
    }
  }

  const clearSelection = () => {
    setSelectedJob(null)
    setSearchQuery('')
    setSuggestions([])
    setError(null)
    onJobSelected(null)
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600 bg-green-50 border-green-200'
    if (score >= 40) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 70) return 'High Resistance'
    if (score >= 40) return 'Medium Resistance'
    return 'Low Resistance'
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Title Search for AI Resistance Score *
        </label>
        <p className="text-sm text-gray-600 mb-3">
          Search for your job title to get an AI resistance score. This helps candidates understand how future-proof the role is.
        </p>
        
        {/* Database Status */}
        <div className="mb-3 flex items-center space-x-2">
          {dbStatus.testing ? (
            <>
              <Loader className="animate-spin text-blue-600" size={16} />
              <span className="text-sm text-blue-600">Testing database connection...</span>
            </>
          ) : dbStatus.connected ? (
            <>
              <CheckCircle className="text-green-600" size={16} />
              <span className="text-sm text-green-600">AI Resistance database connected</span>
            </>
          ) : (
            <>
              <AlertCircle className="text-red-600" size={16} />
              <span className="text-sm text-red-600">
                Database connection failed: {dbStatus.error || 'Unknown error'}
              </span>
            </>
          )}
        </div>

        {/* Search Input */}
        <div className="relative">
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Start typing a job title (e.g., 'software engineer', 'nurse', 'teacher')"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={!dbStatus.connected}
              />
              
              {/* Search Icon */}
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {suggestions.map((job, index) => (
                    <div
                      key={index}
                      onClick={() => handleJobSelection(job)}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-medium text-gray-900">{job.title}</div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm text-gray-600">
                          Score: {job.resistance_score}/100
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          job.resistance_level === 'High' ? 'bg-green-100 text-green-800' :
                          job.resistance_level === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {job.resistance_level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Selected Job Display */}
        {selectedJob && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-blue-900">Selected:</span>
                  <span className="text-blue-800">{selectedJob.title}</span>
                </div>
                <div className="mt-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(selectedJob.resistance_score)}`}>
                    AI Resistance Score: {selectedJob.resistance_score}/100 - {getScoreLabel(selectedJob.resistance_score)}
                  </span>
                </div>
              </div>
              <button
                onClick={clearSelection}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Change
              </button>
            </div>
          </div>
        )}

        {/* No Match Found Option */}
        {searchQuery.trim() && !selectedJob && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-yellow-800 mb-2">
                  Couldn't find a close match for "<strong>{searchQuery}</strong>"?
                </p>
                <button
                  onClick={handleNoMatchFound}
                  className="inline-flex items-center px-3 py-2 bg-yellow-600 text-white text-sm font-medium rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Mark as "No Match Found" & Continue
                </button>
                <p className="text-xs text-yellow-700 mt-2">
                  We'll add this job title to our database for future analysis.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="text-red-600" size={18} />
            <span className="text-red-800 text-sm">{error}</span>
          </div>
        )}
      </div>
    </div>
  )
}
