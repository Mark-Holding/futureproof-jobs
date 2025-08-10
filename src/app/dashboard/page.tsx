'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  BriefcaseIcon, 
  UserIcon, 
  ChartBarIcon, 
  BellIcon,
  HeartIcon,
  EyeIcon,
  CheckCircleIcon,
  ClockIcon,
  StarIcon,
  AcademicCapIcon,
  LightBulbIcon,
  ArrowUpIcon as TrendingUpIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  BookmarkIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  ArrowUpIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  UserCircleIcon,
  CameraIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  BellSlashIcon,
  KeyIcon,
  DocumentArrowDownIcon,
  TrashIcon,
  PencilIcon,
  PhoneIcon,
  EnvelopeIcon as MailIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

// Dummy data for the job seeker dashboard
const JOBSEEKER_DATA = {
  profile: {
    name: 'Alex Johnson',
    title: 'UX Designer',
    location: 'San Francisco, CA',
    experience: '5 years',
    avatar: 'AJ',
    aiResistanceScore: 94,
    skillMatch: 87,
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    website: 'https://alexjohnson.design',
    linkedin: 'https://linkedin.com/in/alexjohnson',
    github: 'https://github.com/alexjohnson',
    bio: 'Passionate UX designer with 5+ years of experience creating human-centered digital experiences. Specialized in AI-resistant design principles that prioritize empathy, creativity, and human connection.',
    summary: 'Senior UX Designer with expertise in user research, interaction design, and design systems. Proven track record of creating intuitive, accessible, and emotionally resonant user experiences.',
    profileCompletion: 87,
    isPublic: true,
    lastUpdated: '2024-01-15'
  },
  stats: {
    applicationsSubmitted: 24,
    interviewsScheduled: 8,
    offersReceived: 2,
    jobsSaved: 15,
    profileViews: 47,
    daysActive: 45
  },
  recentActivity: [
    {
      id: 1,
      type: 'application',
      message: 'Applied for Senior UX Designer at TechCorp Solutions',
      time: '2 hours ago',
      status: 'submitted'
    },
    {
      id: 2,
      type: 'interview',
      message: 'Interview scheduled with Wellness Partners Alliance',
      time: '1 day ago',
      status: 'scheduled'
    },
    {
      id: 3,
      type: 'offer',
      message: 'Received offer from Artisan Brand Studio',
      time: '3 days ago',
      status: 'received'
    },
    {
      id: 4,
      type: 'profile_view',
      message: 'Your profile was viewed by 3 companies',
      time: '5 days ago',
      status: 'viewed'
    }
  ],
  recommendedJobs: [
    {
      id: 1,
      title: 'Senior UX Designer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      salary: '$120,000 - $150,000',
      postedDate: '2 days ago',
      aiResistanceScore: 96,
      skillMatch: 94,
      isSaved: true,
      logoText: 'TC',
      description: 'Lead user experience design for our AI-resistant product suite. Focus on human-centered design principles and emotional intelligence in user interactions.',
      topSkills: ['Empathy', 'Creativity', 'User Research', 'Design Systems']
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'Innovation Labs',
      location: 'Remote',
      salary: '$130,000 - $160,000',
      postedDate: '1 day ago',
      aiResistanceScore: 89,
      skillMatch: 82,
      isSaved: false,
      logoText: 'IL',
      description: 'Drive product strategy for human-AI collaboration tools. Requires strong interpersonal skills and strategic thinking.',
      topSkills: ['Strategic Thinking', 'Leadership', 'User Empathy', 'Data Analysis']
    },
    {
      id: 3,
      title: 'Creative Director',
      company: 'Artisan Brand Studio',
      location: 'New York, NY',
      salary: '$140,000 - $170,000',
      postedDate: '3 days ago',
      aiResistanceScore: 92,
      skillMatch: 88,
      isSaved: true,
      logoText: 'AB',
      description: 'Lead creative vision for brands that prioritize human connection and authentic storytelling.',
      topSkills: ['Creativity', 'Social Influence', 'Emotional Intelligence', 'Design']
    },
    {
      id: 4,
      title: 'Human Resources Manager',
      company: 'People First Corp',
      location: 'Austin, TX',
      salary: '$90,000 - $120,000',
      postedDate: '4 days ago',
      aiResistanceScore: 91,
      skillMatch: 76,
      isSaved: false,
      logoText: 'PF',
      description: 'Build and maintain human-centered workplace culture. Focus on employee development and well-being.',
      topSkills: ['Empathy', 'Interpersonal Skills', 'Conflict Resolution', 'Leadership']
    }
  ],
  applications: [
    {
      id: 1,
      jobTitle: 'Senior UX Designer',
      company: 'TechCorp Solutions',
      appliedDate: '2024-01-15',
      status: 'interview_scheduled',
      aiResistanceScore: 96,
      nextStep: 'Interview on Jan 20th at 2:00 PM',
      logoText: 'TC'
    },
    {
      id: 2,
      jobTitle: 'UX Designer',
      company: 'Design Studio Pro',
      appliedDate: '2024-01-12',
      status: 'under_review',
      aiResistanceScore: 88,
      nextStep: 'Application under review',
      logoText: 'DS'
    },
    {
      id: 3,
      jobTitle: 'Product Designer',
      company: 'Innovation Labs',
      appliedDate: '2024-01-10',
      status: 'rejected',
      aiResistanceScore: 85,
      nextStep: 'Position filled',
      logoText: 'IL'
    },
    {
      id: 4,
      jobTitle: 'Creative Director',
      company: 'Artisan Brand Studio',
      appliedDate: '2024-01-08',
      status: 'offer_received',
      aiResistanceScore: 92,
      nextStep: 'Review offer by Jan 18th',
      logoText: 'AB'
    }
  ],
  skillDevelopment: {
    currentSkills: [
      { name: 'User Research', level: 85, trend: 'up' },
      { name: 'Empathy', level: 92, trend: 'up' },
      { name: 'Creativity', level: 88, trend: 'stable' },
      { name: 'Design Systems', level: 78, trend: 'up' },
      { name: 'Interpersonal Communication', level: 82, trend: 'up' }
    ],
    recommendedSkills: [
      { name: 'Strategic Thinking', importance: 'high', gap: 15 },
      { name: 'Leadership', importance: 'medium', gap: 12 },
      { name: 'Data Analysis', importance: 'medium', gap: 8 }
    ],
    learningResources: [
      {
        title: 'Advanced User Research Methods',
        type: 'course',
        duration: '6 hours',
        provider: 'Coursera',
        aiResistance: 'high'
      },
      {
        title: 'Emotional Intelligence in Design',
        type: 'workshop',
        duration: '2 hours',
        provider: 'Design Institute',
        aiResistance: 'high'
      },
      {
        title: 'Strategic Product Thinking',
        type: 'course',
        duration: '8 hours',
        provider: 'edX',
        aiResistance: 'high'
      }
    ]
  },
  aiResistanceInsights: {
    overallScore: 94,
    topStrengths: [
      { skill: 'Empathy', score: 92 },
      { skill: 'Creativity', score: 88 },
      { skill: 'User Research', score: 85 }
    ],
    improvementAreas: [
      { skill: 'Strategic Thinking', gap: 15 },
      { skill: 'Leadership', gap: 12 },
      { skill: 'Data Analysis', gap: 8 }
    ],
    careerRecommendations: [
      'UX Designer (96% AI-resistant)',
      'Product Manager (89% AI-resistant)',
      'Creative Director (92% AI-resistant)',
      'Human Resources Manager (91% AI-resistant)'
    ]
  },
  savedJobs: [
    {
      id: 1,
      title: 'Senior UX Designer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      salary: '$120,000 - $150,000',
      savedDate: '2024-01-14',
      aiResistanceScore: 96,
      logoText: 'TC'
    },
    {
      id: 2,
      title: 'Creative Director',
      company: 'Artisan Brand Studio',
      location: 'New York, NY',
      salary: '$140,000 - $170,000',
      savedDate: '2024-01-12',
      aiResistanceScore: 92,
      logoText: 'AB'
    },
    {
      id: 3,
      title: 'Product Manager',
      company: 'Innovation Labs',
      location: 'Remote',
      salary: '$130,000 - $160,000',
      savedDate: '2024-01-10',
      aiResistanceScore: 89,
      logoText: 'IL'
    }
  ],
  settings: {
    account: {
      email: 'alex.johnson@email.com',
      emailVerified: true,
      twoFactorEnabled: false,
      lastLogin: '2024-01-15 10:30 AM',
      accountCreated: '2023-06-15'
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false,
      allowProfileViews: true,
      allowMessages: true,
      dataSharing: 'limited'
    },
    notifications: {
      newJobs: true,
      applicationUpdates: true,
      profileViews: true,
      skillRecommendations: true,
      learningReminders: true,
      marketingEmails: false,
      weeklyDigest: true
    },
    jobPreferences: {
      jobTypes: ['full-time', 'remote', 'hybrid'],
      salaryRange: { min: 80000, max: 150000 },
      locations: ['San Francisco, CA', 'Remote', 'New York, NY'],
      industries: ['Technology', 'Design', 'Healthcare'],
      experienceLevel: 'senior',
      aiResistanceFocus: true
    },
    applicationPreferences: {
      autoApply: false,
      requireCoverLetter: true,
      saveApplications: true,
      trackApplicationStatus: true,
      notifyOnStatusChange: true
    }
  },
  documents: {
    resume: {
      name: 'Alex_Johnson_Resume_2024.pdf',
      size: '2.3 MB',
      uploaded: '2024-01-10',
      isPublic: true
    },
    portfolio: {
      name: 'Alex_Johnson_Portfolio.pdf',
      size: '15.7 MB',
      uploaded: '2024-01-08',
      isPublic: true
    },
    coverLetter: {
      name: 'Generic_Cover_Letter.pdf',
      size: '1.1 MB',
      uploaded: '2024-01-05',
      isPublic: false
    }
  },
  cvs: [
    {
      id: 1,
      name: 'Alex Johnson - UX Designer CV',
      filename: 'Alex_Johnson_UX_Designer_CV.pdf',
      size: '2.3 MB',
      uploaded: '2024-01-15',
      lastModified: '2024-01-15',
      isDefault: true,
      isPublic: true,
      type: 'CV',
      version: 'v2.1',
      description: 'Main CV for UX Designer positions with focus on AI-resistant skills',
      tags: ['UX Design', 'AI-Resistant', 'Senior Level'],
      aiResistanceScore: 94,
      skillMatch: 87,
      applicationsUsed: 12,
      lastUsed: '2024-01-15'
    },
    {
      id: 2,
      name: 'Alex Johnson - Product Manager CV',
      filename: 'Alex_Johnson_Product_Manager_CV.pdf',
      size: '2.1 MB',
      uploaded: '2024-01-12',
      lastModified: '2024-01-12',
      isDefault: false,
      isPublic: true,
      type: 'CV',
      version: 'v1.0',
      description: 'Specialized CV for Product Manager roles emphasizing leadership and strategy',
      tags: ['Product Management', 'Leadership', 'Strategy'],
      aiResistanceScore: 89,
      skillMatch: 82,
      applicationsUsed: 3,
      lastUsed: '2024-01-14'
    },
    {
      id: 3,
      name: 'Alex Johnson - Creative Director CV',
      filename: 'Alex_Johnson_Creative_Director_CV.pdf',
      size: '2.5 MB',
      uploaded: '2024-01-10',
      lastModified: '2024-01-10',
      isDefault: false,
      isPublic: true,
      type: 'CV',
      version: 'v1.0',
      description: 'Creative-focused CV highlighting design leadership and artistic direction',
      tags: ['Creative Direction', 'Design Leadership', 'Artistic'],
      aiResistanceScore: 92,
      skillMatch: 88,
      applicationsUsed: 2,
      lastUsed: '2024-01-13'
    },
    {
      id: 4,
      name: 'Alex Johnson - Cover Letter Template',
      filename: 'Alex_Johnson_Cover_Letter_Template.pdf',
      size: '1.1 MB',
      uploaded: '2024-01-08',
      lastModified: '2024-01-08',
      isDefault: false,
      isPublic: false,
      type: 'Cover Letter',
      version: 'v1.0',
      description: 'Generic cover letter template for customization',
      tags: ['Cover Letter', 'Template'],
      aiResistanceScore: 85,
      skillMatch: 75,
      applicationsUsed: 8,
      lastUsed: '2024-01-15'
    }
  ],
  cvAnalytics: {
    totalCvs: 4,
    totalApplications: 25,
    averageAiResistanceScore: 90,
    mostUsedCv: 'Alex Johnson - UX Designer CV',
    recentUploads: 2,
    storageUsed: '8.0 MB',
    storageLimit: '50 MB'
  },
  skills: {
    technical: [
      { id: 1, name: 'Figma', level: 'Expert', years: 4, aiResistance: 'Medium', category: 'Design Tools' },
      { id: 2, name: 'Adobe Creative Suite', level: 'Advanced', years: 5, aiResistance: 'Medium', category: 'Design Tools' },
      { id: 3, name: 'Sketch', level: 'Intermediate', years: 3, aiResistance: 'Medium', category: 'Design Tools' },
      { id: 4, name: 'HTML/CSS', level: 'Advanced', years: 4, aiResistance: 'Low', category: 'Programming' },
      { id: 5, name: 'JavaScript', level: 'Intermediate', years: 2, aiResistance: 'Low', category: 'Programming' },
      { id: 6, name: 'React', level: 'Beginner', years: 1, aiResistance: 'Low', category: 'Programming' }
    ],
    soft: [
      { id: 7, name: 'User Research', level: 'Expert', years: 5, aiResistance: 'High', category: 'Research' },
      { id: 8, name: 'Empathy', level: 'Expert', years: 5, aiResistance: 'High', category: 'Interpersonal' },
      { id: 9, name: 'Creativity', level: 'Advanced', years: 5, aiResistance: 'High', category: 'Creative' },
      { id: 10, name: 'Communication', level: 'Advanced', years: 5, aiResistance: 'High', category: 'Interpersonal' },
      { id: 11, name: 'Problem Solving', level: 'Advanced', years: 4, aiResistance: 'High', category: 'Analytical' },
      { id: 12, name: 'Leadership', level: 'Intermediate', years: 3, aiResistance: 'High', category: 'Management' }
    ],
    emerging: [
      { id: 13, name: 'AI/ML Understanding', level: 'Beginner', years: 1, aiResistance: 'Medium', category: 'Technology' },
      { id: 14, name: 'Data Analysis', level: 'Intermediate', years: 2, aiResistance: 'Medium', category: 'Analytical' },
      { id: 15, name: 'Strategic Thinking', level: 'Intermediate', years: 3, aiResistance: 'High', category: 'Strategic' }
    ]
  }
}

