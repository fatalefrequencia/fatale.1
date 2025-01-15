import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Gift, Send } from 'lucide-react'

interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  gifts?: { type: string; amount: number }[]
}

interface CommentSectionProps {
  comments: Comment[]
  accentColor: string
  onComment: (content: string) => void
  onGift: (type: string) => void
}

export function CommentSection({ comments, accentColor, onComment, onGift }: CommentSectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [showGiftMenu, setShowGiftMenu] = useState(false)

  const giftTypes = [
    { type: '💎', name: 'Diamond', value: 100 },
    { type: '🌟', name: 'Star', value: 50 },
    { type: '❤️', name: 'Heart', value: 25 },
  ]

  return (
    <div className="mt-4">
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 mb-4"
        onClick={() => setIsOpen(!isOpen)}
        style={{ color: accentColor }}
      >
        <MessageCircle className="h-4 w-4" />
        {comments.length} Comments
      </Button>

      {isOpen && (
        <Card className="bg-black/50 backdrop-blur-sm border-none">
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* Comment Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 bg-black/30 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1"
                  style={{ borderColor: accentColor }}
                />
                <Button
                  size="icon"
                  className="rounded-full"
                  onClick={() => setShowGiftMenu(!showGiftMenu)}
                  style={{ backgroundColor: accentColor }}
                >
                  <Gift className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  className="rounded-full"
                  onClick={() => {
                    if (newComment.trim()) {
                      onComment(newComment)
                      setNewComment('')
                    }
                  }}
                  style={{ backgroundColor: accentColor }}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* Gift Menu */}
              {showGiftMenu && (
                <div className="flex gap-2 p-2 bg-black/30 rounded-lg">
                  {giftTypes.map((gift) => (
                    <Button
                      key={gift.type}
                      variant="ghost"
                      className="flex-1 gap-2 hover:bg-white/10"
                      onClick={() => {
                        onGift(gift.type)
                        setShowGiftMenu(false)
                      }}
                    >
                      <span className="text-xl">{gift.type}</span>
                      <span className="text-sm">{gift.value}</span>
                    </Button>
                  ))}
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.avatar} />
                      <AvatarFallback>{comment.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className="text-xs text-gray-400">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm mt-1">{comment.content}</p>
                      {comment.gifts && (
                        <div className="flex gap-1 mt-2">
                          {comment.gifts.map((gift, index) => (
                            <div key={index} className="flex items-center gap-1 text-sm">
                              <span>{gift.type}</span>
                              <span className="text-xs">×{gift.amount}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}