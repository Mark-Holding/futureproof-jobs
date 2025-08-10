"use client";

import React, { useState, useEffect } from 'react';
import { Search, Upload, Database, BarChart3, Settings, Info, AlertCircle, CheckCircle, Loader, ChevronDown } from 'lucide-react';
import { createClient } from '../../lib/supabase';

const AIResistanceApp = () => {
  const [activeTab, setActiveTab] = useState('analyzer');
  const [jobTitle, setJobTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dbStatus, setDbStatus] = useState({ connected: false, testing: true });
  const [showSuggestions, setShowSuggestions] = useState(false);

  const supabase = createClient();

  // Test database connection on component mount
  useEffect(() => {
    testDatabaseConnection();
  }, []);

  // Search for job titles as user types
  useEffect(() => {
    // Only search if we don't have a selected job and the query is long enough
    if (!selectedJob && searchQuery.trim().length >= 2) {
      searchJobTitles(searchQuery);
    } else if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, selectedJob]);

  const testDatabaseConnection = async () => {
    try {
      // Test connection by trying to query the job_titles table
      const { data, error } = await supabase
        .from('job_titles')
        .select('title')
        .limit(1);

      if (error) {
        throw error;
      }

      setDbStatus({ 
        connected: true, 
        testing: false,
        jobCount: data ? 'Connected' : 'Connected'
      });
    } catch (err) {
      setDbStatus({ 
        connected: false, 
        testing: false, 
        error: err.message 
      });
    }
  };

  const searchJobTitles = async (query) => {
    try {
      const { data, error } = await supabase
        .rpc('search_job_titles', { search_term: query });

      if (error) {
        console.error('Search error:', error);
        setSuggestions([]);
        return;
      }

      setSuggestions(data || []);
      setShowSuggestions(true);
    } catch (err) {
      console.error('Search failed:', err);
      setSuggestions([]);
    }
  };

  const handleJobSelection = (job) => {
    setSelectedJob(job);
    setJobTitle(job.title);
    setSearchQuery(job.title);
    setShowSuggestions(false);
    setSuggestions([]);
    setAnalysis(null);
  };

  const handleJobAnalysis = async () => {
    if (!selectedJob) return;
    
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      // Get the full job details from the database
      const { data, error } = await supabase
        .from('job_titles')
        .select('*')
        .eq('title', selectedJob.title)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setAnalysis({
          success: true,
          job: {
            title: data.title,
            resistance_score: data.resistance_score,
            resistance_level: data.resistance_level
          }
        });
      } else {
        setError('Job not found in database');
      }
    } catch (err) {
      setError('Analysis failed. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getScoreLabel = (score) => {
    if (score >= 70) return 'High Resistance';
    if (score >= 40) return 'Medium Resistance';
    return 'Low Resistance';
  };

  const getResistanceLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'high':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI Resistance Scoring Database
        </h1>
        <p className="text-gray-600">
          Search and analyze job titles for their AI resistance scores from our comprehensive database
        </p>
        
        {/* Database Status Indicator */}
        <div className="mt-3 flex items-center space-x-2">
          {dbStatus.testing ? (
            <>
              <Loader className="animate-spin text-blue-600" size={16} />
              <span className="text-sm text-blue-600">Testing database connection...</span>
            </>
          ) : dbStatus.connected ? (
            <>
              <CheckCircle className="text-green-600" size={16} />
              <span className="text-sm text-green-600">
                Database connected - Job titles database ready
              </span>
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
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'analyzer', label: 'Job Search', icon: Search },
          { id: 'database', label: 'Database Status', icon: Database },
          { id: 'settings', label: 'About', icon: Settings }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === tab.id 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon size={18} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Job Search Tab */}
      {activeTab === 'analyzer' && (
        <div className="space-y-6">
          {/* Search Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Search Job Titles</h3>
            <div className="relative">
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Start typing a job title (e.g., 'software engineer', 'nurse', 'teacher')"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={!dbStatus.connected}
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {suggestions.map((job, index) => (
                        <div
                          key={index}
                          onClick={() => handleJobSelection(job)}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                          <div className="font-medium">{job.title}</div>
                          <div className="text-sm text-gray-600">
                            Score: {job.resistance_score}/100
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={handleJobAnalysis}
                  disabled={loading || !selectedJob || !dbStatus.connected}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 min-w-[120px]"
                >
                  {loading ? (
                    <Loader className="animate-spin" size={18} />
                  ) : (
                    <Search size={18} />
                  )}
                  <span>{loading ? 'Analyzing...' : 'Analyze'}</span>
                </button>
              </div>
              
              {!dbStatus.connected && (
                <p className="text-sm text-gray-500 mt-2">
                  Database connection required. Please complete Supabase setup to search jobs.
                </p>
              )}

              {selectedJob && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-blue-900">Selected:</span> {selectedJob.title}
                    </div>
                    <button
                      onClick={() => {
                        setSelectedJob(null);
                        setJobTitle('');
                        setSearchQuery('');
                        setAnalysis(null);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
              <AlertCircle className="text-red-600" size={18} />
              <span className="text-red-800">{error}</span>
            </div>
          )}

          {/* Analysis Results */}
          {analysis && analysis.success && (
            <div className="space-y-6">
              {/* Job Info */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Job Analysis Results</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">Job Title:</span> {analysis.job.title}
                  </div>
                  <div>
                    <span className="font-medium">Resistance Level:</span>
                    <span className={`ml-2 px-3 py-1 text-sm rounded-full ${getResistanceLevelColor(analysis.job.resistance_level)}`}>
                      {analysis.job.resistance_level}
                    </span>
                  </div>
                </div>
              </div>

              {/* Resistance Score */}
              <div className={`border rounded-lg p-6 shadow-sm ${getScoreColor(analysis.job.resistance_score)}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">AI Resistance Score</h3>
                    <p className="text-sm">{getScoreLabel(analysis.job.resistance_score)}</p>
                  </div>
                  <div className="text-4xl font-bold">
                    {analysis.job.resistance_score}/100
                  </div>
                </div>
              </div>

              {/* Score Interpretation */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Score Interpretation</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <div>
                      <span className="font-medium text-green-700">70-100: High Resistance</span>
                      <p className="text-sm text-gray-600">These jobs are highly resistant to AI automation</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <div>
                      <span className="font-medium text-yellow-700">40-69: Medium Resistance</span>
                      <p className="text-sm text-gray-600">These jobs have moderate resistance to AI automation</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <div>
                      <span className="font-medium text-red-700">0-39: Low Resistance</span>
                      <p className="text-sm text-gray-600">These jobs are vulnerable to AI automation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Database Status Tab */}
      {activeTab === 'database' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Database Configuration</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                {dbStatus.connected ? (
                  <CheckCircle className="text-green-600" size={18} />
                ) : (
                  <AlertCircle className="text-red-600" size={18} />
                )}
                <span>Supabase Connection: {dbStatus.connected ? 'Active' : 'Failed'}</span>
              </div>
              
              {dbStatus.connected && (
                <>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="text-green-600" size={18} />
                    <span>Job Titles Table: Connected and ready</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="text-green-600" size={18} />
                    <span>Search Function: search_job_titles RPC available</span>
                  </div>
                </>
              )}
              
              {!dbStatus.connected && dbStatus.error && (
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  <p className="text-red-800 text-sm">
                    <strong>Error:</strong> {dbStatus.error}
                  </p>
                  <p className="text-red-700 text-sm mt-2">
                    Please check your .env.local file and ensure Supabase is properly configured.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold mb-3">Database Schema</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Table: job_titles</li>
                <li>• Column: title (job title)</li>
                <li>• Column: resistance_score (0-100)</li>
                <li>• Column: resistance_level (High/Medium/Low)</li>
                <li>• Search: search_job_titles RPC function</li>
              </ul>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold mb-3">Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Real-time search suggestions</li>
                <li>• Instant AI resistance scoring</li>
                <li>• Resistance level categorization</li>
                <li>• Fast database lookups</li>
                <li>• User-friendly interface</li>
              </ul>
            </div>
          </div>

          {!dbStatus.connected && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3">Setup Instructions</h4>
              <div className="space-y-2 text-blue-800 text-sm">
                <p>1. Create a Supabase project at supabase.com</p>
                <p>2. Create the job_titles table with the required columns</p>
                <p>3. Create the search_job_titles RPC function</p>
                <p>4. Add environment variables to .env.local:</p>
                <div className="bg-blue-100 p-3 rounded mt-2 font-mono text-xs">
                  NEXT_PUBLIC_SUPABASE_URL=your-project-url<br/>
                  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* About Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">About AI Resistance Scoring</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-3">What is AI Resistance?</h4>
                <p className="text-gray-600 mb-3">
                  AI resistance measures how likely a job is to be automated or replaced by artificial intelligence. 
                  Jobs with higher resistance scores are less likely to be automated in the near future.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-3">Score Ranges</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="font-medium text-green-800">70-100: High Resistance</div>
                    <div className="text-sm text-green-700 mt-1">
                      Jobs requiring creativity, human interaction, or physical skills
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="font-medium text-yellow-800">40-69: Medium Resistance</div>
                    <div className="text-sm text-yellow-700 mt-1">
                      Jobs with mixed automation potential
                    </div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="font-medium text-red-800">0-39: Low Resistance</div>
                    <div className="text-sm text-red-700 mt-1">
                      Jobs highly susceptible to automation
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-3">Data Source</h4>
                <p className="text-sm text-gray-600">
                  Our AI resistance scores are based on comprehensive analysis of job requirements, 
                  skills, and automation potential. The data is regularly updated to reflect the 
                  latest developments in AI technology and job market trends.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIResistanceApp;
