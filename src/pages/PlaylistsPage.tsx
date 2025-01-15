import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ListMusic, Plus, MoreHorizontal, Play, Heart } from 'lucide-react'
import { CreatePlaylistDialog } from '@/components/CreatePlaylistDialog'

export default function PlaylistsPage() {
  const navigate = useNavigate()
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  
  const playlists = [
    { 
      id: '1', 
      name: 'Dark Rituals', 
      description: 'A collection of dark ambient and ritual drone music',
      tracks: 12,
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png',
      lastUpdated: new Date()
    },
    { 
      id: '2', 
      name: 'Midnight Drive', 
      description: 'Perfect for those late night drives through the city',
      tracks: 8,
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans%20bg%20-0CXd6tHJj9LLQMmPvqU92AqOdJYjM5.png',
      lastUpdated: new Date(Date.now() - 86400000)
    },
    // Add more playlists...
  ]

  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-red-300">Your Playlists</h1>
            <p className="text-red-700">Create and manage your music collections</p>
          </div>
          <Button 
            className="bg-red-500 hover:bg-red-600"
            onClick={() => setShowCreateDialog(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Playlist
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {playlists.map((playlist) => (
            <Card 
              key={playlist.id}
              className="bg-red-950/20 border-red-900/20 group hover:bg-red-900/30 transition-colors"
            >
              <CardContent className="p-4">
                <div 
                  className="aspect-square mb-4 rounded-lg overflow-hidden relative cursor-pointer"
                  onClick={() => navigate(`/playlist/${playlist.id}`)}
                >
                  <img
                    src={playlist.image}
                    alt={playlist.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      size="icon"
                      className="h-12 w-12 rounded-full bg-red-500 hover:bg-red-600"
                    >
                      <Play className="h-6 w-6 ml-1" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div 
                      className="flex-1 cursor-pointer"
                      onClick={() => navigate(`/playlist/${playlist.id}`)}
                    >
                      <h3 className="font-medium text-red-300 hover:text-red-400 transition-colors line-clamp-1">
                        {playlist.name}
                      </h3>
                      <p className="text-sm text-red-700 line-clamp-2">
                        {playlist.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-red-500/20"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between text-sm text-red-700">
                    <span>{playlist.tracks} tracks</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-red-500/20"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <CreatePlaylistDialog 
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
      />
    </ScrollArea>
  )
}