import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { 
  Heart, 
  Share2, 
  SkipBack, 
  SkipForward, 
  Play, 
  Pause, 
  Volume2,
  ListMusic,
  Plus,
  Tag,
  ChevronDown,
  ChevronUp,
  Gift
} from 'lucide-react'
import { LiveActivity } from '@/components/LiveActivity'
import { TokenGift } from '@/components/TokenGift'

export default function PlayerPage() {
  const { id } = useParams()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(180) // 3 minutes example
  const [volume, setVolume] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [showTokens, setShowTokens] = useState(false)
  const [showPlaylistAdd, setShowPlaylistAdd] = useState(false)
  const [activities, setActivities] = useState([
    {
      id: '1',
      type: 'token' as const,
      user: {
        name: 'Dark Soul',
        avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png'
      },
      details: {
        tokens: 50,
        message: 'Amazing track! Keep it up! 🖤'
      },
      timestamp: new Date()
    }
  ])

  // Mock data
  const song = {
    title: "Shadows of Eternity",
    artist: "Crimson Void",
    album: "Dark Horizons",
    cover: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png",
    tags: ['Dark Ambient', 'Gothic', 'Electronic', 'Atmospheric'],
    playlists: [
      { id: '1', name: 'Dark Vibes', tracks: 12 },
      { id: '2', name: 'Night Drive', tracks: 24 },
      { id: '3', name: 'Gothic Mix', tracks: 18 }
    ]
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleSendTokens = (amount: number, message: string) => {
    const newActivity = {
      id: Date.now().toString(),
      type: 'token' as const,
      user: {
        name: 'You',
        avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png'
      },
      details: {
        tokens: amount,
        message
      },
      timestamp: new Date()
    }
    setActivities([newActivity, ...activities])
  }

  return (
    <div 
      className="min-h-[calc(100vh-8rem)] relative bg-cover bg-center"
      style={{
        backgroundImage: `url(${song.cover})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black" />

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Main Player Section */}
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="w-64 h-64 flex-shrink-0">
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-full h-full object-cover rounded-lg shadow-2xl"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-4xl font-bold text-red-300 mb-2">{song.title}</h1>
                  <p className="text-xl text-red-500 mb-1">{song.artist}</p>
                  <p className="text-lg text-red-700 mb-6">{song.album}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Tag className="h-4 w-4 text-red-500" />
                    {song.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-red-500/20 rounded-full text-sm text-red-300 hover:bg-red-500/30 cursor-pointer transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Controls */}
                  <div className="space-y-4">
                    <div className="flex justify-center md:justify-start items-center gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-red-500/20"
                      >
                        <SkipBack className="h-6 w-6" />
                      </Button>
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
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-red-500/20"
                      >
                        <SkipForward className="h-6 w-6" />
                      </Button>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <Slider
                        value={[currentTime]}
                        max={duration}
                        step={1}
                        onValueChange={(value) => setCurrentTime(value[0])}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-red-700">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>

                    {/* Volume */}
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <Volume2 className="h-4 w-4 text-red-500" />
                      <Slider
                        value={[volume]}
                        max={1}
                        step={0.1}
                        onValueChange={(value) => setVolume(value[0])}
                        className="w-24"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-center md:justify-start gap-4">
                <Button
                  variant="ghost"
                  className="hover:bg-red-500/20"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isLiked ? 'fill-red-500' : ''}`} />
                  {isLiked ? 'Liked' : 'Like'}
                </Button>
                <Button
                  variant="ghost"
                  className="hover:bg-red-500/20"
                  onClick={() => setShowPlaylistAdd(!showPlaylistAdd)}
                >
                  <ListMusic className="h-5 w-5 mr-2" />
                  Add to Playlist
                </Button>
                <Button variant="ghost" className="hover:bg-red-500/20">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
                <Button
                  variant="ghost"
                  className="hover:bg-red-500/20"
                  onClick={() => setShowTokens(!showTokens)}
                >
                  <Gift className="h-5 w-5 mr-2" />
                  Support Artist
                  {showTokens ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                </Button>
              </div>

              {/* Playlist Add Panel */}
              {showPlaylistAdd && (
                <Card className="bg-red-950/20 border-red-900/20">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-red-300 mb-4">Add to Playlist</h3>
                    <div className="space-y-2">
                      {song.playlists.map((playlist) => (
                        <div
                          key={playlist.id}
                          className="flex items-center justify-between p-2 hover:bg-red-500/20 rounded-lg cursor-pointer transition-colors"
                        >
                          <div>
                            <p className="text-red-300">{playlist.name}</p>
                            <p className="text-sm text-red-700">{playlist.tracks} tracks</p>
                          </div>
                          <Button size="icon" variant="ghost" className="hover:bg-red-500/30">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button className="w-full mt-4 bg-red-500 hover:bg-red-600">
                        Create New Playlist
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Token Gift Panel */}
              {showTokens && (
                <div className="mt-4">
                  <TokenGift onSendTokens={handleSendTokens} />
                </div>
              )}
            </div>

            {/* Live Activity */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <LiveActivity 
                  activities={activities}
                  title="Track Activity"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}