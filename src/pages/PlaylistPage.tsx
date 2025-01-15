import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Play, 
  Pause, 
  Heart, 
  MoreHorizontal, 
  Clock, 
  Music2, 
  Plus,
  Pencil,
  Share2,
  ArrowLeft
} from 'lucide-react'
import { LiveActivity } from '@/components/LiveActivity'

export default function PlaylistPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isPlaying, setIsPlaying] = useState(false)
  const [showActions, setShowActions] = useState(false)
  const [activities, setActivities] = useState([
    {
      id: '1',
      type: 'like' as const,
      user: {
        name: 'Dark Soul',
        avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png'
      },
      timestamp: new Date()
    }
  ])

  // Mock data
  const playlist = {
    id,
    name: 'Dark Rituals',
    description: 'A collection of dark ambient and ritual drone music for those deep, introspective moments.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png',
    tracks: [
      {
        id: '1',
        title: 'Shadows of Eternity',
        artist: {
          id: 'crimson-void',
          name: 'Crimson Void',
          avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png'
        },
        duration: '5:23',
        added: new Date()
      },
      {
        id: '2',
        title: 'Ethereal Whispers',
        artist: {
          id: 'night-walker',
          name: 'Night Walker',
          avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png'
        },
        duration: '4:15',
        added: new Date(Date.now() - 86400000)
      }
    ]
  }

  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
        <div className="lg:col-span-3">
          {/* Mobile Back Button */}
          <div className="lg:hidden mb-4">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-red-500/20"
              onClick={() => navigate('/playlists')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>

          {/* Playlist Header */}
          <Card className="bg-red-950/20 border-red-900/20 mb-6">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image and Basic Info */}
                <div className="w-full md:w-48 flex-shrink-0">
                  <div className="relative aspect-square">
                    <img
                      src={playlist.image}
                      alt={playlist.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {/* Mobile Play Button Overlay */}
                    <div className="md:hidden absolute inset-0 flex items-center justify-center bg-black/50">
                      <Button
                        size="icon"
                        className="h-14 w-14 rounded-full bg-red-500 hover:bg-red-600"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? (
                          <Pause className="h-6 w-6" />
                        ) : (
                          <Play className="h-6 w-6 ml-1" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h1 className="text-xl md:text-2xl font-bold text-red-300 mb-2 line-clamp-1">{playlist.name}</h1>
                  <p className="text-sm text-red-700 mb-2 md:mb-4 line-clamp-2">{playlist.description}</p>
                  <p className="text-sm text-red-700 mb-4 md:mb-6">{playlist.tracks.length} tracks</p>
                  
                  {/* Desktop Controls */}
                  <div className="hidden md:flex flex-wrap gap-3">
                    <Button
                      size="lg"
                      className="bg-red-500 hover:bg-red-600"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5 mr-2" />
                      ) : (
                        <Play className="h-5 w-5 mr-2" />
                      )}
                      {isPlaying ? 'Pause' : 'Play'}
                    </Button>
                    <Button variant="ghost" className="hover:bg-red-500/20">
                      <Heart className="h-5 w-5 mr-2" />
                      Like
                    </Button>
                    <Button variant="ghost" className="hover:bg-red-500/20">
                      <Share2 className="h-5 w-5 mr-2" />
                      Share
                    </Button>
                    <Button variant="ghost" className="hover:bg-red-500/20">
                      <Pencil className="h-5 w-5 mr-2" />
                      Edit
                    </Button>
                  </div>

                  {/* Mobile Controls */}
                  <div className="md:hidden flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-red-500/20"
                      >
                        <Heart className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-red-500/20"
                      >
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-red-500/20"
                      onClick={() => setShowActions(!showActions)}
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Mobile Action Menu */}
                  {showActions && (
                    <div className="md:hidden mt-4 space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start hover:bg-red-500/20"
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit Playlist
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracks List */}
          <Card className="bg-red-950/20 border-red-900/20">
            <CardContent className="p-4 md:p-6">
              <div className="hidden md:flex items-center justify-between text-sm text-red-700 pb-4 mb-4 border-b border-red-900/20">
                <div className="flex-1 min-w-0">Title</div>
                <div className="w-48">Added</div>
                <div className="w-20 text-right"><Clock className="h-4 w-4 inline-block" /></div>
                <div className="w-8"></div>
              </div>

              <div className="space-y-2">
                {playlist.tracks.map((track) => (
                  <div
                    key={track.id}
                    className="flex items-center group hover:bg-red-500/10 rounded-lg p-2 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <Music2 className="h-4 w-4 text-red-500 flex-shrink-0" />
                        <div className="min-w-0">
                          <p 
                            className="font-medium text-red-300 hover:text-red-400 transition-colors cursor-pointer truncate"
                            onClick={() => navigate(`/player/${track.id}`)}
                          >
                            {track.title}
                          </p>
                          <p 
                            className="text-sm text-red-700 hover:text-red-600 transition-colors cursor-pointer truncate"
                            onClick={() => navigate(`/creator/${track.artist.id}`)}
                          >
                            {track.artist.name}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block w-48 text-sm text-red-700 truncate">
                      {new Date(track.added).toLocaleDateString()}
                    </div>
                    <div className="hidden md:block w-20 text-right text-sm text-red-700">
                      {track.duration}
                    </div>
                    <div className="w-8">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-red-500/20 opacity-0 md:group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <Button
                  variant="ghost"
                  className="w-full justify-center py-4 md:py-6 hover:bg-red-500/20"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Tracks
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Activity */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <LiveActivity 
              activities={activities}
              title="Playlist Activity"
            />
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}