
import React from 'react';
import { getAqiInfo } from '../constants';
import { MapPinIcon } from './icons';

interface CurrentAQIProps {
  data: {
    value: number;
    category: string;
    description: string;
  };
  location: string;
}

export const CurrentAQI: React.FC<CurrentAQIProps> = ({ data, location }) => {
  const aqiInfo = getAqiInfo(data.value);
  const bgGradient = `bg-gradient-to-br from-${aqiInfo.color.substring(3)}-700 to-${aqiInfo.color.substring(3)}-900`;

  return (
    <div className={`p-6 rounded-lg shadow-lg border border-slate-700/50 ${aqiInfo.color} text-white`}>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-white/80">Current AQI</h2>
           <div className="flex items-center text-sm text-white/70 mt-1">
             <MapPinIcon className="w-4 h-4 mr-1.5"/>
             {location}
           </div>
        </div>
        <span className={`px-3 py-1 text-sm font-bold rounded-full ${aqiInfo.color} bg-opacity-50`}>
          {data.category}
        </span>
      </div>
      <div className="text-center my-4">
        <span className="text-7xl font-bold tracking-tighter">{data.value}</span>
      </div>
      <p className="text-center text-sm text-white/90">{data.description}</p>
    </div>
  );
};
