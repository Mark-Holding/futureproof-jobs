'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

export default function DatabaseDebug() {
  const [debugInfo, setDebugInfo] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    runDiagnostics()
  }, [])

  const addLog = (message: string) => {
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const runDiagnostics = async () => {
    try {
      setLoading(true)
      addLog('🔍 Starting database diagnostics...')

      // Test 1: Check authentication
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError) {
        addLog(`❌ Auth error: ${authError.message}`)
        return
      }
      if (!user) {
        addLog('❌ No authenticated user found')
        return
      }
      addLog(`✅ User authenticated: ${user.email}`)

      // Test 2: Check if company_members table exists
      addLog('🔍 Checking company_members table...')
      const { data: membersCheck, error: membersError } = await supabase
        .from('company_members')
        .select('count')
        .limit(1)

      if (membersError) {
        addLog(`❌ company_members table error: ${membersError.message}`)
      } else {
        addLog('✅ company_members table accessible')
      }

      // Test 3: Check if companies table exists
      addLog('🔍 Checking companies table...')
      const { data: companiesCheck, error: companiesError } = await supabase
        .from('companies')
        .select('count')
        .limit(1)

      if (companiesError) {
        addLog(`❌ companies table error: ${companiesError.message}`)
      } else {
        addLog('✅ companies table accessible')
      }

      // Test 4: Try to fetch user's company memberships
      addLog('🔍 Fetching user company memberships...')
      const { data: memberships, error: membershipsError } = await supabase
        .from('company_members')
        .select(`
          company_id,
          role,
          companies (
            id,
            name
          )
        `)
        .eq('user_id', user.id)

      if (membershipsError) {
        addLog(`❌ Failed to fetch memberships: ${membershipsError.message}`)
      } else {
        addLog(`✅ Found ${memberships?.length || 0} company memberships`)
        if (memberships && memberships.length > 0) {
          memberships.forEach((membership, index) => {
            addLog(`   ${index + 1}. Company: ${membership.companies?.name || 'Unknown'} (Role: ${membership.role})`)
          })
        }
      }

      // Test 5: Check RLS policies
      addLog('🔍 Checking RLS status...')
      const { data: rlsCheck, error: rlsError } = await supabase
        .rpc('get_rls_status', { table_name: 'company_members' })
        .catch(() => ({ data: null, error: { message: 'RPC function not available' } }))

      if (rlsError) {
        addLog(`ℹ️ RLS check: ${rlsError.message}`)
      } else {
        addLog('✅ RLS check completed')
      }

    } catch (error) {
      addLog(`❌ Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
      addLog('🏁 Diagnostics complete')
    }
  }

  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-900">Database Debug Info</h4>
        <button
          onClick={runDiagnostics}
          disabled={loading}
          className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Running...' : 'Re-run'}
        </button>
      </div>
      
      <div className="bg-white border border-gray-200 rounded p-3 max-h-64 overflow-y-auto">
        {debugInfo.length === 0 ? (
          <div className="text-gray-500 text-sm">No debug info yet...</div>
        ) : (
          debugInfo.map((log, index) => (
            <div key={index} className="text-xs font-mono mb-1">
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
