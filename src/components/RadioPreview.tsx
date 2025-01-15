import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Radio, Play, Pause, ListMusic, Plus } from 'lucide-react'
import { UserPlaylists } from './UserPlaylists'

export function RadioPreview() {
  const navigate = useNavigate()
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="space-y-4">
      <Card className="bg-red-950/20 border-red-900/20">
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-xl md:text-2xl font-bold text-red-300 mb-4">ur dead! X~x</h2>
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-red-900/20 flex items-center justify-center mb-4">
              <Radio className="h-12 w-12 md:h-16 md:w-16 text-red-500" />
            </div>
            <p className="text-red-300 mb-2">welcome home....</p>
            <p className="text-sm text-red-700 mb-4">3.2K listening</p>
            <Button 
              size="lg" 
              className="w-full bg-red-500 hover:bg-red-600"
              onClick={() => navigate('/radio')}
            >
              <Play className="h-4 w-4 md:h-5 md:w-5 mr-2" /> Listen Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* User Playlists */}
      <Card className="bg-red-950/20 border-red-900/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ListMusic className="h-4 w-4 text-red-500" />
              <h3 className="text-sm font-semibold text-red-300">Your Playlists</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-red-500/20"
              onClick={() => navigate('/playlists')}
            >
              <Plus className="h-4 w-4 text-red-500" />
            </Button>
          </div>
          <UserPlaylists />
        </CardContent>
      </Card>
    </div>
  )
}