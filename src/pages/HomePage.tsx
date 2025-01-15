import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Music, Play, Radio, Volume2, Gift } from 'lucide-react'
import { LiveActivity } from '@/components/LiveActivity'
import { TokenGift } from '@/components/TokenGift'
import { RadioPreview } from '@/components/RadioPreview'
import { Recommendations } from '@/components/Recommendations'
import { AlgorithmSelector } from '@/components/AlgorithmSelector'

export default function HomePage() {
  const navigate = useNavigate()
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('dark')
  const [showTokens, setShowTokens] = useState<string | null>(null)
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

  const feedContent = {
    dark: [
      {
        id: '1',
        type: 'track',
        title: 'Shadows of Eternity',
        artist: {
          id: 'crimson-void',
          name: 'Crimson Void',
          avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png'
        },
        cover: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png',
        isLiked: false
      },
      {
        id: '2',
        type: 'artwork',
        title: 'Dark Empress',
        artist: {
          id: 'gothic-arts',
          name: 'Gothic Arts',
          avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png'
        },
        image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans%20bg%20-0CXd6tHJj9LLQMmPvqU92AqOdJYjM5.png',
        isLiked: false
      },
      {
        id: '3',
        type: 'text',
        title: 'Midnight Thoughts',
        content: 'In the depths of darkness, we find our truest reflections. Each shadow cast is a story untold, waiting to be discovered by those who dare to venture into the night.',
        artist: {
          id: 'night-poet',
          name: 'Night Poet',
          avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png'
        },
        isLiked: false
      }
    ],
    ethereal: [
      {
        id: '4',
        type: 'track',
        title: 'Celestial Dreams',
        artist: {
          id: 'astral-wanderer',
          name: 'Astral Wanderer',
          avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png'
        },
        cover: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png',
        isLiked: false
      }
    ],
    cyber: [
      {
        id: '5',
        type: 'track',
        title: 'Digital Pulse',
        artist: {
          id: 'cyber-ghost',
          name: 'Cyber Ghost',
          avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png'
        },
        cover: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png',
        isLiked: false
      }
    ]
  }

  const currentFeed = feedContent[selectedAlgorithm as keyof typeof feedContent] || feedContent.dark

  const handleSendTokens = (itemId: string, amount: number, message: string) => {
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
    setShowTokens(null)
  }

  const getThemeColor = () => {
    switch (selectedAlgorithm) {
      case 'ethereal':
        return '#8b5cf6'
      case 'cyber':
        return '#06b6d4'
      case 'nature':
        return '#22c55e'
      case 'chaos':
        return '#f59e0b'
      default:
        return '#ef4444'
    }
  }

  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6 p-4">
        {/* Radio Preview - Left Side */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <RadioPreview />
          </div>
        </div>

        {/* Feed - Middle */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <h2 className="text-lg md:text-xl font-semibold mb-3" style={{ color: getThemeColor() }}>Feed</h2>
            <AlgorithmSelector
              selectedAlgorithm={selectedAlgorithm}
              onSelect={setSelectedAlgorithm}
            />
          </div>

          <div className="space-y-6">
            {currentFeed.map((item) => (
              <Card 
                key={item.id}
                className="bg-black/50 border-none hover:bg-black/60 transition-all overflow-hidden"
                style={{ borderColor: `${getThemeColor()}20` }}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4">
                    {/* Artist Info */}
                    <div 
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => navigate(`/creator/${item.artist.id}`)}
                    >
                      <img
                        src={item.artist.avatar}
                        alt=""
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm hover:opacity-80 transition-opacity truncate" 
                        style={{ color: getThemeColor() }}
                      >
                        {item.artist.name}
                      </span>
                    </div>

                    {/* Content */}
                    {item.type === 'track' && (
                      <div className="flex gap-4">
                        <div className="w-16 h-16 md:w-24 md:h-24 flex-shrink-0">
                          <img
                            src={item.cover}
                            alt=""
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 
                            className="text-base md:text-lg font-semibold cursor-pointer hover:opacity-80 transition-opacity truncate"
                            style={{ color: getThemeColor() }}
                            onClick={() => navigate(`/player/${encodeURIComponent(item.title)}`)}
                          >
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-2">
                            <Button 
                              size="sm" 
                              className="h-8 w-8 md:h-10 md:w-10 rounded-full p-0"
                              style={{ backgroundColor: getThemeColor() }}
                              onClick={() => navigate(`/player/${encodeURIComponent(item.title)}`)}
                            >
                              <Play className="h-4 w-4 md:h-5 md:w-5" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 md:h-10 md:w-10 rounded-full p-0 hover:bg-white/10"
                            >
                              <Heart 
                                className={`h-4 w-4 md:h-5 md:w-5 ${item.isLiked ? 'fill-current' : ''}`}
                                style={{ color: getThemeColor() }}
                              />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 md:h-10 md:w-10 rounded-full p-0 hover:bg-white/10"
                              onClick={() => setShowTokens(item.id)}
                            >
                              <Gift 
                                className="h-4 w-4 md:h-5 md:w-5"
                                style={{ color: getThemeColor() }}
                              />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {item.type === 'artwork' && (
                      <div className="space-y-4">
                        <div className="aspect-video w-full rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 
                            className="text-base md:text-lg font-semibold cursor-pointer hover:opacity-80 transition-opacity"
                            style={{ color: getThemeColor() }}
                          >
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 md:h-10 md:w-10 rounded-full p-0 hover:bg-white/10"
                            >
                              <Heart 
                                className={`h-4 w-4 md:h-5 md:w-5 ${item.isLiked ? 'fill-current' : ''}`}
                                style={{ color: getThemeColor() }}
                              />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 md:h-10 md:w-10 rounded-full p-0 hover:bg-white/10"
                              onClick={() => setShowTokens(item.id)}
                            >
                              <Gift 
                                className="h-4 w-4 md:h-5 md:w-5"
                                style={{ color: getThemeColor() }}
                              />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {item.type === 'text' && (
                      <div className="space-y-4">
                        <h3 
                          className="text-base md:text-lg font-semibold"
                          style={{ color: getThemeColor() }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-gray-300 break-words whitespace-pre-wrap">
                          {item.content}
                        </p>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 md:h-10 md:w-10 rounded-full p-0 hover:bg-white/10"
                          >
                            <Heart 
                              className={`h-4 w-4 md:h-5 md:w-5 ${item.isLiked ? 'fill-current' : ''}`}
                              style={{ color: getThemeColor() }}
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 md:h-10 md:w-10 rounded-full p-0 hover:bg-white/10"
                            onClick={() => setShowTokens(item.id)}
                          >
                            <Gift 
                              className="h-4 w-4 md:h-5 md:w-5"
                              style={{ color: getThemeColor() }}
                            />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Token Gift */}
                    {showTokens === item.id && (
                      <div className="mt-4">
                        <TokenGift 
                          onSendTokens={(amount, message) => handleSendTokens(item.id, amount, message)}
                          themeColor={getThemeColor()}
                        />
                      </div>
                    )}

                    {/* Live Activity */}
                    <LiveActivity
                      activities={activities}
                      title="Recent Activity"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommendations - Right Side */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <Recommendations />
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}