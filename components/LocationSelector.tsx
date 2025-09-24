
import React, { useState } from 'react';
import { HealthProfile } from '../types';
import { SearchIcon } from './icons';

interface LocationSelectorProps {
  onForecastRequest: (location: string, healthProfile: HealthProfile) => void;
  isLoading: boolean;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({ onForecastRequest, isLoading }) => {
  const [location, setLocation] = useState<string>('San Francisco, CA');
  const [healthProfile, setHealthProfile] = useState<HealthProfile>(HealthProfile.GENERAL);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onForecastRequest(location.trim(), healthProfile);
    }
  };

  return (
    <div className="p-6 bg-slate-800/60 rounded-lg shadow-lg border border-slate-700 mb-8">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="col-span-1 md:col-span-1">
          <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-1">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., New York, NY"
            className="w-full bg-slate-900/50 border border-slate-600 rounded-md py-2 px-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            disabled={isLoading}
          />
        </div>
        <div className="col-span-1 md:col-span-1">
          <label htmlFor="health-profile" className="block text-sm font-medium text-slate-300 mb-1">
            Health Profile
          </label>
          <select
            id="health-profile"
            value={healthProfile}
            onChange={(e) => setHealthProfile(e.target.value as HealthProfile)}
            className="w-full bg-slate-900/50 border border-slate-600 rounded-md py-2 px-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            disabled={isLoading}
          >
            {Object.values(HealthProfile).map((profile) => (
              <option key={profile} value={profile}>{profile}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="col-span-1 md:col-span-1 flex items-center justify-center w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
        >
          {isLoading ? 'Generating...' : <><SearchIcon className="w-5 h-5 mr-2" /> Get Forecast</>}
        </button>
      </form>
    </div>
  );
};
