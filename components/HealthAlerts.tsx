
import React from 'react';
import { AlertIcon, CheckCircleIcon } from './icons';

interface HealthAlertsProps {
  data: {
    title: string;
    recommendations: string[];
  };
}

export const HealthAlerts: React.FC<HealthAlertsProps> = ({ data }) => {
  return (
    <div className="p-6 bg-slate-800/60 rounded-lg shadow-lg border border-slate-700">
      <div className="flex items-center mb-4">
        <AlertIcon className="w-6 h-6 mr-3 text-amber-400" />
        <h3 className="text-lg font-semibold text-amber-300">{data.title}</h3>
      </div>
      <ul className="space-y-3">
        {data.recommendations.map((rec, index) => (
          <li key={index} className="flex items-start">
            <CheckCircleIcon className="w-5 h-5 mr-2 mt-0.5 text-cyan-400 flex-shrink-0" />
            <span className="text-slate-300 text-sm">{rec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
