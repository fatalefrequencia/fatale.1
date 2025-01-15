import React from 'react';
import { Radio } from 'lucide-react';

interface Station {
  name: string;
  link: string;
}

interface StationsProps {
  stations: Station[];
}

export function Stations({ stations }: StationsProps) {
  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
      <div className="p-4 border-2 border-red-500 rounded-lg gothic-frame bg-black/70 backdrop-blur-sm">
        <h2 className="text-lg font-light mb-2 text-red-400 text-center">Stations</h2>
        <div className="grid grid-cols-2 gap-2">
          {stations.map((station, index) => (
            <a key={index} href={station.link} className="flex items-center space-x-2 text-red-300 hover:text-red-400 transition-colors">
              <Radio size={16} />
              <span className="text-[15.7px]" style={{ fontFamily: "'Cinzel', serif" }}>{station.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}