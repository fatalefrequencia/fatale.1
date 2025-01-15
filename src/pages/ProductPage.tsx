import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Share2, ShoppingCart, MessageCircle } from 'lucide-react'
import { CommentSection } from '@/components/CommentSection'
import { LiveActivity } from '@/components/LiveActivity'
import { TokenGift } from '@/components/TokenGift'

export default function ProductPage() {
  const { id } = useParams()
  const [isLiked, setIsLiked] = useState(false)
  const [activities, setActivities] = useState([
    {
      id: '1',
      type: 'token' as const,
      user: {
        name: 'Dark Soul',
        avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png'
      },
      details: {
        tokens: 100,
        message: 'Beautiful piece! 🖤'
      },
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'purchase' as const,
      user: {
        name: 'Night Walker',
        avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png'
      },
      details: {
        price: '$45.00'
      },
      timestamp: new Date()
    }
  ])

  // Mock data - replace with real API calls
  const product = {
    title: "Gothic Pendant",
    price: "$45.00",
    seller: "Dark Artifacts",
    description: "Handcrafted gothic pendant with intricate details. Perfect for any dark aesthetic enthusiast.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png"
    ]
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
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-red-950/20 border-red-900/20">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Product Images */}
                  <div className="space-y-4">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <div className="grid grid-cols-4 gap-2">
                      {product.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${product.title} ${index + 1}`}
                          className="w-full aspect-square object-cover rounded-lg cursor-pointer hover:opacity-80"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-2xl font-bold text-red-300 mb-2">{product.title}</h1>
                      <p className="text-xl text-red-500 mb-4">{product.price}</p>
                      <p className="text-sm text-red-700 mb-4">By {product.seller}</p>
                      <p className="text-red-300">{product.description}</p>
                    </div>

                    <div className="space-y-4">
                      <Button className="w-full bg-red-500 hover:bg-red-600">
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Add to Cart
                      </Button>

                      <div className="flex gap-4">
                        <Button
                          variant="ghost"
                          className="flex-1 hover:bg-red-500/20"
                          onClick={() => setIsLiked(!isLiked)}
                        >
                          <Heart className={`h-5 w-5 mr-2 ${isLiked ? 'fill-red-500' : ''}`} />
                          {isLiked ? 'Liked' : 'Like'}
                        </Button>
                        <Button variant="ghost" className="flex-1 hover:bg-red-500/20">
                          <Share2 className="h-5 w-5 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>

                    <CommentSection
                      comments={[]}
                      accentColor="#ef4444"
                      onComment={() => {}}
                      onGift={() => {}}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Token Gift */}
            <div className="mt-6">
              <TokenGift onSendTokens={handleSendTokens} />
            </div>
          </div>

          {/* Live Activity */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <LiveActivity 
                activities={activities}
                title="Product Activity"
              />
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}