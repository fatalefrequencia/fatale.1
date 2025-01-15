import React from 'react';

interface Album {
  name: string;
  artist: string;
  link: string;
}

interface NewReleasesProps {
  albums: Album[];
}

export function NewReleases({ albums }: NewReleasesProps) {
  return (
    <div className="w-48 mb-4 p-3 border border-red-500 rounded-md bg-black/70 backdrop-blur-sm">
      <h2 className="text-sm font-light mb-2 text-red-400">New Releases</h2>
      <div className="space-y-2">
        {albums.map((album, index) => (
          <div key={index} className="bg-black/70 p-1.5 rounded-lg">
            <a href={album.link} className="block">
              <h3 className="text-xs font-light text-red-300 truncate hover:text-red-400 transition-colors">{album.name}</h3>
            </a>
            <p className="text-[10px] text-red-400">{album.artist}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 text-right">
        <a href="#past-releases" className="inline-block text-[9px] text-red-700 hover:text-red-600 transition-colors">
          past releases {'->'} 
        </a>
      </div>
    </div>
  );
}