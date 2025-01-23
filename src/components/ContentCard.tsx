import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Share2, Music2, FileText } from 'lucide-react' // Added the missing FileText import
import { CommentSection } from './CommentSection'

interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  gifts?: { type: string; amount: number }[]
}

interface ContentCardProps {
  item: {
    id: string
    type: 'image' | 'text' | 'music'
    title: string
    description: string
    content: string
    size?: 'large' | 'medium' | 'small'
    likes: number
    comments: number
  }
  accentColor: string
}

export function ContentCard({ item, accentColor }: ContentCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [liked, setIsLiked] = useState(false)
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'Dark Soul',
      avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png',
      content: 'This is amazing! 🖤',
      timestamp: '2h ago',
      gifts: [{ type: '💎', amount: 2 }, { type: '❤️', amount: 5 }]
    }
  ])

  const handleNewComment = (content: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png',
      content,
      timestamp: 'Just now'
    }
    setComments(prev => [...prev, newComment])
  }

  const handleGift = (type: string) => {
    // Handle gift logic (optional functionality you can implement later)
  }

  return (
    <Card 
      className="group relative bg-black/50 border-none transform hover:scale-[1.02] hover:z-10 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4 md:p-6">
        {item.type === 'image' && (
          <div className="relative aspect-video mb-4 overflow-hidden rounded-xl">
            <img
              src={item.content}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
              transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
          </div>
        )}

        {item.type === 'text' && (
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-black/60 to-black/40 p-6">
            <FileText className="w-12 h-12 mb-4 transition-transform duration-300 group-hover:scale-110" 
              style={{ color: accentColor }} />
            <div className="relative z-10">
              <p className="text-gray-300 line-clamp-4">{item.content}</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/60 opacity-50" />
          </div>
        )}

        {item.type === 'music' && (
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-black/60 to-black/40 p-6">
            <Music2 className="w-12 h-12 mb-4 transition-transform duration-300 group-hover:scale-110" 
              style={{ color: accentColor }} />
            <audio 
              className="w-full mt-4 [&::-webkit-media-controls-panel]:bg-black/70 
                [&::-webkit-media-controls-current-time-display]:text-white 
                [&::-webkit-media-controls-time-remaining-display]:text-white"
              controls
            >
              <source src={item.content} type="audio/mpeg" />
            </audio>
          </div>
        )}

        <div className="mt-4">
          <h3 className="text-lg font-bold mb-1 transition-colors duration-300" 
            style={{ color: accentColor }}>{item.title}</h3>
          <p className="text-gray-400 text-sm mb-4">{item.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`rounded-full transition-colors duration-300 ${
                liked ? 'bg-red-500/20' : 'hover:bg-black/50'
              }`}
              onClick={() => setIsLiked(!liked)}
            >
   
