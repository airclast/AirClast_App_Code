
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { LocationSelector } from './components/LocationSelector';
import { Dashboard } from './components/Dashboard';
import { ImmersiveStory } from './components/ImmersiveStory';
import { LoadingSpinner } from './components/LoadingSpinner';
import { fetchAirQualityReport } from './services/geminiService';
import type { AirQualityReport, HealthProfile } from './types';

const App: React.FC = () => {
  const [report, setReport] = useState<AirQualityReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  const handleForecastRequest = useCallback(async (location: string, healthProfile: HealthProfile) => {
    setIsLoading(true);
    setError(null);
    setInitialLoad(false);
    try {
      const result = await fetchAirQualityReport(location, healthProfile);
      setReport(result);
    } catch (e) {
      console.error(e);
      setError('Failed to retrieve air quality data. The AI may be busy, please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-slate-800 text-white font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <LocationSelector onForecastRequest={handleForecastRequest} isLoading={isLoading} />
        
        {isLoading && <LoadingSpinner message="Analyzing atmospheric data..." />}
        
        {error && !isLoading && (
          <div className="text-center p-8 my-8 bg-red-900/50 rounded-lg border border-red-700">
            <h3 className="text-xl font-semibold text-red-300">An Error Occurred</h3>
            <p className="text-red-400 mt-2">{error}</p>
          </div>
        )}

        {!isLoading && !error && report && (
          <Dashboard report={report} />
        )}
        
        {!isLoading && !report && initialLoad && (
           <div className="text-center p-8 my-8 bg-slate-800/60 rounded-lg border border-slate-700">
            <h2 className="text-2xl font-bold text-cyan-300">Welcome to AirVision360</h2>
            <p className="mt-2 text-slate-300">Enter a location and select a profile to generate your personalized air quality forecast.</p>
          </div>
        )}

        <ImmersiveStory />
      </main>
      <footer className="text-center p-4 text-xs text-gray-500">
        <p>AirVision360 | AI-Powered Atmospheric Insights</p>
      </footer>
    </div>
  );
};

export default App;
