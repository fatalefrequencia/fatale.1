import React from 'react';

interface ProfileButtonProps {
  onClick: () => void;
}

export function ProfileButton({ onClick }: ProfileButtonProps) {
  return (
    <div className="absolute top-4 left-4">
      <button onClick={onClick} className="block">
        <div className="flex flex-col items-start p-2 border-2 border-red-500 rounded-lg gothic-frame bg-black/70 backdrop-blur-sm">
          <h2 className="text-base sm:text-lg font-light mb-1 text-red-400">Artist Profile</h2>
          <p className="text-xs opacity-75 text-red-300 hover:text-red-400 transition-colors">Enter the realm of darkness</p>
        </div>
      </button>
    </div>
  );
}