import React from 'react'

interface AuthStatProps {
  value: string
  label: string
  percentage: number
}

export default function AuthStat({ value, label, percentage }: AuthStatProps) {
  return (
    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg mb-4 w-full max-w-xs">
      <div className="text-3xl font-bold text-green-400 mb-1">{value}</div>
      <div className="text-sm mb-2">{label}</div>
      <div className="bg-white/15 rounded-full h-2.5 w-full overflow-hidden">
        <div 
          className="bg-green-400 h-full rounded-full" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
} 