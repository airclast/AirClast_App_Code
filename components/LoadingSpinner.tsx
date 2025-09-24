
import React from 'react';
import { AtomIcon } from './icons';

interface LoadingSpinnerProps {
    message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 my-8 text-center text-cyan-300">
      <AtomIcon className="w-12 h-12 animate-spin-slow text-cyan-400" />
      <p className="mt-4 text-lg font-semibold tracking-wider">{message}</p>
    </div>
  );
};
