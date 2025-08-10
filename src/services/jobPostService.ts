import { createClient } from '@/lib/supabase'

export interface JobPost {
  id?: string
  company_id: string
  title: string
  department?: string
  location: string
  work_type: string[]
  salary_min?: number
  salary_max?: number
  salary_currency: string
  salary_period: string
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  experience_level?: string
  education_level?: string
  required_skills: string[]
  preferred_skills: string[]
  human_skills: string[]
  contact_person?: string
  contact_email?: string
  contact_phone?: string
  is_remote: boolean
  is_hybrid: boolean
  visa_sponsorship: boolean
  relocation_assistance: boolean
  ai_resistance_score?: number
  ai_resistance_level?: string
  ai_resistance_job_title?: string
  ai_resistance_calculated?: boolean
  human_value_factors: string[]
  automation_risk_factors: string[]
  status: 'draft' | 'published' | 'closed' | 'archived'
  is_active: boolean
}

export class JobPostService {
  private supabase = createClient()

  // Create new job post
  async createJobPost(jobData: Omit<JobPost, 'id' | 'status' | 'is_active'>): Promise<JobPost> {
    const { data: { user } } = await this.supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')
    
    // Verify user has access to the company
    const { data: companyAccess } = await this.supabase
      .from('company_members')
      .select('role')
      .eq('company_id', jobData.company_id)
      .eq('user_id', user.id)
      .single()

    if (!companyAccess) {
      throw new Error('You do not have access to this company')
    }

    const { data, error } = await this.supabase
      .from('job_posts')
      .insert({
        ...jobData,
        employer_id: user.id,
        status: 'draft',
        is_active: true
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // Get employer's job posts
  async getEmployerJobPosts(status?: string): Promise<JobPost[]> {
    const { data: { user } } = await this.supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')
    
    let query = this.supabase
      .from('job_posts')
      .select(`
        *,
        companies (
          id,
          name,
          industry
        )
      `)
      .eq('employer_id', user.id)
      .order('created_at', { ascending: false })
    
    if (status) {
      query = query.eq('status', status)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data || []
  }

  // Get company's job posts
  async getCompanyJobPosts(companyId: string, status?: string): Promise<JobPost[]> {
    const { data: { user } } = await this.supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')
    
    // Verify user has access to the company
    const { data: companyAccess } = await this.supabase
      .from('company_members')
      .select('role')
      .eq('company_id', companyId)
      .eq('user_id', user.id)
      .single()

    if (!companyAccess) {
      throw new Error('You do not have access to this company')
    }

    let query = this.supabase
      .from('job_posts')
      .select('*')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false })
    
    if (status) {
      query = query.eq('status', status)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data || []
  }

  // Update job post
  async updateJobPost(id: string, updates: Partial<JobPost>): Promise<JobPost> {
    const { data: { user } } = await this.supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')
    
    const { data, error } = await this.supabase
      .from('job_posts')
      .update(updates)
      .eq('id', id)
      .eq('employer_id', user.id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // Delete job post
  async deleteJobPost(id: string): Promise<void> {
    const { data: { user } } = await this.supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')
    
    const { error } = await this.supabase
      .from('job_posts')
      .delete()
      .eq('id', id)
      .eq('employer_id', user.id)
    
    if (error) throw error
  }

  // Publish job post
  async publishJobPost(id: string): Promise<JobPost> {
    return this.updateJobPost(id, {
      status: 'published',
      published_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
    })
  }

  // Close job post
  async closeJobPost(id: string): Promise<JobPost> {
    return this.updateJobPost(id, {
      status: 'closed',
      is_active: false
    })
  }

  // Record missing job title for future analysis
  async recordMissingJobTitle(jobTitle: string, companyId: string): Promise<void> {
    const { data: { user } } = await this.supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')
    
    const { error } = await this.supabase
      .from('missing_user_job_titles')
      .insert({
        job_title: jobTitle,
        company_id: companyId,
        user_id: user.id
      })
    
    if (error) throw error
  }
}
