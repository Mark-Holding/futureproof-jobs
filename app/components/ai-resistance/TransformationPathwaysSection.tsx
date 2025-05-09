const transformationPaths = [
  {
    oldRole: {
      title: 'Data Entry Specialist',
      risk: '65% Automation Risk'
    },
    newRole: {
      title: 'Data Ethics Advisor',
      futureproof: '93% FutureProof'
    }
  },
  {
    oldRole: {
      title: 'Customer Service Rep',
      risk: '72% Automation Risk'
    },
    newRole: {
      title: 'Complex Needs Advocate',
      futureproof: '91% FutureProof'
    }
  },
  {
    oldRole: {
      title: 'Bookkeeper',
      risk: '80% Automation Risk'
    },
    newRole: {
      title: 'Financial Wellness Coach',
      futureproof: '89% FutureProof'
    }
  },
  {
    oldRole: {
      title: 'Administrative Assistant',
      risk: '68% Automation Risk'
    },
    newRole: {
      title: 'Workplace Culture Strategist',
      futureproof: '90% FutureProof'
    }
  }
];

export default function TransformationPathwaysSection() {
  return (
    <div className="flex-1 bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-blue-900">Job Transformation Pathways</h3>
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>From at-risk to future-proof</span>
          <span>May 2025</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {transformationPaths.map((path, index) => (
            <div 
              key={index} 
              className="p-3 bg-gray-50 rounded-lg grid grid-cols-[1fr,auto,1fr] items-center gap-4"
            >
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <div className="text-red-700 font-medium text-sm">{path.oldRole.title}</div>
                <div className="text-xs text-gray-500">{path.oldRole.risk}</div>
              </div>
              
              <div className="flex justify-center text-gray-500 text-xl">→</div>
              
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md">
                <div className="text-emerald-700 font-medium text-sm">{path.newRole.title}</div>
                <div className="text-xs text-gray-500">{path.newRole.futureproof}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 