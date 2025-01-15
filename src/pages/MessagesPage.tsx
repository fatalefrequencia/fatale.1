import { useState, useRef, useEffect } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Send, Smile, ArrowLeft } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
  avatar: string
}

interface Chat {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: Date
  unread: number
}

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [showEmoji, setShowEmoji] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const messageInputRef = useRef<HTMLInputElement>(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  // Mock data
  const chats: Chat[] = [
    {
      id: '1',
      name: 'Dark Soul',
      avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png',
      lastMessage: 'Hey, check out this new track!',
      timestamp: new Date(),
      unread: 2,
    },
    {
      id: '2',
      name: 'Night Walker',
      avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png',
      lastMessage: 'Amazing artwork! 🖤',
      timestamp: new Date(Date.now() - 3600000),
      unread: 0,
    },
    {
      id: '3',
      name: 'Shadow Weaver',
      avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png',
      lastMessage: 'When is your next release?',
      timestamp: new Date(Date.now() - 7200000),
      unread: 1,
    },
  ]

  const messages: Message[] = [
    {
      id: '1',
      sender: 'Dark Soul',
      content: 'Hey, check out this new track!',
      timestamp: new Date(),
      avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png',
    },
    {
      id: '2',
      sender: 'me',
      content: "Thanks! I'll take a look",
      timestamp: new Date(Date.now() - 300000),
      avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png',
    },
  ]

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (selectedChat && messageInputRef.current) {
      messageInputRef.current.focus()
    }
  }, [selectedChat])

  const handleSend = () => {
    if (message.trim()) {
      // Add message handling logic here
      setMessage('')
      setShowEmoji(false)
      scrollToBottom()
    }
  }

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId)
    if (isMobile) {
      document.body.style.overflow = 'hidden'
    }
  }

  const handleBack = () => {
    setSelectedChat(null)
    document.body.style.overflow = ''
  }

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (days === 1) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex">
      {/* Chat List */}
      <div className={`w-full md:w-80 border-r border-red-900/20 ${
        isMobile && selectedChat ? 'hidden' : 'block'
      }`}>
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-700" />
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-red-900/20 border border-red-900/20 rounded-lg pl-10 pr-4 py-2 text-red-300 focus:outline-none focus:border-red-500"
            />
          </div>

          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="space-y-2">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all active:scale-98 ${
                    selectedChat === chat.id
                      ? 'bg-red-500/20'
                      : 'hover:bg-red-900/20'
                  }`}
                  onClick={() => handleChatSelect(chat.id)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={chat.avatar} />
                      <AvatarFallback>{chat.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-red-300 truncate">
                          {chat.name}
                        </h3>
                        <span className="text-xs text-red-700 whitespace-nowrap ml-2">
                          {formatTime(chat.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-red-700 truncate">
                        {chat.lastMessage}
                      </p>
                    </div>
                    {chat.unread > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[1.5rem] text-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col ${
        isMobile && !selectedChat ? 'hidden' : 'block'
      }`}>
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-red-900/20 bg-black/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                {isMobile && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBack}
                    className="md:hidden -ml-2"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                )}
                <Avatar>
                  <AvatarImage src={chats.find(c => c.id === selectedChat)?.avatar} />
                  <AvatarFallback>
                    {chats.find(c => c.id === selectedChat)?.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-medium text-red-300">
                    {chats.find(c => c.id === selectedChat)?.name}
                  </h2>
                  <p className="text-sm text-red-700">Online</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${
                      msg.sender === 'me' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <Avatar className="mt-1">
                      <AvatarImage src={msg.avatar} />
                      <AvatarFallback>{msg.sender[0]}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`max-w-[70%] p-3 rounded-2xl ${
                        msg.sender === 'me'
                          ? 'bg-red-500 text-white rounded-tr-none'
                          : 'bg-red-900/20 text-red-300 rounded-tl-none'
                      }`}
                    >
                      <p className="break-words">{msg.content}</p>
                      <span className="text-xs opacity-75 mt-1 block">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-red-900/20 bg-black/50 backdrop-blur-sm">
              <div className="relative flex items-end gap-2">
                <div className="relative flex-1">
                  <input
                    ref={messageInputRef}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    className="w-full bg-red-900/20 border border-red-900/20 rounded-full pr-12 pl-4 py-2 text-red-300 focus:outline-none focus:border-red-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowEmoji(!showEmoji)}
                    className="absolute right-2 bottom-1/2 transform translate-y-1/2 hover:bg-red-500/20"
                  >
                    <Smile className="h-5 w-5" />
                  </Button>
                </div>
                <Button
                  type="button"
                  size="icon"
                  onClick={handleSend}
                  className="bg-red-500 hover:bg-red-600 rounded-full h-10 w-10 flex-shrink-0"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              {showEmoji && (
                <div className="absolute bottom-full right-0 mb-2">
                  <Card className="border-red-900/20">
                    <CardContent className="p-0">
                      <EmojiPicker
                        onEmojiClick={(emojiData) => {
                          setMessage(prev => prev + emojiData.emoji)
                          messageInputRef.current?.focus()
                        }}
                        width={isMobile ? 300 : 350}
                        height={400}
                      />
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-red-700">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  )
}