export default function JobSeekerDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isEditingSkills, setIsEditingSkills] = useState(false)
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Beginner', category: 'Technical' })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'interview_scheduled': return 'bg-blue-100 text-blue-800'
      case 'under_review': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'offer_received': return 'bg-green-100 text-green-800'
      case 'submitted': return 'bg-gray-100 text-gray-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'received': return 'bg-green-100 text-green-800'
      case 'viewed': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'interview_scheduled': return <ClockIcon className="w-4 h-4" />
      case 'under_review': return <EyeIcon className="w-4 h-4" />
      case 'rejected': return <XCircleIcon className="w-4 h-4" />
      case 'offer_received': return <CheckCircleIcon className="w-4 h-4" />
      case 'submitted': return <DocumentTextIcon className="w-4 h-4" />
      case 'scheduled': return <CalendarIcon className="w-4 h-4" />
      case 'received': return <StarIcon className="w-4 h-4" />
      case 'viewed': return <EyeIcon className="w-4 h-4" />
      default: return <DocumentTextIcon className="w-4 h-4" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUpIcon className="w-4 h-4 text-green-500" />
      case 'down': return <ArrowUpIcon className="w-4 h-4 text-red-500 transform rotate-180" />
      default: return <div className="w-4 h-4" />
    }
  }
  
  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Dashboard Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  {JOBSEEKER_DATA.profile.avatar}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Welcome back, {JOBSEEKER_DATA.profile.name}</h1>
                  <p className="text-gray-600">{JOBSEEKER_DATA.profile.title} • {JOBSEEKER_DATA.profile.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-gray-600">AI Resistance Score</div>
                  <div className="text-xl font-bold text-green-600">{JOBSEEKER_DATA.profile.aiResistanceScore}%</div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                  <BellIcon className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
          
        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', name: 'Overview', icon: ChartBarIcon },
                { id: 'applications', name: 'My Applications', icon: DocumentTextIcon },
                { id: 'saved', name: 'Saved Jobs', icon: BookmarkIcon },
                { id: 'jobs', name: 'Recommended Jobs', icon: BriefcaseIcon },
                { id: 'skills', name: 'Skills & Learning', icon: AcademicCapIcon },
                { id: 'cv', name: 'CVs & Documents', icon: DocumentTextIcon },
                { id: 'profile', name: 'Profile', icon: UserIcon },
                { id: 'settings', name: 'Settings', icon: Cog6ToothIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <DocumentTextIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Applications</p>
                      <p className="text-2xl font-bold text-gray-900">{JOBSEEKER_DATA.stats.applicationsSubmitted}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CalendarIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Interviews</p>
                      <p className="text-2xl font-bold text-gray-900">{JOBSEEKER_DATA.stats.interviewsScheduled}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <StarIcon className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Offers</p>
                      <p className="text-2xl font-bold text-gray-900">{JOBSEEKER_DATA.stats.offersReceived}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <EyeIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Profile Views</p>
                      <p className="text-2xl font-bold text-gray-900">{JOBSEEKER_DATA.stats.profileViews}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* AI Resistance Insights */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">AI Resistance Insights</h3>
                  <p className="text-sm text-gray-600">Your career resilience in the age of AI</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {JOBSEEKER_DATA.aiResistanceInsights.overallScore}%
                      </div>
                      <p className="text-sm text-gray-600">Overall AI Resistance Score</p>
                      <p className="text-xs text-green-600 mt-1">Excellent! You're well-positioned for the future.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Your Strengths</h4>
                      <div className="space-y-2">
                        {JOBSEEKER_DATA.aiResistanceInsights.topStrengths.map((strength, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">{strength.skill}</span>
                            <span className="text-sm font-medium text-green-600">{strength.score}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Career Recommendations</h4>
                      <div className="space-y-2">
                        {JOBSEEKER_DATA.aiResistanceInsights.careerRecommendations.map((career, index) => (
                          <div key={index} className="text-sm text-gray-600">
                            {career}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity and Recommended Jobs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {JOBSEEKER_DATA.recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{activity.message}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
                            {activity.status.replace('_', ' ')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Top Recommended Jobs */}
                <div className="bg-white rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Top Recommendations</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {JOBSEEKER_DATA.recommendedJobs.slice(0, 3).map((job) => (
                        <div key={job.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                          <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-sm font-medium">
                            {job.logoText}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{job.title}</p>
                            <p className="text-xs text-gray-600">{job.company} • {job.location}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                {job.aiResistanceScore}% AI-Resistant
                              </span>
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                {job.skillMatch}% Match
                              </span>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-red-500">
                            <HeartIcon className={`w-5 h-5 ${job.isSaved ? 'text-red-500 fill-current' : ''}`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Add placeholder for other tabs */}
          {activeTab !== 'overview' && (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Tab</h2>
              <p className="text-gray-600">This tab is under development.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
} 