import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, MessageCircle, Heart, Clock, DollarSign } from 'lucide-react'

interface LiveActivity {
  id: string
  type: 'purchase' | 'bid' | 'comment' | 'like'
  user: {
    name: string
    avatar: string
  }
  shop?: {
    name: string
    avatar: string
  }
  item: {
    title: string
    image: string
  }
  timestamp: Date
  details?: {
    price?: string
    comment?: string
    bid?: string
  }
}

export default function MarketplacePage() {
  const navigate = useNavigate()
  const [liveActivities, setLiveActivities] = useState<LiveActivity[]>([])
  
  const shops = [
    { name: 'Gothic Emporium', avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png' },
    { name: 'Dark Artifacts', avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png' },
    { name: 'Nocturnal Treasures', avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png' },
  ]

  const items = [
    { 
      id: '1',
      title: 'Gothic Pendant', 
      price: '$45', 
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png' 
    },
    { 
      id: '2',
      title: 'Dark Art Print', 
      price: '$30', 
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans%20bg%20-0CXd6tHJj9LLQMmPvqU92AqOdJYjM5.png' 
    },
    { 
      id: '3',
      title: 'Vinyl Record', 
      price: '$25', 
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png' 
    },
  ]

  // Simulate real-time updates
  useEffect(() => {
    const activities: LiveActivity[] = [
      {
        id: '1',
        type: 'purchase',
        user: { name: 'Shadow Walker', avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png' },
        shop: shops[0],
        item: { title: 'Gothic Pendant', image: items[0].image },
        timestamp: new Date(),
        details: { price: '$45' }
      },
      {
        id: '2',
        type: 'bid',
        user: { name: 'Night Prowler', avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png' },
        shop: shops[1],
        item: { title: 'Dark Art Print', image: items[1].image },
        timestamp: new Date(),
        details: { bid: '$35' }
      },
      {
        id: '3',
        type: 'comment',
        user: { name: 'Raven Spirit', avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png' },
        item: { title: 'Vinyl Record', image: items[2].image },
        timestamp: new Date(),
        details: { comment: 'This is absolutely stunning! 🖤' }
      }
    ]

    setLiveActivities(activities)

    // Simulate new activities coming in
    const interval = setInterval(() => {
      const newActivity: LiveActivity = {
        id: Date.now().toString(),
        type: ['purchase', 'bid', 'comment', 'like'][Math.floor(Math.random() * 4)] as LiveActivity['type'],
        user: {
          name: ['Dark Soul', 'Midnight Wanderer', 'Gothic Dream', 'Shadow Weaver'][Math.floor(Math.random() * 4)],
          avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png'
        },
        shop: shops[Math.floor(Math.random() * shops.length)],
        item: items[Math.floor(Math.random() * items.length)],
        timestamp: new Date(),
        details: {
          price: '$' + (Math.floor(Math.random() * 50) + 20),
          comment: 'Amazing piece! 🖤',
          bid: '$' + (Math.floor(Math.random() * 50) + 20)
        }
      }

      setLiveActivities(prev => [newActivity, ...prev.slice(0, 4)])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getActivityIcon = (type: LiveActivity['type']) => {
    switch (type) {
      case 'purchase':
        return <ShoppingBag className="h-4 w-4 text-green-500" />
      case 'bid':
        return <DollarSign className="h-4 w-4 text-yellow-500" />
      case 'comment':
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case 'like':
        return <Heart className="h-4 w-4 text-red-500" />
    }
  }

  const getActivityText = (activity: LiveActivity) => {
    switch (activity.type) {
      case 'purchase':
        return `sold ${activity.item.title} for ${activity.details?.price}`
      case 'bid':
        return `received a bid of ${activity.details?.bid} on ${activity.item.title}`
      case 'comment':
        return `commented on ${activity.item.title}: "${activity.details?.comment}"`
      case 'like':
        return `liked ${activity.item.title}`
    }
  }

  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4">
        <div className="lg:col-span-3">
          <h1 className="text-2xl font-bold mb-8">Marketplace</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <Card 
                key={i} 
                className="bg-red-950/20 border-red-900/20 hover:bg-red-900/30 transition-colors cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <CardContent className="p-4">
                  <img src={item.image} alt={item.title} className="w-full aspect-square object-cover rounded-lg mb-4" />
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-red-300 font-semibold">{item.title}</h3>
                      <p className="text-red-700">{item.price}</p>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-red-500 hover:bg-red-600"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/product/${item.id}`)
                      }}
                    >
                      Buy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Live Activity */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <Card className="bg-red-950/20 border-red-900/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-4 w-4 text-red-500" />
                  <h2 className="text-lg font-semibold text-red-300">Live Activity</h2>
                </div>
                <div className="space-y-4">
                  {liveActivities.map((activity) => (
                    <div key={activity.id}>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src={(activity.type === 'purchase' || activity.type === 'bid') 
                              ? activity.shop?.avatar 
                              : activity.user.avatar} 
                            alt={(activity.type === 'purchase' || activity.type === 'bid')
                              ? activity.shop?.name
                              : activity.user.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm text-red-300">
                              {(activity.type === 'purchase' || activity.type === 'bid')
                                ? activity.shop?.name
                                : activity.user.name}
                            </span>
                            {getActivityIcon(activity.type)}
                          </div>
                          <p className="text-sm text-red-700 mt-1">{getActivityText(activity)}</p>
                          <p className="text-xs text-red-900 mt-1">
                            {new Date(activity.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4 last:hidden" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}