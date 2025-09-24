
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { Pollutant } from '../types';

interface PollutantBreakdownProps {
  data: Pollutant[];
}

const COLORS = ['#0ea5e9', '#06b6d4', '#22d3ee', '#67e8f9', '#a5f3fc'];

export const PollutantBreakdown: React.FC<PollutantBreakdownProps> = ({ data }) => {
  return (
    <div className="p-6 bg-slate-800/60 rounded-lg shadow-lg border border-slate-700 h-80">
      <h3 className="text-lg font-semibold text-cyan-300 mb-4">Pollutant Breakdown</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
             contentStyle={{ 
              backgroundColor: 'rgba(15, 23, 42, 0.8)', 
              borderColor: '#334155',
              borderRadius: '0.5rem'
            }}
          />
           <Legend wrapperStyle={{ bottom: 0 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
