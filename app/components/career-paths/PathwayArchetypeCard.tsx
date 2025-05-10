interface CharacteristicProps {
  text: string;
}

const Characteristic = ({ text }: CharacteristicProps) => (
  <div className="flex items-start mb-2">
    <div className="rounded-full bg-blue-100 p-1 mr-2 mt-0.5">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </div>
    <span className="text-gray-700 text-sm">{text}</span>
  </div>
);

interface PathwayArchetypeCardProps {
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  characteristics: string[];
}

export default function PathwayArchetypeCard({ 
  title, 
  subtitle, 
  icon, 
  description, 
  characteristics 
}: PathwayArchetypeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-5 text-white relative">
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-blue-100 text-sm">{subtitle}</p>
        <div className="absolute right-5 top-5 text-3xl">{icon}</div>
      </div>
      
      <div className="p-5">
        <p className="text-gray-700 mb-5 text-sm leading-relaxed">
          {description}
        </p>
        
        <div className="mt-4">
          <h4 className="text-blue-800 font-medium mb-3 text-sm">Key Characteristics</h4>
          <div>
            {characteristics.map((text, index) => (
              <Characteristic key={index} text={text} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 