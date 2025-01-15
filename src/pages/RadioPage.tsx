import { useState, useEffect } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Radio, Heart, SkipForward, Play, Pause, Volume2, Music, Headphones } from 'lucide-react'
import { Slider } from "@/components/ui/slider"
import { LiveActivity } from '@/components/LiveActivity'

interface Station {
  id: string
  name: string
  genre: string
  listeners: number
  description: string
  currentTrack?: string
  artist?: string
  cover?: string
}

export default function RadioPage() {
  const [currentStation, setCurrentStation] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
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
        message: 'Amazing radio station! 🖤'
      },
      timestamp: new Date()
    }
  ])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const genres = [
    'All',
    'Dark Ambient',
    'Gothic Metal',
    'Industrial',
    'Darkwave',
    'EBM',
    'Witch House',
    'Dark Folk'
  ]

  const stations: Station[] = [
    {
      id: '1',
      name: 'Ethereal Echoes',
      genre: 'Dark Ambient',
      listeners: 1234,
      description: 'Deep atmospheric soundscapes and dark ambient textures',
      currentTrack: 'Shadow Whispers',
      artist: 'Void Walker',
      cover: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png'
    },
    {
      id: '2',
      name: 'Gothic Sanctuary',
      genre: 'Gothic Metal',
      listeners: 2345,
      description: 'The best in gothic metal and atmospheric doom',
      currentTrack: 'Eternal Night',
      artist: 'Dark Symphony',
      cover: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png'
    },
    {
      id: '3',
      name: 'Neon Darkness',
      genre: 'Industrial',
      listeners: 1567,
      description: 'Industrial beats and cyberpunk atmospheres',
      currentTrack: 'Digital Dreams',
      artist: 'Circuit Breaker',
      cover: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png'
    },
    {
      id: '4',
      name: "Witch's Frequency",
      genre: 'Witch House',
      listeners: 890,
      description: 'Modern witch house and dark electronic',
      currentTrack: 'Crystal Hex',
      artist: "Salem's Child",
      cover: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png'
    }
  ]

  const filteredStations = selectedGenre && selectedGenre !== 'All'
    ? stations.filter(station => station.genre === selectedGenre)
    : stations

  const handleStationSelect = (stationId: string) => {
    setCurrentStation(stationId)
    setIsPlaying(true)
  }

  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Genre Filter */}
            <ScrollArea className="w-full" orientation="horizontal">
              <div className="flex gap-2 pb-4">
                {genres.map((genre) => (
                  <Button
                    key={genre}
                    variant="ghost"
                    size="sm"
                    className={`whitespace-nowrap ${
                      selectedGenre === genre || (genre === 'All' && !selectedGenre)
                        ? 'bg-red-500/20'
                        : 'hover:bg-red-900/20'
                    }`}
                    onClick={() => setSelectedGenre(genre === 'All' ? null : genre)}
                  >
                    {genre === 'All' ? (
                      <Radio className="h-4 w-4 mr-2" />
                    ) : (
                      <Music className="h-4 w-4 mr-2" />
                    )}
                    {genre}
                  </Button>
                ))}
              </div>
            </ScrollArea>

            {/* Current Station */}
            {currentStation && (
              <Card className="bg-red-950/20 border-red-900/20">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-lg overflow-hidden">
                      <img
                        src={stations.find(s => s.id === currentStation)?.cover}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h2 className="text-2xl font-bold text-red-300 mb-2">
                        {stations.find(s => s.id === currentStation)?.name}
                      </h2>
                      <p className="text-red-700 mb-4">
                        {stations.find(s => s.id === currentStation)?.description}
                      </p>
                      <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Headphones className="h-4 w-4 text-red-500" />
                          <span className="text-red-700">
                            {stations.find(s => s.id === currentStation)?.listeners.toLocaleString()} listeners
                          </span>
                        </div>
                        <div className="hidden md:flex items-center gap-2">
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
                      <div className="mt-4 space-y-2">
                        <p className="text-red-300">
                          Now Playing: {stations.find(s => s.id === currentStation)?.currentTrack}
                        </p>
                        <p className="text-red-700">
                          by {stations.find(s => s.id === currentStation)?.artist}
                        </p>
                      </div>
                    </div>
                    <div className="flex md:flex-col gap-2">
                      <Button
                        size="icon"
                        className="h-12 w-12 rounded-full bg-red-500 hover:bg-red-600"
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
                        className="h-12 w-12 hover:bg-red-500/20"
                      >
                        <SkipForward className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-12 w-12 hover:bg-red-500/20"
                      >
                        <Heart className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Station List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredStations.map((station) => (
                <Card
                  key={station.id}
                  className={`bg-red-950/20 border-red-900/20 cursor-pointer transition-all hover:bg-red-900/30 active:scale-98 ${
                    currentStation === station.id ? 'ring-2 ring-red-500' : ''
                  }`}
                  onClick={() => handleStationSelect(station.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden">
                        <img
                          src={station.cover}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-red-300 mb-1">{station.name}</h3>
                        <p className="text-sm text-red-700 mb-2">{station.genre}</p>
                        <div className="flex items-center gap-2">
                          <Headphones className="h-4 w-4 text-red-500" />
                          <span className="text-xs text-red-500">
                            {station.listeners.toLocaleString()} listeners
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Live Activity */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <LiveActivity 
                activities={activities}
                title="Radio Activity"
              />
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}