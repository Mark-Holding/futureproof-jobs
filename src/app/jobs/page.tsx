import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SearchBar from '@/components/jobs/SearchBar'
import FilterPanel from '@/components/jobs/FilterPanel'
import JobList from '@/components/jobs/JobList'
import PageHeader from '@/components/jobs/PageHeader'

export default function JobsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <PageHeader />
      
      <div className="container mx-auto px-4">
        <SearchBar />
        
        <div className="flex flex-col md:flex-row gap-8 py-8">
          <FilterPanel />
          <JobList />
        </div>
      </div>
      
      <Footer />
    </main>
  )
} 