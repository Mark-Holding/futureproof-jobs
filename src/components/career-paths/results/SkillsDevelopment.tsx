import { CareerPathResult } from '@/lib/data/dummyCareerPathResults';

interface SkillsDevelopmentProps {
  currentSkills: CareerPathResult['skillsDevelopment']['currentSkills'];
  requiredSkills: CareerPathResult['skillsDevelopment']['requiredSkills'];
  recommendedCourses: CareerPathResult['skillsDevelopment']['recommendedCourses'];
}

export default function SkillsDevelopment({ 
  currentSkills, 
  requiredSkills, 
  recommendedCourses 
}: SkillsDevelopmentProps) {
  
  // Group skills by category
  const skillsByCategory = currentSkills.reduce<Record<string, typeof currentSkills>>((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});
  
  return (
    <div className="skills-development mb-12">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Skills Development</h2>
      
      {/* Current Skills */}
      <div className="current-skills mb-8">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">Your Current Skill Profile</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <div key={category} className="skill-category">
              <h4 className="text-lg font-medium text-blue-700 mb-3">{category} Skills</h4>
              <div className="space-y-4">
                {skills.map((skill, idx) => (
                  <div key={idx} className="skill-item">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">{skill.name}</span>
                      <span className="text-blue-600 font-medium">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-green-400 h-2.5 rounded-full" 
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Required Skills */}
      <div className="required-skills mb-8">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">Skills Gap Analysis</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {requiredSkills.map((skill, idx) => (
            <div key={idx} className="skill-gap-item bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-medium text-blue-800">{skill.name}</h4>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                  {skill.timeframe}
                </span>
              </div>
              
              <div className="text-sm text-gray-500 mb-3">Category: {skill.category}</div>
              
              {/* Current Level */}
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Current Level</span>
                  <span className="text-blue-700">{skill.currentLevel}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-400 h-2 rounded-full" 
                    style={{ width: `${skill.currentLevel}%` }}
                  />
                </div>
              </div>
              
              {/* Target Level */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Target Level</span>
                  <span className="text-green-700">{skill.targetLevel}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-400 h-2 rounded-full" 
                    style={{ width: `${skill.targetLevel}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recommended Courses */}
      <div className="recommended-courses">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">Recommended Learning Resources</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendedCourses.map((course, idx) => (
            <div key={idx} className="course-item flex p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="course-icon w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-500 mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              
              <div className="course-details flex-1">
                <h4 className="text-lg font-semibold text-blue-800 mb-1">{course.title}</h4>
                <div className="text-sm text-gray-500 mb-2">{course.provider}</div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
                    {course.level}
                  </span>
                  <span className="bg-green-50 text-green-700 px-2 py-1 rounded">
                    {course.duration}
                  </span>
                </div>
              </div>
              
              <div className="course-action flex items-center">
                <a 
                  href={course.url} 
                  className="text-blue-600 hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 