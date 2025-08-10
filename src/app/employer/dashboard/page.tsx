'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  BriefcaseIcon, 
  UserGroupIcon, 
  ChartBarIcon, 
  BellIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  StarIcon,
  CreditCardIcon,
  Cog6ToothIcon,
  UserPlusIcon,
  ShieldCheckIcon,
  BellSlashIcon,
  KeyIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  LightBulbIcon,
  HeartIcon,
  SparklesIcon,
  RocketLaunchIcon,
  BuildingOfficeIcon,
  UsersIcon,
  ChartPieIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  FireIcon,
  TagIcon,
  TrophyIcon,
  ClockIcon as ClockIconSolid
} from '@heroicons/react/24/outline'

// Enhanced TechCorp Solutions data
const TECHCORP_DATA = {
  company: {
    name: 'TechCorp Solutions',
    logo: 'TC',
    industry: 'Technology & AI Solutions',
    size: '250-500 employees',
    location: 'San Francisco, CA',
    founded: '2018',
    website: 'techcorp.com',
    description: 'Leading technology solutions provider focused on AI-resistant talent development and human-centered innovation.'
  },
  stats: {
    activeJobs: 15,
    totalApplications: 1247,
    interviewsScheduled: 34,
    hiresThisMonth: 12,
    averageTimeToHire: 16,
    candidateSatisfaction: 4.8,
    aiResistanceScore: 89,
    retentionRate: 94,
    costPerHire: 8500,
    applicationResponseTime: 2.3
  },
  recentActivity: [
    {
      id: 1,
      type: 'application',
      message: 'Sarah Chen applied for Senior UX Designer',
      time: '2 hours ago',
      priority: 'high',
      avatar: 'SC',
      role: 'Senior UX Designer',
      aiScore: 96
    },
    {
      id: 2,
      type: 'interview',
      message: 'Interview scheduled with Michael Rodriguez for Product Manager',
      time: '4 hours ago',
      priority: 'medium',
      avatar: 'MR',
      role: 'Product Manager',
      aiScore: 91
    },
    {
      id: 3,
      type: 'hired',
      message: 'Jessica Kim accepted offer for Data Scientist position',
      time: '1 day ago',
      priority: 'high',
      avatar: 'JK',
      role: 'Data Scientist',
      aiScore: 82
    },
    {
      id: 4,
      type: 'application',
      message: '15 new applications for Frontend Developer role',
      time: '2 days ago',
      priority: 'medium',
      avatar: 'FD',
      role: 'Frontend Developer',
      aiScore: 68
    },
    {
      id: 5,
      type: 'interview',
      message: 'David Thompson completed technical assessment',
      time: '3 days ago',
      priority: 'high',
      avatar: 'DT',
      role: 'Backend Engineer',
      aiScore: 74
    }
  ],
  activeJobs: [
    {
      id: 1,
      title: 'Senior UX Designer',
      department: 'Design',
      applications: 67,
      status: 'active',
      postedDate: '2024-01-15',
      aiResistanceScore: 94,
      topSkills: ['Empathy', 'Creativity', 'User Research', 'Design Systems'],
      salary: '$120k - $150k',
      location: 'San Francisco, CA',
      workType: 'Full-time',
      experienceLevel: 'Senior',
      views: 234,
      daysLeft: 12
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      applications: 45,
      status: 'active',
      postedDate: '2024-01-10',
      aiResistanceScore: 89,
      topSkills: ['Strategic Thinking', 'Leadership', 'User Empathy', 'Data Analysis'],
      salary: '$130k - $160k',
      location: 'San Francisco, CA',
      workType: 'Full-time',
      experienceLevel: 'Senior',
      views: 189,
      daysLeft: 8
    },
    {
      id: 3,
      title: 'Data Scientist',
      department: 'Engineering',
      applications: 38,
      status: 'active',
      postedDate: '2024-01-08',
      aiResistanceScore: 76,
      topSkills: ['Critical Thinking', 'Statistical Analysis', 'Domain Expertise', 'Communication'],
      salary: '$110k - $140k',
      location: 'San Francisco, CA',
      workType: 'Full-time',
      experienceLevel: 'Mid-Senior',
      views: 156,
      daysLeft: 15
    },
    {
      id: 4,
      title: 'Frontend Developer',
      department: 'Engineering',
      applications: 89,
      status: 'active',
      postedDate: '2024-01-12',
      aiResistanceScore: 68,
      topSkills: ['Problem Solving', 'User Experience', 'Collaboration', 'JavaScript'],
      salary: '$90k - $120k',
      location: 'San Francisco, CA',
      workType: 'Full-time',
      experienceLevel: 'Mid',
      views: 312,
      daysLeft: 5
    },
    {
      id: 5,
      title: 'Human Resources Manager',
      department: 'HR',
      applications: 23,
      status: 'active',
      postedDate: '2024-01-18',
      aiResistanceScore: 92,
      topSkills: ['Emotional Intelligence', 'Conflict Resolution', 'Leadership', 'Communication'],
      salary: '$100k - $130k',
      location: 'San Francisco, CA',
      workType: 'Full-time',
      experienceLevel: 'Senior',
      views: 98,
      daysLeft: 18
    }
  ],
  topCandidates: [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Senior UX Designer',
      experience: '8 years',
      aiResistanceScore: 96,
      skillMatch: 94,
      status: 'interview_scheduled',
      avatar: 'SC',
      location: 'San Francisco, CA',
      lastActive: '2 hours ago',
      applicationDate: '2024-01-20',
      salary: '$130k',
      availability: 'Immediate'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Product Manager',
      experience: '6 years',
      aiResistanceScore: 91,
      skillMatch: 88,
      status: 'reviewing',
      avatar: 'MR',
      location: 'San Francisco, CA',
      lastActive: '1 day ago',
      applicationDate: '2024-01-19',
      salary: '$140k',
      availability: '2 weeks'
    },
    {
      id: 3,
      name: 'Jessica Kim',
      role: 'Data Scientist',
      experience: '5 years',
      aiResistanceScore: 82,
      skillMatch: 92,
      status: 'offer_sent',
      avatar: 'JK',
      location: 'San Francisco, CA',
      lastActive: '3 hours ago',
      applicationDate: '2024-01-15',
      salary: '$125k',
      availability: 'Immediate'
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Frontend Developer',
      experience: '4 years',
      aiResistanceScore: 74,
      skillMatch: 89,
      status: 'interview_scheduled',
      avatar: 'DT',
      location: 'San Francisco, CA',
      lastActive: '5 hours ago',
      applicationDate: '2024-01-18',
      salary: '$105k',
      availability: '1 week'
    },
    {
      id: 5,
      name: 'Lisa Rodriguez',
      role: 'Human Resources Manager',
      experience: '7 years',
      aiResistanceScore: 95,
      skillMatch: 91,
      status: 'reviewing',
      avatar: 'LR',
      location: 'San Francisco, CA',
      lastActive: '1 day ago',
      applicationDate: '2024-01-19',
      salary: '$115k',
      availability: 'Immediate'
    }
  ],
  aiResistanceInsights: {
    averageScore: 89,
    topRoles: [
      { role: 'UX Designer', score: 94, trend: 'up' },
      { role: 'HR Manager', score: 92, trend: 'up' },
      { role: 'Product Manager', score: 89, trend: 'stable' },
      { role: 'Sales Manager', score: 87, trend: 'up' }
    ],
    skillGaps: [
      { skill: 'Emotional Intelligence', gap: 8, priority: 'high' },
      { skill: 'Creative Problem Solving', gap: 6, priority: 'medium' },
      { skill: 'Interpersonal Communication', gap: 4, priority: 'low' }
    ],
    recommendations: [
      'Focus on roles requiring high emotional intelligence',
      'Emphasize creative problem-solving in job descriptions',
      'Consider adding mentorship programs for technical roles'
    ]
  },
  hiringMetrics: {
    monthlyTrends: [
      { month: 'Oct', applications: 180, hires: 8, aiScore: 85 },
      { month: 'Nov', applications: 220, hires: 10, aiScore: 87 },
      { month: 'Dec', applications: 195, hires: 9, aiScore: 88 },
      { month: 'Jan', applications: 280, hires: 12, aiScore: 89 }
    ],
    departmentPerformance: [
      { department: 'Design', avgHireTime: 14, retentionRate: 96, aiScore: 92 },
      { department: 'Engineering', avgHireTime: 18, retentionRate: 91, aiScore: 76 },
      { department: 'Product', avgHireTime: 16, retentionRate: 94, aiScore: 89 },
      { department: 'HR', avgHireTime: 12, retentionRate: 98, aiScore: 95 }
    ]
  },
  billing: {
    currentPlan: {
      name: 'Professional',
      price: 299,
      billingCycle: 'monthly',
      features: [
        'Up to 25 active job postings',
        'Unlimited candidate applications',
        'Advanced AI resistance analytics',
        'Priority support',
        'Custom branding',
        'Team collaboration tools',
        'Advanced reporting',
        'API access'
      ],
      nextBilling: '2024-02-15'
    },
    usage: {
      activeJobs: 15,
      totalApplications: 1247,
      candidateViews: 3450,
      aiResistanceReports: 67,
      teamMembers: 12,
      storageUsed: '3.2 GB',
      storageLimit: '10 GB',
      apiCalls: 1240,
      apiLimit: 5000
    },
    billingHistory: [
      {
        id: 1,
        date: '2024-01-15',
        amount: 299,
        status: 'paid',
        description: 'Professional Plan - January 2024'
      },
      {
        id: 2,
        date: '2023-12-15',
        amount: 299,
        status: 'paid',
        description: 'Professional Plan - December 2023'
      },
      {
        id: 3,
        date: '2023-11-15',
        amount: 299,
        status: 'paid',
        description: 'Professional Plan - November 2023'
      }
    ],
    paymentMethods: [
      {
        id: 1,
        type: 'card',
        last4: '4242',
        brand: 'Visa',
        expiry: '12/25',
        isDefault: true
      },
      {
        id: 2,
        type: 'card',
        last4: '5555',
        brand: 'Mastercard',
        expiry: '08/26',
        isDefault: false
      }
    ]
  },
  settings: {
    company: {
      name: 'TechCorp Solutions',
      industry: 'Technology & AI Solutions',
      size: '250-500 employees',
      location: 'San Francisco, CA',
      website: 'https://techcorp.com',
      description: 'Leading technology solutions provider focused on AI-resistant talent development and human-centered innovation.',
      founded: '2018',
      mission: 'To build technology that enhances human potential while preserving human skills and values.'
    },
    teamMembers: [
      {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@techcorp.com',
        role: 'HR Director',
        permissions: 'admin',
        status: 'active',
        lastActive: '2 hours ago',
        avatar: 'SJ',
        department: 'Human Resources'
      },
      {
        id: 2,
        name: 'Mike Chen',
        email: 'mike.chen@techcorp.com',
        role: 'Senior Recruiter',
        permissions: 'recruiter',
        status: 'active',
        lastActive: '1 day ago',
        avatar: 'MC',
        department: 'Human Resources'
      },
      {
        id: 3,
        name: 'Lisa Rodriguez',
        email: 'lisa.rodriguez@techcorp.com',
        role: 'Hiring Manager',
        permissions: 'hiring_manager',
        status: 'active',
        lastActive: '3 days ago',
        avatar: 'LR',
        department: 'Product'
      },
      {
        id: 4,
        name: 'David Kim',
        email: 'david.kim@techcorp.com',
        role: 'Engineering Manager',
        permissions: 'hiring_manager',
        status: 'active',
        lastActive: '5 hours ago',
        avatar: 'DK',
        department: 'Engineering'
      }
    ],
    notifications: {
      newApplications: true,
      interviewScheduled: true,
      candidateUpdates: true,
      billingAlerts: true,
      systemUpdates: false,
      marketingEmails: false,
      aiResistanceAlerts: true,
      skillGapNotifications: true
    },
    integrations: [
      {
        name: 'Slack',
        status: 'connected',
        lastSync: '2 hours ago',
        icon: '💬'
      },
      {
        name: 'Google Workspace',
        status: 'connected',
        lastSync: '1 day ago',
        icon: '📧'
      },
      {
        name: 'LinkedIn',
        status: 'disconnected',
        lastSync: null,
        icon: '💼'
      },
      {
        name: 'Zoom',
        status: 'connected',
        lastSync: '3 hours ago',
        icon: '📹'
      }
    ]
  }
}

