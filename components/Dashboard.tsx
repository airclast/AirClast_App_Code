
import React from 'react';
import type { AirQualityReport } from '../types';
import { CurrentAQI } from './CurrentAQI';
import { ForecastChart } from './ForecastChart';
import { PollutantBreakdown } from './PollutantBreakdown';
import { HealthAlerts } from './HealthAlerts';

interface DashboardProps {
  report: AirQualityReport;
}

export const Dashboard: React.FC<DashboardProps> = ({ report }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      <div className="lg:col-span-1 space-y-6">
        <CurrentAQI data={report.currentAqi} location={report.location} />
        <HealthAlerts data={report.healthAlert} />
      </div>
      <div className="lg:col-span-2 space-y-6">
        <ForecastChart data={report.forecast} />
        <PollutantBreakdown data={report.pollutantBreakdown} />
      </div>
    </div>
  );
};
