export default function DashboardPreviewSection() {
  const pipelineStages = [
    { count: 24, label: 'New' },
    { count: 18, label: 'Screening' },
    { count: 9, label: 'Interview' },
    { count: 4, label: 'Offer' },
    { count: 2, label: 'Hired' }
  ]

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Employer Dashboard Preview
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A glimpse of the powerful tools available to help you find and hire human-skilled talent
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl mx-auto">
          <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center">
            <div className="font-semibold">FutureProof Employer Dashboard</div>
            <div>Company: Acme Innovations</div>
          </div>
          
          <div className="bg-gray-100 p-2 flex">
            <div className="px-4 py-2 rounded-md bg-white font-medium">Overview</div>
            <div className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition-colors cursor-pointer">Active Jobs</div>
            <div className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition-colors cursor-pointer">Candidates</div>
            <div className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition-colors cursor-pointer">Analytics</div>
            <div className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition-colors cursor-pointer">Resources</div>
          </div>
          
          <div className="p-6 flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Human Skills Distribution</h3>
              <div className="h-48 bg-blue-50 rounded-lg relative flex items-end justify-around">
                {[80, 65, 90, 50, 75].map((height, index) => (
                  <div 
                    key={index} 
                    className="bg-blue-500 w-8 rounded-t-md"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Hiring Pipeline</h3>
              <div className="flex flex-wrap gap-2">
                {pipelineStages.map((stage, index) => (
                  <div key={index} className="flex-1 min-w-[80px] bg-white p-3 rounded-md text-center shadow-sm">
                    <div className="text-xl font-semibold text-blue-500">{stage.count}</div>
                    <div className="text-gray-600 text-sm">{stage.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 