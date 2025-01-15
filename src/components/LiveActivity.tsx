import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Clock, 
  ShoppingBag, 
  MessageCircle, 
  Heart, 
  DollarSign, 
  Gift, 
  UserPlus,
  Send,
  Smile
} from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'

interface Activity {
  id: string
  type: 'purchase' | 'bid' | 'comment' | 'like' | 'token' | 'follow'
  user: {
    name: string
    avatar: string
  }
  details?: {
    price?: string
    comment?: string
    bid?: string
    tokens?: number
    message?: string
  }
  timestamp: Date
  comments?: {
    id: string
    user: string
    avatar: string
    content: string
    timestamp: Date
  }[]
}

interface LiveActivityProps {
  activities: Activity[]
  title?: string
}

export function LiveActivity({ activities: initialActivities, title = "Live Activity" }: LiveActivityProps) {
  const [activities, setActivities] = useState(initialActivities)
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null)
  const [showCommentInput, setShowCommentInput] = useState(false)
  const [comment, setComment] = useState('')
  const [showEmoji, setShowEmoji] = useState(false)

  useEffect(() => {
    if (activities.length > 0) {
      setCurrentActivity(activities[0])
    }
  }, [activities])

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = {
        id: Date.now().toString(),
        type: ['like', 'comment', 'token', 'follow'][Math.floor(Math.random() * 4)] as Activity['type'],
        user: {
          name: ['Dark Soul', 'Night Walker', 'Shadow Weaver', 'Gothic Dream'][Math.floor(Math.random() * 4)],
          avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png'
        },
        timestamp: new Date(),
        details: {
          comment: 'Amazing! 🖤',
          tokens: Math.floor(Math.random() * 100) + 1,
          message: 'Keep creating! 🖤'
        },
        comments: []
      }

      setActivities(prev => [newActivity, ...prev])
      setCurrentActivity(newActivity)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'purchase':
        return <ShoppingBag className="h-4 w-4 text-green-500" />
      case 'bid':
        return <DollarSign className="h-4 w-4 text-yellow-500" />
      case 'comment':
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case 'like':
        return <Heart className="h-4 w-4 text-red-500" />
      case 'token':
        return <Gift className="h-4 w-4 text-purple-500" />
      case 'follow':
        return <UserPlus className="h-4 w-4 text-emerald-500" />
    }
  }

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'purchase':
        return `sold ${activity.details?.price}`
      case 'bid':
        return `bid ${activity.details?.bid}`
      case 'comment':
        return `commented: "${activity.details?.comment}"`
      case 'like':
        return 'liked this'
      case 'token':
        return `sent ${activity.details?.tokens} tokens${activity.details?.message ? ` - "${activity.details.message}"` : ''}`
      case 'follow':
        return 'started following'
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    if (seconds < 60) return 'just now'
    if (minutes < 60) return `${minutes}m ago`
    return `${hours}h ago`
  }

  const handleAddComment = () => {
    if (!comment.trim() || !currentActivity) return

    const newComment = {
      id: Date.now().toString(),
      user: 'You',
      avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png',
      content: comment.trim(),
      timestamp: new Date()
    }

    setActivities(prev => prev.map(activity => 
      activity.id === currentActivity.id
        ? {
            ...activity,
            comments: [...(activity.comments || []), newComment]
          }
        : activity
    ))

    setComment('')
    setShowEmoji(false)
  }

  return (
    <Card className="bg-red-950/20 border-red-900/20">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-4 w-4 text-red-500" />
          <h2 className="text-lg font-semibold text-red-300">{title}</h2>
        </div>

        {currentActivity && (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src={currentActivity.user.avatar} 
                  alt={currentActivity.user.name}
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-red-300">
                    {currentActivity.user.name}
                  </span>
                  {getActivityIcon(currentActivity.type)}
                </div>
                <p className="text-sm text-red-700 mt-1">{getActivityText(currentActivity)}</p>
                <p className="text-xs text-red-900 mt-1">
                  {formatTime(currentActivity.timestamp)}
                </p>

                {currentActivity.comments && currentActivity.comments.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {currentActivity.comments.map(comment => (
                      <div key={comment.id} className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src={comment.avatar} 
                            alt={comment.user}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="flex-1 min-w-0 bg-red-900/20 rounded-lg p-2">
                          <p className="text-xs font-medium text-red-300">{comment.user}</p>
                          <p className="text-xs text-red-700">{comment.content}</p>
                          <p className="text-xs text-red-900 mt-1">{formatTime(comment.timestamp)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-3">
                  {!showCommentInput ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs hover:bg-red-500/20 -ml-3"
                      onClick={() => setShowCommentInput(true)}
                    >
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Add comment
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Write a comment..."
                          className="w-full bg-red-900/20 border border-red-900/20 rounded-full px-3 py-1 text-xs text-red-300 focus:outline-none focus:border-red-500"
                          onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-5 w-5 hover:bg-red-500/20"
                          onClick={() => setShowEmoji(!showEmoji)}
                        >
                          <Smile className="h-3 w-3" />
                        </Button>
                        {showEmoji && (
                          <div className="absolute bottom-full right-0 mb-2">
                            <Card className="border-red-900/20">
                              <CardContent className="p-0">
                                <EmojiPicker
                                  onEmojiClick={(emojiData) => {
                                    setComment(prev => prev + emojiData.emoji)
                                  }}
                                  width={300}
                                  height={400}
                                />
                              </CardContent>
                            </Card>
                          </div>
                        )}
                      </div>
                      <Button
                        size="icon"
                        className="h-6 w-6 rounded-full bg-red-500 hover:bg-red-600"
                        onClick={handleAddComment}
                      >
                        <Send className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}