'use client'

import { useState } from 'react'

interface PaginationProps {
  totalPages: number
  currentPage?: number
  onPageChange?: (page: number) => void
}

export default function Pagination({ 
  totalPages, 
  currentPage = 1, 
  onPageChange = () => {} 
}: PaginationProps) {
  const [activePage, setActivePage] = useState(currentPage)

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === activePage) return
    setActivePage(page)
    onPageChange(page)
  }

  const renderPageNumbers = () => {
    const pages = []
    
    // Always show first page
    pages.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors ${
          activePage === 1 
            ? 'bg-blue-500 text-white' 
            : 'bg-white border border-gray-200 hover:bg-gray-100'
        }`}
      >
        1
      </button>
    )
    
    // Add ellipsis if needed
    if (activePage > 3) {
      pages.push(
        <span key="ellipsis-1" className="px-2">
          ...
        </span>
      )
    }
    
    // Add pages around current page
    for (let i = Math.max(2, activePage - 1); i <= Math.min(totalPages - 1, activePage + 1); i++) {
      if (i === 1 || i === totalPages) continue // Skip first and last page as they're always shown
      
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors ${
            activePage === i 
              ? 'bg-blue-500 text-white' 
              : 'bg-white border border-gray-200 hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      )
    }
    
    // Add ellipsis if needed
    if (activePage < totalPages - 2) {
      pages.push(
        <span key="ellipsis-2" className="px-2">
          ...
        </span>
      )
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors ${
            activePage === totalPages 
              ? 'bg-blue-500 text-white' 
              : 'bg-white border border-gray-200 hover:bg-gray-100'
          }`}
        >
          {totalPages}
        </button>
      )
    }
    
    return pages
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => handlePageChange(activePage - 1)}
        disabled={activePage === 1}
        className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors ${
          activePage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white border border-gray-200 hover:bg-gray-100'
        }`}
      >
        &lt;
      </button>
      
      {renderPageNumbers()}
      
      <button
        onClick={() => handlePageChange(activePage + 1)}
        disabled={activePage === totalPages}
        className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors ${
          activePage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white border border-gray-200 hover:bg-gray-100'
        }`}
      >
        &gt;
      </button>
    </div>
  )
} 