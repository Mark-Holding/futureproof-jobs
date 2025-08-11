'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  BriefcaseIcon, 
  MapPinIcon,
  CurrencyDollarIcon,
  ClockIcon,
  UserGroupIcon,
  AcademicCapIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusIcon,
  XMarkIcon,
  EyeIcon,
  EyeSlashIcon,
  DocumentTextIcon,
  StarIcon,
  CogIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'
import CompanySelector from '@/components/employers/CompanySelector'
import { JobPostService } from '@/services/jobPostService'
import JobTitleSearch from '@/components/employers/JobTitleSearch'

// Job posting form data structure
interface JobFormData {
  // Company Information
  company_id: string
  
  // Basic Information
  title: string
  department: string
  location: string
  workType: string[]
  salary: {
    min: string
    max: string
    currency: string
    period: string
  }
  
  // Job Details
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  
  // Experience & Skills
  experienceLevel: string
  educationLevel: string
  requiredSkills: string[]
  preferredSkills: string[]
  humanSkills: string[]
  
  // Company & Contact
  contactPerson: string
  contactEmail: string
  contactPhone: string
  
  // Settings
  isRemote: boolean
  isHybrid: boolean
  visaSponsorship: boolean
  relocationAssistance: boolean
  
  // AI Resistance
  aiResistanceScore: number
  aiResistanceLevel: string
  aiResistanceJobTitle: string
  aiResistanceCalculated: boolean
  humanValueFactors: string[]
  automationRiskFactors: string[]
}

const INITIAL_FORM_DATA: JobFormData = {
  company_id: '',
  title: '',
  department: '',
  location: '',
  workType: [],
  salary: {
    min: '',
    max: '',
    currency: 'USD',
    period: 'year'
  },
  description: '',
  responsibilities: [],
  requirements: [],
  benefits: [],
  experienceLevel: '',
  educationLevel: '',
  requiredSkills: [],
  preferredSkills: [],
  humanSkills: [],
  contactPerson: '',
  contactEmail: '',
  contactPhone: '',
  isRemote: false,
  isHybrid: false,
  visaSponsorship: false,
  relocationAssistance: false,
  aiResistanceScore: 0,
  aiResistanceLevel: '',
  aiResistanceJobTitle: '',
  aiResistanceCalculated: false,
  humanValueFactors: [],
  automationRiskFactors: []
}

const WORK_TYPES = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship']
const EXPERIENCE_LEVELS = ['Entry Level', 'Junior', 'Mid Level', 'Senior', 'Lead', 'Executive']
const EDUCATION_LEVELS = ['High School', 'Associate', 'Bachelor', 'Master', 'PhD', 'No Degree Required']
const COMMON_SKILLS = [
  'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS', 'Docker', 'Kubernetes',
  'Project Management', 'Agile', 'Scrum', 'Design Thinking', 'Data Analysis',
  'Machine Learning', 'UI/UX Design', 'Content Creation', 'Sales', 'Marketing'
]
const HUMAN_SKILLS = [
  'Empathy', 'Emotional Intelligence', 'Creative Problem Solving', 'Critical Thinking',
  'Leadership', 'Communication', 'Collaboration', 'Adaptability', 'Resilience',
  'Ethical Judgment', 'Cultural Intelligence', 'Mentoring', 'Negotiation',
  'Conflict Resolution', 'Strategic Thinking', 'Innovation', 'Customer Service'
]

