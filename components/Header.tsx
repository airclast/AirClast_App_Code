
import React from 'react';
import { AtomIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="p-4 border-b border-cyan-500/20">
      <div className="container mx-auto flex items-center justify-center space-x-3">
        <AtomIcon className="w-8 h-8 text-cyan-400" />
        <h1 className="text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
          AirVision360
        </h1>
      </div>
    </header>
  );
};
