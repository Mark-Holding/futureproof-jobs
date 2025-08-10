import { FC } from 'react'

interface JobModalProps {
  isOpen: boolean
  onClose: () => void
  job: {
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
  } | null
}

const JobModal: FC<JobModalProps> = ({ isOpen, onClose, job }) => {
  if (!isOpen || !job) return null

  const getFutureproofScoreClass = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-700'
    if (score >= 70) return 'bg-amber-100 text-amber-700'
    return 'bg-red-100 text-red-700'
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-200">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-lg text-lg font-bold text-blue-500">
              {job.logoText}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h2>
              <p className="text-lg text-gray-600 mb-1">{job.company}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>📍 {job.location}</span>
                <span>💰 {job.salary}</span>
                <span>⏱️ {job.postedDate}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* FutureProof Score and Skill Match */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${getFutureproofScoreClass(job.futureproofScore)}`}>
              {job.futureproofScore}% FutureProof
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Skill Match:</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${job.skillMatch}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-blue-600">{job.skillMatch}%</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills & Requirements</h3>
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag, index) => (
                <div 
                  key={index} 
                  className={`px-3 py-1 text-sm rounded-full ${
                    tag.isHumanSkill 
                      ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                      : 'bg-gray-100 text-gray-600 border border-gray-200'
                  }`}
                >
                  {tag.name}
                  {tag.isHumanSkill && (
                    <span className="ml-1 text-xs">🤖</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Full Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {job.description}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Close
          </button>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors"
            onClick={() => {
              // TODO: Implement apply functionality
              console.log('Apply for job:', job.title)
            }}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default JobModal 