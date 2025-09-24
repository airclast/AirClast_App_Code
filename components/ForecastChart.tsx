
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import type { ForecastPoint } from '../types';
import { getAqiInfo } from '../constants';

interface ForecastChartProps {
  data: ForecastPoint[];
}

export const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  const chartData = data.map(point => ({...point, color: getAqiInfo(point.aqi).chartColor}));

  return (
    <div className="p-6 bg-slate-800/60 rounded-lg shadow-lg border border-slate-700 h-80">
      <h3 className="text-lg font-semibold text-cyan-300 mb-4">24-Hour Forecast</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
          <defs>
            <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis dataKey="hour" stroke="#94a3b8" tick={{ fontSize: 12 }} />
          <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(15, 23, 42, 0.8)', 
              borderColor: '#334155',
              borderRadius: '0.5rem'
            }}
            labelStyle={{ color: '#e2e8f0' }}
          />
          <Area type="monotone" dataKey="aqi" stroke="#06b6d4" fillOpacity={1} fill="url(#colorAqi)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
