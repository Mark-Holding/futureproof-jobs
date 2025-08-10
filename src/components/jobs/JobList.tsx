'use client'

import { useState } from 'react'
import JobCard from './JobCard'
import Pagination from './Pagination'
import JobModal from './JobModal'

// Sample job data - in a real app, this would come from an API
const JOBS_DATA = [
  {
    id: 1,
    title: 'Mental Health Counselor',
    company: 'Wellness Partners Alliance',
    futureproofScore: 97,
    location: 'Remote',
    salary: '$75,000 - $95,000',
    postedDate: 'Posted 2 days ago',
    description: 'Provide therapeutic support and counseling services to individuals facing mental health challenges. Develop and implement treatment plans, facilitate group therapy sessions, and collaborate with healthcare professionals to ensure comprehensive client care.',
    tags: [
      { name: 'Empathy', isHumanSkill: true },
      { name: 'Emotional Intelligence', isHumanSkill: true },
      { name: 'Ethical Judgment', isHumanSkill: true },
      { name: 'Healthcare' },
      { name: 'Mental Health' }
    ],
    skillMatch: 85,
    logoText: 'MC'
  },
  {
    id: 2,
    title: 'Occupational Therapist',
    company: 'LifeSpan Rehabilitation Center',
    futureproofScore: 95,
    location: 'Hybrid (Boston, MA)',
    salary: '$85,000 - $110,000',
    postedDate: 'Posted 1 week ago',
    description: 'Help patients develop, recover, and improve the skills needed for daily living and working. Create customized intervention programs to improve patients\' ability to perform daily activities, evaluate home and work environments, and recommend adaptive equipment.',
    tags: [
      { name: 'Physical Dexterity', isHumanSkill: true },
      { name: 'Empathy', isHumanSkill: true },
      { name: 'Complex Decision-Making', isHumanSkill: true },
      { name: 'Healthcare' },
      { name: 'Rehabilitation' }
    ],
    skillMatch: 92,
    logoText: 'OT'
  },
  {
    id: 3,
    title: 'Creative Director',
    company: 'Artisan Brand Studio',
    futureproofScore: 92,
    location: 'Hybrid (New York, NY)',
    salary: '$120,000 - $145,000',
    postedDate: 'Posted 3 days ago',
    description: 'Lead our creative team in developing original campaign concepts and brand strategies. Collaborate with clients to understand their vision, oversee multiple projects from concept to completion, and mentor junior designers to deliver exceptional creative work.',
    tags: [
      { name: 'Creativity', isHumanSkill: true },
      { name: 'Social Influence', isHumanSkill: true },
      { name: 'Emotional Intelligence', isHumanSkill: true },
      { name: 'Design' },
      { name: 'Leadership' }
    ],
    skillMatch: 78,
    logoText: 'CD'
  },
  {
    id: 4,
    title: 'Special Education Teacher',
    company: 'Inclusive Learning Academy',
    futureproofScore: 88,
    location: 'On-site (Chicago, IL)',
    salary: '$65,000 - $85,000',
    postedDate: 'Posted 5 days ago',
    description: 'Develop and implement individualized education programs for students with diverse learning needs. Adapt teaching methods and materials to meet students\' varying interests, abilities, and learning styles while fostering an inclusive classroom environment.',
    tags: [
      { name: 'Empathy', isHumanSkill: true },
      { name: 'Complex Decision-Making', isHumanSkill: true },
      { name: 'Creativity', isHumanSkill: true },
      { name: 'Education' },
      { name: 'Special Needs' }
    ],
    skillMatch: 80,
    logoText: 'SE'
  }
]

export default function JobList() {
  const [sortOption, setSortOption] = useState('futureproof')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const jobsCount = 143 // Total jobs count
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value)
  }
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // In a real app, this would trigger a new API call to fetch the jobs for the selected page
  }

  const handleOpenModal = (job: any) => {
    setSelectedJob(job)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedJob(null)
  }

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-medium text-gray-800">
          Showing <span className="text-blue-600">143</span> AI-resistant jobs
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="sort-by" className="text-sm text-gray-600">Sort by:</label>
          <select 
            id="sort-by" 
            className="p-2 border border-gray-200 rounded-md bg-white text-sm"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="futureproof">FutureProof Score</option>
            <option value="date">Post Date</option>
            <option value="salary">Salary</option>
            <option value="match">Skill Match</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        {JOBS_DATA.map(job => (
          <JobCard 
            key={job.id} 
            {...job} 
            onOpenModal={() => handleOpenModal(job)}
          />
        ))}
      </div>
      
      <Pagination 
        totalPages={Math.ceil(jobsCount / 10)} 
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <JobModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        job={selectedJob}
      />
    </div>
  )
} 