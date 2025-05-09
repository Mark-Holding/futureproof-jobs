export default function ResistanceScaleSection() {
  const scaleItems = [
    {
      className: "bg-emerald-50 border border-emerald-200",
      percentage: "90-100%",
      label: "Very High Resistance",
      color: "text-emerald-600",
      description: "Jobs requiring complex human skills that AI cannot replicate effectively",
      examples: "E.g., Therapists, Creative Directors, Social Workers"
    },
    {
      className: "bg-indigo-50 border border-indigo-200",
      percentage: "80-89%",
      label: "High Resistance",
      color: "text-indigo-700",
      description: "Roles with significant human elements but some automatable components",
      examples: "E.g., Specialized Teachers, Nurses, Skilled Trades"
    },
    {
      className: "bg-amber-50 border border-amber-200",
      percentage: "70-79%",
      label: "Medium Resistance",
      color: "text-amber-600",
      description: "Positions requiring human input but with increasing AI integration",
      examples: "E.g., Managers, Technical Specialists, Analysts"
    },
    {
      className: "bg-red-50 border border-red-200",
      percentage: "Below 70%",
      label: "Low Resistance",
      color: "text-red-600",
      description: "Jobs with highly predictable, rule-based tasks vulnerable to automation",
      examples: "E.g., Data Entry, Basic Accounting, Simple Customer Service"
    }
  ];

  return (
    <div className="flex flex-wrap justify-between gap-4">
      {scaleItems.map((item, index) => (
        <div 
          key={index} 
          className={`${item.className} rounded-lg p-6 text-center w-full sm:w-[48%] lg:w-[23%]`}
        >
          <div className={`text-3xl font-bold mb-2 ${item.color}`}>{item.percentage}</div>
          <div className="font-semibold mb-2">{item.label}</div>
          <div className="text-sm text-gray-600 mb-2 leading-snug">{item.description}</div>
          <div className="text-xs text-gray-500">{item.examples}</div>
        </div>
      ))}
    </div>
  );
} 