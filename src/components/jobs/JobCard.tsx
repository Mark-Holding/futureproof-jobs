import { FC, useState } from 'react'
import Link from 'next/link'
import JobModal from './JobModal'

interface JobCardProps {
  id: number
  title: string
  company: string
  futureproofScore: number
  location: string
  salary: string
  postedDate: string
  description: string
  tags: Array<{
    name: string
    isHumanSkill?: boolean
  }>
  skillMatch: number
  logoText: string
  onOpenModal: () => void
}

const JobCard: FC<JobCardProps> = ({
  id,
  title,
  company,
  futureproofScore,
  location,
  salary,
  postedDate,
  description,
  tags,
  skillMatch,
  logoText,
  onOpenModal
}) => {

  const getFutureproofScoreClass = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-700'
    if (score >= 70) return 'bg-amber-100 text-amber-700'
    return 'bg-red-100 text-red-700'
  }

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onOpenModal()
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm flex border-l-4 border-transparent hover:border-l-green-400 hover:-translate-y-1 transition-all duration-300 hover:shadow-md cursor-pointer">
      <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-lg mr-6 text-xl font-bold text-blue-500">
        {logoText}
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
              <button 
                onClick={handleOpenModal}
                className="text-xl font-semibold text-blue-900 mb-1 hover:text-blue-700 hover:underline transition-all duration-200 text-left"
              >
                {title}
              </button>
            <div className="text-gray-600 mb-3">{company}</div>
          </div>
          <div className={`px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${getFutureproofScoreClass(futureproofScore)}`}>
            {futureproofScore}% FutureProof
          </div>
        </div>
        
        <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <span className="mr-2">📍</span> {location}
          </div>
          <div className="flex items-center">
            <span className="mr-2">💰</span> {salary}
          </div>
          <div className="flex items-center">
            <span className="mr-2">⏱️</span> {postedDate}
          </div>
        </div>
        
        <div className="text-gray-600 mb-4">
          <p className="line-clamp-2">{description}</p>
          <button 
            className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium mt-1 transition-all duration-200"
            onClick={handleOpenModal}
          >
            more...
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <div 
              key={index} 
              className={`px-3 py-1 text-xs rounded-full ${
                tag.isHumanSkill 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tag.name}
            </div>
          ))}
        </div>
        
        <div className="flex items-center">
          <div className="text-sm text-gray-600 mr-3">Skill Match</div>
          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full" 
              style={{ width: `${skillMatch}%` }}
            ></div>
          </div>
          <div className="flex items-center">
          <div className="text-sm font-semibold text-blue-600 ml-3">{skillMatch}%</div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default JobCard 