import React from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';

interface PlayerProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Player({ isPlaying, onPlayPause, onVolumeChange }: PlayerProps) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm p-2 sm:p-3 flex flex-wrap justify-between items-center text-red-500 border-t border-red-500/30" style={{ fontFamily: "'Cinzel', serif" }}>
      <div className="flex items-center space-x-2 sm:space-x-4 mb-2 sm:mb-0">
        <button onClick={onPlayPause} className="hover:text-red-400">
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <SkipBack size={16} className="hover:text-red-400 cursor-pointer" />
        <SkipForward size={16} className="hover:text-red-400 cursor-pointer" />
      </div>
      <div className="text-center mb-2 sm:mb-0 w-full sm:w-auto">
        <h3 className="text-xs sm:text-sm font-light">Now Playing: Death Waltz</h3>
        <p className="text-xs opacity-75 hidden sm:block">Adam S. Hurst</p>
      </div>
      <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
        <Volume2 size={16} />
        <input 
          type="range" 
          className="w-16 sm:w-24 accent-red-500" 
          min="0" 
          max="1" 
          step="0.1" 
          onChange={onVolumeChange}
        />
      </div>
    </footer>
  );
}