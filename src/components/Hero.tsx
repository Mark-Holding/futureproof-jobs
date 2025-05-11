'use client'

import { useState } from 'react'

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search functionality here
    console.log('Searching for:', searchQuery)
  }

  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-500 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Find A Career That Can't Be Automated
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Discover job opportunities with high human value that AI cannot replace
        </p>
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
          <div className="flex bg-white rounded-full p-2 shadow-lg">
            <input
              type="text"
              placeholder="Search for AI-resistant jobs..."
              className="flex-1 px-6 py-4 rounded-l-full text-gray-900 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="px-8 py-4 bg-green-400 text-white font-semibold rounded-full hover:bg-green-500 transition-colors"
            >
              Find Jobs
            </button>
          </div>
        </form>
      </div>
    </section>
  )
} 