'use client';

import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';

// Define the geo data URL
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const riskLevels = {
  'Very High': { color: '#ef4444', threshold: 50 },
  'High': { color: '#f97316', threshold: 35 },
  'Medium': { color: '#eab308', threshold: 20 },
  'Low': { color: '#22c55e', threshold: 10 },
  'Very Low': { color: '#15803d', threshold: 0 }
};

const regionData = {
  'North America': {
    riskLevel: 'High',
    industries: ['Manufacturing', 'Retail', 'Transportation'],
    impact: '38% of jobs at risk by 2035'
  },
  'South America': {
    riskLevel: 'Medium',
    industries: ['Agriculture', 'Manufacturing', 'Services'],
    impact: '42% of jobs at risk by 2035'
  },
  'Europe': {
    riskLevel: 'Medium',
    industries: ['Manufacturing', 'Finance', 'Healthcare'],
    impact: '35% of jobs at risk by 2035'
  },
  'Africa': {
    riskLevel: 'Low',
    industries: ['Agriculture', 'Mining', 'Services'],
    impact: '28% of jobs at risk by 2035'
  },
  'Asia': {
    riskLevel: 'High',
    industries: ['Manufacturing', 'Technology', 'Services'],
    impact: '45% of jobs at risk by 2035'
  },
  'Oceania': {
    riskLevel: 'Medium',
    industries: ['Mining', 'Agriculture', 'Services'],
    impact: '32% of jobs at risk by 2035'
  }
};

// Helper function to match country names to regions
const getRegionForCountry = (countryName: string): string | null => {
  const northAmerica = ['United States of America', 'Canada', 'Mexico', 'Guatemala', 'Cuba', 'Haiti', 'Dominican Republic', 'Honduras', 'Nicaragua', 'El Salvador', 'Costa Rica', 'Panama'];
  const southAmerica = ['Brazil', 'Colombia', 'Argentina', 'Peru', 'Venezuela', 'Chile', 'Ecuador', 'Bolivia', 'Paraguay', 'Uruguay', 'Guyana', 'Suriname'];
  const europe = ['Russia', 'Germany', 'United Kingdom', 'France', 'Italy', 'Spain', 'Ukraine', 'Poland', 'Romania', 'Netherlands', 'Belgium', 'Sweden', 'Greece', 'Portugal', 'Czech Republic', 'Hungary', 'Belarus', 'Austria', 'Switzerland', 'Denmark', 'Finland', 'Norway', 'Ireland', 'Croatia', 'Moldova', 'Bosnia and Herzegovina', 'Albania', 'Lithuania', 'Slovenia', 'Latvia', 'Estonia', 'Luxembourg', 'Montenegro', 'Iceland'];
  const africa = ['Nigeria', 'Ethiopia', 'Egypt', 'Democratic Republic of the Congo', 'South Africa', 'Tanzania', 'Kenya', 'Algeria', 'Sudan', 'Morocco', 'Uganda', 'Ghana', 'Mozambique', 'Madagascar', 'Cameroon', 'Ivory Coast', 'Angola', 'Niger', 'Burkina Faso', 'Mali', 'Malawi', 'Zambia', 'Senegal', 'Chad', 'Somalia', 'Zimbabwe', 'Guinea', 'Rwanda', 'Benin', 'Burundi', 'Tunisia', 'South Sudan', 'Togo', 'Sierra Leone', 'Libya', 'Central African Republic', 'Liberia', 'Eritrea', 'Mauritania', 'Gabon', 'Botswana', 'Lesotho', 'Guinea-Bissau', 'Equatorial Guinea'];
  const asia = ['China', 'India', 'Indonesia', 'Pakistan', 'Bangladesh', 'Japan', 'Philippines', 'Vietnam', 'Turkey', 'Iran', 'Thailand', 'Myanmar', 'South Korea', 'Iraq', 'Afghanistan', 'Saudi Arabia', 'Uzbekistan', 'Malaysia', 'Yemen', 'Nepal', 'North Korea', 'Sri Lanka', 'Kazakhstan', 'Syria', 'Cambodia', 'Azerbaijan', 'United Arab Emirates', 'Tajikistan', 'Israel', 'Hong Kong', 'Jordan', 'Laos', 'Lebanon', 'Kyrgyzstan', 'Turkmenistan', 'Singapore', 'Oman', 'Palestine', 'Kuwait', 'Georgia', 'Mongolia', 'Armenia', 'Qatar', 'Bahrain', 'Timor-Leste', 'Cyprus', 'Bhutan', 'Maldives', 'Brunei'];
  const oceania = ['Australia', 'Papua New Guinea', 'New Zealand', 'Fiji', 'Solomon Islands', 'Vanuatu', 'Samoa', 'Kiribati', 'Micronesia', 'Tonga', 'Marshall Islands', 'Palau', 'Tuvalu', 'Nauru'];

  if (northAmerica.includes(countryName)) return 'North America';
  if (southAmerica.includes(countryName)) return 'South America';
  if (europe.includes(countryName)) return 'Europe';
  if (africa.includes(countryName)) return 'Africa';
  if (asia.includes(countryName)) return 'Asia';
  if (oceania.includes(countryName)) return 'Oceania';
  return null;
};

const GlobalAutomationMap: React.FC = () => {
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const getRiskLevelColor = (countryName: string) => {
    const region = getRegionForCountry(countryName);
    if (!region) return '#e5e7eb'; // Default gray for unmapped countries
    
    const data = regionData[region as keyof typeof regionData];
    if (!data) return '#e5e7eb';
    
    return riskLevels[data.riskLevel as keyof typeof riskLevels].color;
  };

  return (
    <div className="relative" onMouseMove={handleMouseMove}>
      <div className="mb-4 flex flex-wrap justify-between items-center">
        <div className="flex flex-wrap gap-4">
          {Object.entries(riskLevels).map(([level, { color }]) => (
            <div key={level} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
              <span className="text-sm text-gray-600">{level} Risk</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative h-[500px] bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 147,
            center: [0, 30]
          }}
        >
          <ZoomableGroup>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = geo.properties.name;
                  const region = getRegionForCountry(countryName);
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getRiskLevelColor(countryName)}
                      stroke="#FFFFFF"
                      strokeWidth={0.5}
                      style={{
                        default: {
                          outline: 'none',
                          transition: 'all 0.3s ease',
                        },
                        hover: {
                          fill: '#3b82f6',
                          outline: 'none',
                          cursor: 'pointer',
                        },
                        pressed: {
                          outline: 'none',
                        },
                      }}
                      onMouseEnter={() => {
                        if (region) {
                          setTooltipContent(region);
                          setSelectedRegion(region);
                        }
                      }}
                      onMouseLeave={() => {
                        setTooltipContent(null);
                        setSelectedRegion(null);
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {tooltipContent && (
          <div 
            className="absolute bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-xs z-10"
            style={{
              left: tooltipPosition.x - 100, 
              top: tooltipPosition.y - 250,
              transform: 'translate(0, -100%)',
              pointerEvents: 'none'
            }}
          >
            <h4 className="font-semibold text-blue-900 mb-2">{tooltipContent}</h4>
            {regionData[tooltipContent as keyof typeof regionData] && (
              <>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Risk Level:</span>{' '}
                  {regionData[tooltipContent as keyof typeof regionData].riskLevel}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Industries at Risk:</span>{' '}
                  {regionData[tooltipContent as keyof typeof regionData].industries.join(', ')}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Workforce Impact:</span>{' '}
                  {regionData[tooltipContent as keyof typeof regionData].impact}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalAutomationMap; 