export default function EmployerDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedJob, setSelectedJob] = useState(null)
  const [showJobModal, setShowJobModal] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      case 'interview_scheduled': return 'bg-blue-100 text-blue-800'
      case 'reviewing': return 'bg-purple-100 text-purple-800'
      case 'offer_sent': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'interview_scheduled': return <ClockIcon className="w-4 h-4" />
      case 'reviewing': return <EyeIcon className="w-4 h-4" />
      case 'offer_sent': return <CheckCircleIcon className="w-4 h-4" />
      default: return <ClockIcon className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Enhanced Dashboard Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                  {TECHCORP_DATA.company.logo}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{TECHCORP_DATA.company.name}</h1>
                  <p className="text-blue-100">{TECHCORP_DATA.company.industry} • {TECHCORP_DATA.company.size}</p>
                  <p className="text-blue-100 text-sm">{TECHCORP_DATA.company.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => router.push('/employer/post-job')}
                  className="flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-200 border border-white/30"
                >
                  <PlusIcon className="w-5 h-5" />
                  <span className="font-medium">Post New Job</span>
                </button>
                <button className="p-3 text-white/80 hover:text-white relative hover:bg-white/10 rounded-xl transition-all duration-200">
                  <BellIcon className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse"></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Navigation Tabs */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', name: 'Overview', icon: ChartBarIcon },
                { id: 'jobs', name: 'Job Postings', icon: BriefcaseIcon },
                { id: 'candidates', name: 'Candidates', icon: UserGroupIcon },
                { id: 'analytics', name: 'Analytics', icon: ChartPieIcon },
                { id: 'billing', name: 'Billing & Usage', icon: CreditCardIcon },
                { id: 'settings', name: 'Settings', icon: Cog6ToothIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-6 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
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
              {/* Enhanced Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                      <p className="text-3xl font-bold text-gray-900">{TECHCORP_DATA.stats.activeJobs}</p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <ArrowUpIcon className="w-4 h-4 mr-1" />
                        +3 this month
                      </p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <BriefcaseIcon className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Applications</p>
                      <p className="text-3xl font-bold text-gray-900">{TECHCORP_DATA.stats.totalApplications}</p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <ArrowUpIcon className="w-4 h-4 mr-1" />
                        +12% vs last month
                      </p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-xl">
                      <UserGroupIcon className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">AI Resistance Score</p>
                      <p className="text-3xl font-bold text-gray-900">{TECHCORP_DATA.stats.aiResistanceScore}%</p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <ShieldCheckIcon className="w-4 h-4 mr-1" />
                        Excellent
                      </p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <SparklesIcon className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Hires This Month</p>
                      <p className="text-3xl font-bold text-gray-900">{TECHCORP_DATA.stats.hiresThisMonth}</p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <TrophyIcon className="w-4 h-4 mr-1" />
                        On track
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-xl">
                      <StarIcon className="w-8 h-8 text-yellow-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced AI Resistance Insights */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">AI Resistance Insights</h3>
                      <p className="text-sm text-gray-600">Your hiring performance in AI-resistant roles</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ShieldCheckIcon className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium text-purple-600">{TECHCORP_DATA.aiResistanceInsights.averageScore}% Average</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-purple-600 mb-3">
                        {TECHCORP_DATA.aiResistanceInsights.averageScore}%
                      </div>
                      <p className="text-sm text-gray-600 mb-4">Average AI Resistance Score</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" 
                          style={{ width: `${TECHCORP_DATA.aiResistanceInsights.averageScore}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <ArrowTrendingUpIcon className="w-5 h-5 text-green-600 mr-2" />
                        Top AI-Resistant Roles
                      </h4>
                      <div className="space-y-3">
                        {TECHCORP_DATA.aiResistanceInsights.topRoles.map((role, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-gray-900">{role.role}</span>
                              {role.trend === 'up' && <ArrowUpIcon className="w-4 h-4 text-green-600 ml-2" />}
                              {role.trend === 'down' && <ArrowDownIcon className="w-4 h-4 text-red-600 ml-2" />}
                            </div>
                            <span className="text-sm font-bold text-green-600">{role.score}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <TagIcon className="w-5 h-5 text-orange-600 mr-2" />
                        Skill Gaps to Address
                      </h4>
                      <div className="space-y-3">
                        {TECHCORP_DATA.aiResistanceInsights.skillGaps.map((gap, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-gray-900">{gap.skill}</span>
                              {gap.priority === 'high' && <FireIcon className="w-4 h-4 text-red-600 ml-2" />}
                            </div>
                            <span className="text-sm font-bold text-red-600">-{gap.gap}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Recent Activity and Top Candidates */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Enhanced Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {TECHCORP_DATA.recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {activity.avatar}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(activity.priority)}`}>
                                {activity.priority}
                              </span>
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                {activity.aiScore}% AI-Resistant
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Enhanced Top Candidates */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
                    <h3 className="text-lg font-semibold text-gray-900">Top Candidates</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {TECHCORP_DATA.topCandidates.map((candidate) => (
                        <div key={candidate.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {candidate.avatar}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900">{candidate.name}</p>
                            <p className="text-xs text-gray-600">{candidate.role} • {candidate.experience}</p>
                            <p className="text-xs text-gray-500">{candidate.location} • {candidate.availability}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                {candidate.aiResistanceScore}% AI-Resistant
                              </span>
                              {getStatusIcon(candidate.status)}
                            </div>
                            <p className="text-xs text-gray-500">{candidate.skillMatch}% Skill Match</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'jobs' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Active Job Postings</h2>
                  <p className="text-gray-600">Manage your job postings and track performance</p>
                </div>
                <button 
                  onClick={() => router.push('/employer/post-job')}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm"
                >
                  <PlusIcon className="w-5 h-5" />
                  <span className="font-medium">Post New Job</span>
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <h3 className="text-lg font-semibold text-gray-900">Job Postings</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {TECHCORP_DATA.activeJobs.map((job) => (
                    <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold text-gray-900">{job.title}</h4>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(job.status)}`}>
                              {job.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center space-x-1">
                              <BuildingOfficeIcon className="w-4 h-4" />
                              <span>{job.department}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPinIcon className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <CurrencyDollarIcon className="w-4 h-4" />
                              <span>{job.salary}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <ClockIcon className="w-4 h-4" />
                              <span>{job.workType}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 mb-3">
                            <span className="text-sm text-gray-600">{job.applications} applications</span>
                            <span className="text-sm text-gray-600">{job.views} views</span>
                            <span className="text-sm text-gray-600">{job.daysLeft} days left</span>
                            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {job.aiResistanceScore}% AI-Resistant
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {job.topSkills.map((skill, index) => (
                              <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-6">
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'candidates' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Candidate Pipeline</h2>
                  <p className="text-gray-600">Manage and track your candidate applications</p>
                </div>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Export
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Filter
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
                  <h3 className="text-lg font-semibold text-gray-900">All Candidates</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {TECHCORP_DATA.topCandidates.map((candidate) => (
                    <div key={candidate.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {candidate.avatar}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{candidate.name}</h4>
                            <p className="text-sm text-gray-600">{candidate.role} • {candidate.experience}</p>
                            <p className="text-xs text-gray-500">{candidate.location} • Applied {candidate.applicationDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm font-semibold text-green-600">{candidate.aiResistanceScore}% AI-Resistant</div>
                            <div className="text-sm text-gray-600">{candidate.skillMatch}% Skill Match</div>
                            <div className="text-xs text-gray-500">Salary: {candidate.salary}</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(candidate.status)}`}>
                              {candidate.status.replace('_', ' ')}
                            </span>
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <EyeIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Hiring Analytics</h2>
                <p className="text-gray-600">Comprehensive insights into your hiring performance</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Time to Hire</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {TECHCORP_DATA.stats.averageTimeToHire} days
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Average time from application to hire</p>
                  <div className="flex items-center space-x-2">
                    <ArrowDownIcon className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600">-2 days vs last month</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Candidate Satisfaction</h3>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="text-4xl font-bold text-yellow-600">
                      {TECHCORP_DATA.stats.candidateSatisfaction}
                    </div>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon 
                          key={star} 
                          className={`w-6 h-6 ${
                            star <= Math.floor(TECHCORP_DATA.stats.candidateSatisfaction) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Average candidate rating</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Resistance Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">{TECHCORP_DATA.stats.aiResistanceScore}%</div>
                    <p className="text-sm text-gray-600">Average AI Resistance Score</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" 
                        style={{ width: `${TECHCORP_DATA.stats.aiResistanceScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{TECHCORP_DATA.stats.retentionRate}%</div>
                    <p className="text-sm text-gray-600">Retention Rate</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" 
                        style={{ width: `${TECHCORP_DATA.stats.retentionRate}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">4.8/5</div>
                    <p className="text-sm text-gray-600">Manager Satisfaction</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" 
                        style={{ width: '96%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Department Performance</h3>
                <div className="space-y-4">
                  {TECHCORP_DATA.hiringMetrics.departmentPerformance.map((dept, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-medium">
                          {dept.department.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{dept.department}</p>
                          <p className="text-sm text-gray-600">{dept.avgHireTime} days avg hire time</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-green-600">{dept.retentionRate}% Retention</div>
                        <div className="text-sm text-blue-600">{dept.aiScore}% AI-Resistant</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Billing & Usage</h2>
                <p className="text-gray-600">Manage your subscription and track usage</p>
              </div>
              
              {/* Current Plan */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900">{TECHCORP_DATA.billing.currentPlan.name} Plan</h4>
                      <p className="text-gray-600">${TECHCORP_DATA.billing.currentPlan.price}/{TECHCORP_DATA.billing.currentPlan.billingCycle}</p>
                      <p className="text-sm text-gray-500">Next billing: {TECHCORP_DATA.billing.currentPlan.nextBilling}</p>
                    </div>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm">
                      Upgrade Plan
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {TECHCORP_DATA.billing.currentPlan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Usage Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h4 className="text-sm font-medium text-gray-600 mb-3">Active Jobs</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-gray-900">{TECHCORP_DATA.billing.usage.activeJobs}/25</span>
                    <span className="text-sm text-green-600">60% used</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" 
                      style={{ width: `${(TECHCORP_DATA.billing.usage.activeJobs / 25) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h4 className="text-sm font-medium text-gray-600 mb-3">Storage Used</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-gray-900">{TECHCORP_DATA.billing.usage.storageUsed}</span>
                    <span className="text-sm text-gray-600">of {TECHCORP_DATA.billing.usage.storageLimit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" 
                      style={{ width: '32%' }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h4 className="text-sm font-medium text-gray-600 mb-3">Team Members</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-gray-900">{TECHCORP_DATA.billing.usage.teamMembers}/15</span>
                    <span className="text-sm text-green-600">80% used</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" 
                      style={{ width: `${(TECHCORP_DATA.billing.usage.teamMembers / 15) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Billing History */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
                  <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {TECHCORP_DATA.billing.billingHistory.map((invoice) => (
                    <div key={invoice.id} className="px-6 py-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{invoice.description}</p>
                        <p className="text-sm text-gray-600">{invoice.date}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-semibold text-gray-900">${invoice.amount}</span>
                        <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          {invoice.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Add Payment Method
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {TECHCORP_DATA.billing.paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <CreditCardIcon className="w-6 h-6 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {method.brand} •••• {method.last4}
                            </p>
                            <p className="text-sm text-gray-600">Expires {method.expiry}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {method.isDefault && (
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              Default
                            </span>
                          )}
                          <button className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors">
                            <PencilIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                <p className="text-gray-600">Manage your account and preferences</p>
              </div>
              
              {/* Company Profile */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <h3 className="text-lg font-semibold text-gray-900">Company Profile</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                      <input 
                        type="text" 
                        defaultValue={TECHCORP_DATA.settings.company.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                      <input 
                        type="text" 
                        defaultValue={TECHCORP_DATA.settings.company.industry}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="500+">500+ employees</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input 
                        type="text" 
                        defaultValue={TECHCORP_DATA.settings.company.location}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                      <input 
                        type="url" 
                        defaultValue={TECHCORP_DATA.settings.company.website}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea 
                        rows={3}
                        defaultValue={TECHCORP_DATA.settings.company.description}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>

              {/* Team Management */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Team Management</h3>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <UserPlusIcon className="w-4 h-4" />
                      <span>Invite Team Member</span>
                    </button>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {TECHCORP_DATA.settings.teamMembers.map((member) => (
                    <div key={member.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {member.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-600">{member.email}</p>
                            <p className="text-xs text-gray-500">{member.role} • Last active {member.lastActive}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            member.permissions === 'admin' 
                              ? 'bg-red-100 text-red-800' 
                              : member.permissions === 'recruiter'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {member.permissions.replace('_', ' ')}
                          </span>
                          <button className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors">
                            <PencilIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
                  <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {Object.entries(TECHCORP_DATA.settings.notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </p>
                          <p className="text-sm text-gray-600">
                            {key === 'newApplications' && 'Get notified when new candidates apply'}
                            {key === 'interviewScheduled' && 'Receive alerts for scheduled interviews'}
                            {key === 'candidateUpdates' && 'Updates on candidate status changes'}
                            {key === 'billingAlerts' && 'Important billing and payment notifications'}
                            {key === 'systemUpdates' && 'Platform updates and maintenance alerts'}
                            {key === 'marketingEmails' && 'Product updates and promotional content'}
                            {key === 'aiResistanceAlerts' && 'AI resistance score updates and insights'}
                            {key === 'skillGapNotifications' && 'Skill gap analysis and recommendations'}
                          </p>
                        </div>
                        <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          value ? 'bg-blue-600' : 'bg-gray-200'
                        }`}>
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Integrations */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-yellow-50 to-orange-50">
                  <h3 className="text-lg font-semibold text-gray-900">Integrations</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {TECHCORP_DATA.settings.integrations.map((integration) => (
                      <div key={integration.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                            {integration.icon}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{integration.name}</p>
                            <p className="text-sm text-gray-600">
                              {integration.status === 'connected' 
                                ? `Last synced ${integration.lastSync}` 
                                : 'Not connected'
                              }
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            integration.status === 'connected' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {integration.status}
                          </span>
                          <button className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                            integration.status === 'connected'
                              ? 'text-red-600 hover:bg-red-50'
                              : 'text-blue-600 hover:bg-blue-50'
                          }`}>
                            {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-red-50 to-pink-50">
                  <h3 className="text-lg font-semibold text-gray-900">Security</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Enable 2FA
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Change Password</p>
                        <p className="text-sm text-gray-600">Update your account password</p>
                      </div>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Change
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">API Keys</p>
                        <p className="text-sm text-gray-600">Manage your API access keys</p>
                      </div>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Manage
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
} 