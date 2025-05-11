'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const industryData = [
  { name: 'Healthcare & Therapy', value: 97, category: 'very-high' },
  { name: 'Education', value: 95, category: 'very-high' },
  { name: 'Social Services', value: 93, category: 'very-high' },
  { name: 'Skilled Trades', value: 88, category: 'high' },
  { name: 'Creative Arts', value: 85, category: 'high' },
  { name: 'Management', value: 78, category: 'medium' },
  { name: 'Legal', value: 74, category: 'medium' },
  { name: 'Data Processing', value: 62, category: 'low' }
];

const getBarColor = (category: string) => {
  switch (category) {
    case 'very-high': return '#10b981'; // emerald-500
    case 'high': return '#3b82f6'; // blue-500
    case 'medium': return '#f59e0b'; // amber-500
    case 'low': return '#ef4444'; // red-500
    default: return '#3b82f6';
  }
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 shadow-lg rounded-md border">
        <p className="font-medium">{data.name}</p>
        <p className="text-sm">
          <span className="font-medium">Resistance Score:</span> {data.value}%
        </p>
      </div>
    );
  }
  return null;
};

export default function IndustryComparisonChart() {
  return (
    <div className="flex-1 bg-white rounded-lg p-6 shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-blue-900">Industry Resistance Comparison</h3>
        <div className="flex gap-4">
          <div className="flex items-center text-xs text-gray-600">
            <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
            Very High
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            High
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
            Medium
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            Low
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={industryData}
            margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
            barGap={8}
          >
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={70}
            />
            <YAxis 
              domain={[0, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              radius={[4, 4, 0, 0]}
              barSize={30}
              fillOpacity={0.9}
              animationDuration={1000}
              isAnimationActive={true}
              name="Resistance Score"
              fill="#3b82f6"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 