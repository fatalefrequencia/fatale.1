import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { ListMusic } from 'lucide-react'

export function UserPlaylists() {
  const navigate = useNavigate()
  
  const playlists = [
    { id: '1', name: 'Dark Rituals', tracks: 12 },
    { id: '2', name: 'Midnight Drive', tracks: 8 },
    { id: '3', name: 'Gothic Dreams', tracks: 15 },
    { id: '4', name: 'Ethereal Sounds', tracks: 10 }
  ]

  return (
    <div className="space-y-2">
      {playlists.map((playlist) => (
        <Button
          key={playlist.id}
          variant="ghost"
          className="w-full justify-start text-left hover:bg-red-500/20"
          onClick={() => navigate(`/playlist/${playlist.id}`)}
        >
          <ListMusic className="h-4 w-4 mr-2 text-red-500" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-red-300 truncate">{playlist.name}</p>
            <p className="text-xs text-red-700">{playlist.tracks} tracks</p>
          </div>
        </Button>
      ))}
      <Button
        variant="ghost"
        className="w-full justify-center text-sm text-red-700 hover:text-red-500 hover:bg-red-500/20"
        onClick={() => navigate('/playlists')}
      >
        View All Playlists
      </Button>
    </div>
  )
}