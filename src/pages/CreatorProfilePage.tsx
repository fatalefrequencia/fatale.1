import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Link2, UserPlus, UserCheck } from 'lucide-react'
import { LiveActivity } from '@/components/LiveActivity'
import { ContentFilters } from '@/components/ContentFilters'
import { ContentCard } from '@/components/ContentCard'

export default function CreatorProfilePage() {
  const { id } = useParams()
  const [isFollowing, setIsFollowing] = useState(false)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [activities, setActivities] = useState([
    {
      id: Date.now().toString(),
      type: 'follow' as const,
      user: {
        name: 'Dark Wanderer',
        avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png'
      },
      timestamp: new Date()
    },
    {
      id: (Date.now() - 1000).toString(),
      type: 'token' as const,
      user: {
        name: 'Shadow Weaver',
        avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png'
      },
      details: {
        tokens: 100,
        message: 'Love your work! 🖤'
      },
      timestamp: new Date(Date.now() - 600000)
    }
  ])

  const contentItems = [
    { 
      id: '1', 
      type: 'image' as const, 
      title: 'Dark Ambiance', 
      description: 'Gothic atmosphere', 
      content: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans%20bg%20-0CXd6tHJj9LLQMmPvqU92AqOdJYjM5.png',
      size: 'large',
      likes: 234,
      comments: 56
    },
    { 
      id: '2', 
      type: 'text' as const, 
      title: 'Nocturnal Thoughts', 
      description: 'Midnight musings', 
      content: 'In the depths of darkness, we find our truest light...',
      size: 'medium',
      likes: 89,
      comments: 12
    },
    { 
      id: '3', 
      type: 'music' as const, 
      title: 'Ethereal Echoes', 
      description: 'New composition', 
      content: '/death-waltz.mp3',
      size: 'small',
      likes: 567,
      comments: 78
    }
  ]

  const handleContact = () => {
    window.location.href = "mailto:darkartist@example.com"
  }

  const handleLink = () => {
    window.open('https://darkartist.example.com', '_blank')
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    
    if (!isFollowing) {
      setActivities(prev => [{
        id: Date.now().toString(),
        type: 'follow',
        user: {
          name: 'You',
          avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png'
        },
        timestamp: new Date()
      }, ...prev])
    }
  }

  const filteredContent = selectedType 
    ? contentItems.filter(item => item.type === selectedType)
    : contentItems

  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="min-h-screen">
        {/* Profile Header */}
        <div className="relative px-4 py-8 md:py-12 backdrop-blur-sm bg-black/40">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
              <Avatar className="w-24 h-24 md:w-32 md:h-32 ring-2 ring-offset-2 ring-offset-black/50 ring-red-500">
                <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png" />
                <AvatarFallback>DA</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold mb-2 text-red-300">Dark Artist</h1>
                <p className="text-gray-400 mb-4">@darkartist</p>
                
                <div className="flex justify-center md:justify-start items-center gap-3 mb-4">
                  <Button
                    variant={isFollowing ? "ghost" : "default"}
                    size="sm"
                    onClick={handleFollow}
                    className={`flex items-center gap-2 ${
                      isFollowing ? 'bg-black/50 hover:bg-black/70' : 'bg-red-500 hover:bg-red-600'
                    } backdrop-blur-sm`}
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck className="h-4 w-4" />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4" />
                        Follow
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleContact}
                    className="bg-black/50 hover:bg-black/70 backdrop-blur-sm"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLink}
                    className="bg-black/50 hover:bg-black/70 backdrop-blur-sm"
                  >
                    <Link2 className="h-4 w-4 mr-2" />
                    Links
                  </Button>
                </div>

                <div className="max-w-lg">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Digital artist exploring the depths of darkness through visual and auditory experiences. 
                    Specializing in gothic aesthetics, dark ambient soundscapes, and ethereal compositions.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-black/30 text-gray-400">Digital Art</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-black/30 text-gray-400">Dark Ambient</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-black/30 text-gray-400">Gothic</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Filters */}
        <ContentFilters 
          selectedType={selectedType}
          onTypeSelect={setSelectedType}
          accentColor="#ef4444"
        />

        {/* Content Grid and Activity */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredContent.map((item) => (
                  <ContentCard 
                    key={item.id} 
                    item={item} 
                    accentColor="#ef4444"
                  />
                ))}
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <LiveActivity 
                  activities={activities}
                  title="Profile Activity"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}