export default function PostJobPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<JobFormData>(INITIAL_FORM_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  
  const totalSteps = 6

  const updateFormData = (field: keyof JobFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateNestedFormData = (parentField: keyof JobFormData, childField: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...(prev[parentField] as Record<string, any>),
        [childField]: value
      }
    }))
  }

  const addArrayItem = (field: keyof JobFormData, item: string) => {
    if (item.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field] as string[], item.trim()]
      }))
    }
  }

  const removeArrayItem = (field: keyof JobFormData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }))
  }

  const toggleArrayItem = (field: keyof JobFormData, item: string) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[]
      if (currentArray.includes(item)) {
        return {
          ...prev,
          [field]: currentArray.filter(i => i !== item)
        }
      } else {
        return {
          ...prev,
          [field]: [...currentArray, item]
        }
      }
    })
  }



  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!formData.company_id) {
      setSubmitError('Please select a company')
      return
    }

    try {
      setIsSubmitting(true)
      setSubmitError(null)

      const jobPostService = new JobPostService()
      
      // Use AI resistance data from the form
      const aiScore = formData.aiResistanceCalculated ? formData.aiResistanceScore : 0
      
      // Transform form data to match the service interface
      const jobData = {
        company_id: formData.company_id,
        title: formData.title,
        department: formData.department,
        location: formData.location,
        work_type: formData.workType,
        salary_min: formData.salary.min ? parseFloat(formData.salary.min) : undefined,
        salary_max: formData.salary.max ? parseFloat(formData.salary.max) : undefined,
        salary_currency: formData.salary.currency,
        salary_period: formData.salary.period,
        description: formData.description,
        responsibilities: formData.responsibilities,
        requirements: formData.requirements,
        benefits: formData.benefits,
        experience_level: formData.experienceLevel,
        education_level: formData.educationLevel,
        required_skills: formData.requiredSkills,
        preferred_skills: formData.preferredSkills,
        human_skills: formData.humanSkills,
        contact_person: formData.contactPerson,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone,
        is_remote: formData.isRemote,
        is_hybrid: formData.isHybrid,
        visa_sponsorship: formData.visaSponsorship,
        relocation_assistance: formData.relocationAssistance,
        ai_resistance_score: aiScore,
        ai_resistance_level: formData.aiResistanceLevel,
        ai_resistance_job_title: formData.aiResistanceJobTitle,
        ai_resistance_calculated: formData.aiResistanceCalculated,
        human_value_factors: formData.humanValueFactors,
        automation_risk_factors: formData.automationRiskFactors
      }

      const newJobPost = await jobPostService.createJobPost(jobData)
      
      // Redirect to dashboard with success message
      router.push(`/employer/dashboard?job_created=${newJobPost.id}`)
      
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to create job post')
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.company_id && formData.title && formData.location && formData.workType.length > 0
      case 2:
        return formData.description // Only description is required for step 2
      case 3:
        return true // No requirements needed for step 3
      case 4:
        return formData.contactPerson && formData.contactEmail
      case 5:
        return true // AI Resistance step is optional
      default:
        return true
    }
  }

  const getStepStatus = (step: number) => {
    if (step < currentStep) return 'completed'
    if (step === currentStep) return 'current'
    return 'upcoming'
  }

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
              getStepStatus(step) === 'completed' 
                ? 'bg-blue-600 border-blue-600 text-white' 
                : getStepStatus(step) === 'current'
                ? 'bg-white border-blue-600 text-blue-600'
                : 'bg-white border-gray-300 text-gray-500'
            }`}>
              {getStepStatus(step) === 'completed' ? (
                <CheckCircleIcon className="w-5 h-5" />
              ) : (
                <span className="text-sm font-medium">{step}</span>
              )}
            </div>
            {step < totalSteps && (
              <div className={`w-16 h-0.5 mx-2 ${
                getStepStatus(step) === 'completed' ? 'bg-blue-600' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>Basic Info</span>
        <span>Job Details</span>
        <span>Requirements</span>
        <span>Company Info</span>
        <span>AI Resistance</span>
        <span>Review</span>
      </div>
    </div>
  )

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Job Information</h3>
        
        {/* Company Selection */}
        <div className="mb-6">
          <CompanySelector
            selectedCompanyId={formData.company_id}
            onCompanyChange={(companyId) => updateFormData('company_id', companyId)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateFormData('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Senior UX Designer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => updateFormData('department', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Design, Engineering, Marketing"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => updateFormData('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., San Francisco, CA or Remote"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Type *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {WORK_TYPES.map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.workType.includes(type)}
                    onChange={() => toggleArrayItem('workType', type)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 mb-4">Salary Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Salary</label>
            <input
              type="number"
              value={formData.salary.min}
              onChange={(e) => updateNestedFormData('salary', 'min', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="50000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Salary</label>
            <input
              type="number"
              value={formData.salary.max}
              onChange={(e) => updateNestedFormData('salary', 'max', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="80000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select
              value={formData.salary.currency}
              onChange={(e) => updateNestedFormData('salary', 'currency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CAD">CAD (C$)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
            <select
              value={formData.salary.period}
              onChange={(e) => updateNestedFormData('salary', 'period', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="year">Per Year</option>
              <option value="month">Per Month</option>
              <option value="hour">Per Hour</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderJobDetails = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Job Description</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Provide a comprehensive description of the role, including the impact this position will have on the organization..."
          />
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 mb-4">Key Responsibilities</h4>
        <div className="space-y-3">
          {formData.responsibilities.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const newResponsibilities = [...formData.responsibilities]
                  newResponsibilities[index] = e.target.value
                  updateFormData('responsibilities', newResponsibilities)
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Lead user research and design thinking workshops"
              />
              <button
                onClick={() => removeArrayItem('responsibilities', index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() => addArrayItem('responsibilities', '')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Add Responsibility</span>
          </button>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 mb-4">Benefits & Perks</h4>
        <div className="space-y-3">
          {formData.benefits.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const newBenefits = [...formData.benefits]
                  newBenefits[index] = e.target.value
                  updateFormData('benefits', newBenefits)
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Health insurance, 401k matching, flexible work hours"
              />
              <button
                onClick={() => removeArrayItem('benefits', index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() => addArrayItem('benefits', '')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Add Benefit</span>
          </button>
        </div>
      </div>
    </div>
  )

  const renderRequirements = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience Level
          </label>
          <select
            value={formData.experienceLevel}
            onChange={(e) => updateFormData('experienceLevel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Experience Level</option>
            {EXPERIENCE_LEVELS.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Education Level
          </label>
          <select
            value={formData.educationLevel}
            onChange={(e) => updateFormData('educationLevel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Education Level</option>
            {EDUCATION_LEVELS.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 mb-4">Required Skills</h4>
        <div className="space-y-3">
          {formData.requiredSkills.map((skill, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => {
                  const newSkills = [...formData.requiredSkills]
                  newSkills[index] = e.target.value
                  updateFormData('requiredSkills', newSkills)
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., React, User Research, Project Management"
              />
              <button
                onClick={() => removeArrayItem('requiredSkills', index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() => addArrayItem('requiredSkills', '')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Add Required Skill</span>
          </button>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Common skills:</p>
          <div className="flex flex-wrap gap-2">
            {COMMON_SKILLS.map((skill) => (
              <button
                key={skill}
                onClick={() => {
                  if (!formData.requiredSkills.includes(skill)) {
                    addArrayItem('requiredSkills', skill)
                  }
                }}
                className={`px-3 py-1 text-sm rounded-full border ${
                  formData.requiredSkills.includes(skill)
                    ? 'bg-blue-100 text-blue-800 border-blue-300'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 mb-4">Human Skills (AI-Resistant)</h4>
        <div className="space-y-3">
          {formData.humanSkills.map((skill, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => {
                  const newSkills = [...formData.humanSkills]
                  newSkills[index] = e.target.value
                  updateFormData('humanSkills', newSkills)
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Empathy, Creative Problem Solving, Leadership"
              />
              <button
                onClick={() => removeArrayItem('humanSkills', index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() => addArrayItem('humanSkills', '')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Add Human Skill</span>
          </button>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Common human skills:</p>
          <div className="flex flex-wrap gap-2">
            {HUMAN_SKILLS.map((skill) => (
              <button
                key={skill}
                onClick={() => {
                  if (!formData.humanSkills.includes(skill)) {
                    addArrayItem('humanSkills', skill)
                  }
                }}
                className={`px-3 py-1 text-sm rounded-full border ${
                  formData.humanSkills.includes(skill)
                    ? 'bg-green-100 text-green-800 border-green-300'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 mb-4">Preferred Skills (Optional)</h4>
        <div className="space-y-3">
          {formData.preferredSkills.map((skill, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => {
                  const newSkills = [...formData.preferredSkills]
                  newSkills[index] = e.target.value
                  updateFormData('preferredSkills', newSkills)
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., TypeScript, Figma, Agile methodologies"
              />
              <button
                onClick={() => removeArrayItem('preferredSkills', index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() => addArrayItem('preferredSkills', '')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Add Preferred Skill</span>
          </button>
        </div>
      </div>
    </div>
  )

  const renderAIResistance = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">AI Resistance Score</h3>
        <p className="text-gray-600 mb-6">
          Help candidates understand how future-proof this role is by finding the AI resistance score for your job title.
        </p>
        
        <JobTitleSearch
          onJobSelected={(job) => {
            if (job) {
              updateFormData('aiResistanceScore', job.resistance_score)
              updateFormData('aiResistanceLevel', job.resistance_level)
              updateFormData('aiResistanceJobTitle', job.title)
              updateFormData('aiResistanceCalculated', true)
            }
          }}
          onNoMatchFound={async (jobTitle) => {
            updateFormData('aiResistanceJobTitle', jobTitle)
            updateFormData('aiResistanceCalculated', false)
            updateFormData('aiResistanceScore', 0)
            updateFormData('aiResistanceLevel', 'Not Calculated')
            
            // Record the missing job title in the database
            try {
              const jobPostService = new JobPostService()
              await jobPostService.recordMissingJobTitle(jobTitle, formData.company_id)
            } catch (error) {
              console.error('Failed to record missing job title:', error)
            }
          }}
          selectedJobTitle={formData.title}
        />
      </div>
    </div>
  )

  const renderCompanyInfo = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Person *
            </label>
            <input
              type="text"
              value={formData.contactPerson}
              onChange={(e) => updateFormData('contactPerson', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Sarah Johnson"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Email *
            </label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => updateFormData('contactEmail', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., sarah.johnson@company.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Phone
            </label>
            <input
              type="tel"
              value={formData.contactPhone}
              onChange={(e) => updateFormData('contactPhone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., +1 (555) 123-4567"
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Contact Information Privacy</p>
            <p>This contact information will be used to receive job applications and will not be visible to job seekers on the job posting.</p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 mb-4">Additional Options</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isRemote}
                onChange={(e) => updateFormData('isRemote', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Remote work available</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isHybrid}
                onChange={(e) => updateFormData('isHybrid', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Hybrid work model</span>
            </label>
          </div>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.visaSponsorship}
                onChange={(e) => updateFormData('visaSponsorship', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Visa sponsorship available</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.relocationAssistance}
                onChange={(e) => updateFormData('relocationAssistance', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Relocation assistance</span>
            </label>
          </div>
        </div>
      </div>


    </div>
  )

  const renderReview = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Review Your Job Posting</h3>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            {showPreview ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
            <span>{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
          </button>
        </div>

        {showPreview && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{formData.title}</h2>
                <p className="text-gray-600">{formData.department}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">{formData.location}</div>
                <div className="text-sm text-gray-600">
                  {formData.salary.min && formData.salary.max 
                    ? `${formData.salary.currency} ${formData.salary.min} - ${formData.salary.max} per ${formData.salary.period}`
                    : formData.salary.min && !formData.salary.max
                    ? `${formData.salary.currency} from ${formData.salary.min} per ${formData.salary.period}`
                    : !formData.salary.min && formData.salary.max
                    ? `${formData.salary.currency} up to ${formData.salary.max} per ${formData.salary.period}`
                    : 'Salary not specified'
                  }
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-700">{formData.description}</p>
            </div>
            
            {formData.responsibilities.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Key Responsibilities:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {formData.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {formData.requiredSkills.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Required Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.requiredSkills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {formData.humanSkills.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Human Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.humanSkills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <ShieldCheckIcon className="w-5 h-5 text-green-600" />
                {formData.aiResistanceCalculated ? (
                  <span className="text-sm font-medium text-green-600">
                    {formData.aiResistanceScore}/100 AI Resistance Score
                  </span>
                ) : (
                  <span className="text-sm font-medium text-yellow-600">
                    AI Resistance Score: Not Calculated
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-600">
                Contact: {formData.contactPerson} • {formData.contactEmail}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Job Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Title:</span>
                <span className="font-medium">{formData.title || 'Not specified'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Department:</span>
                <span className="font-medium">{formData.department || 'Not specified'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{formData.location || 'Not specified'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Work Type:</span>
                <span className="font-medium">{formData.workType.join(', ') || 'Not specified'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Experience:</span>
                <span className="font-medium">{formData.experienceLevel || 'Not specified'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">AI Resistance Analysis</h4>
            <div className="space-y-3">
              {formData.aiResistanceCalculated ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">AI Resistance Score:</span>
                    <span className={`text-lg font-bold ${
                      formData.aiResistanceScore >= 70 ? 'text-green-600' : 
                      formData.aiResistanceScore >= 40 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {formData.aiResistanceScore}/100
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Resistance Level:</span>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      formData.aiResistanceLevel === 'Very High' ? 'bg-green-100 text-green-800' :
                      formData.aiResistanceLevel === 'High' ? 'bg-emerald-100 text-emerald-800' :
                      formData.aiResistanceLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      formData.aiResistanceLevel === 'Low' ? 'bg-orange-100 text-orange-800' :
                      formData.aiResistanceLevel === 'Very Low' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {formData.aiResistanceLevel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Job Title:</span>
                    <span className="font-medium">{formData.aiResistanceJobTitle}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {formData.aiResistanceScore >= 70 ? 'Excellent AI resistance - This role is highly future-proof' :
                     formData.aiResistanceScore >= 40 ? 'Good AI resistance - This role has moderate automation risk' :
                     'Lower AI resistance - This role may face automation challenges'}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">AI Resistance Score:</span>
                    <span className="text-lg font-bold text-gray-500">Not Calculated</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Job Title:</span>
                    <span className="font-medium">{formData.aiResistanceJobTitle}</span>
                  </div>
                  <div className="text-xs text-yellow-600 mt-2">
                    This job title will be added to our AI resistance database for future analysis.
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h5 className="text-sm font-medium text-yellow-900">Ready to Post?</h5>
              <p className="text-sm text-yellow-700 mt-1">
                Review all information carefully. Once posted, your job will be visible to candidates 
                and you can manage applications from your dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderBasicInfo()
      case 2:
        return renderJobDetails()
      case 3:
        return renderRequirements()
      case 4:
        return renderCompanyInfo()
      case 5:
        return renderAIResistance()
      case 6:
        return renderReview()
      default:
        return renderBasicInfo()
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </button>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Post a New Job</h1>
            <p className="text-gray-600 mt-2">
              Create a compelling job posting that attracts AI-resistant talent
            </p>
          </div>

          {/* Progress Indicator */}
          {renderStepIndicator()}

          {/* Form Content */}
          <div className="bg-white rounded-lg shadow p-8">
            {renderCurrentStep()}

            {/* Error Display */}
            {submitError && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-center space-x-2">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
                  <p className="text-red-800">{submitError}</p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                  currentStep === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <ArrowLeftIcon className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-3">
                {currentStep < totalSteps ? (
                  <button
                    onClick={handleNext}
                    disabled={!canProceedToNext()}
                    className={`flex items-center space-x-2 px-6 py-2 rounded-md transition-colors ${
                      canProceedToNext()
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <span>Next</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <CogIcon className="w-4 h-4 animate-spin" />
                        <span>Posting Job...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon className="w-4 h-4" />
                        <span>Post Job</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
} 