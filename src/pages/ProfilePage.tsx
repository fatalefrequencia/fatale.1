import { useState, useRef } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { ProfileHeader } from '@/components/ProfileHeader'
import { ContentFilters } from '@/components/ContentFilters'
import { ContentCard } from '@/components/ContentCard'

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

export default function ProfilePage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [accentColor, setAccentColor] = useState('#ef4444')
  const [avatar, setAvatar] = useState('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png')

  const filteredContent = selectedType 
    ? contentItems.filter(item => item.type === selectedType)
    : contentItems

  const handleBackgroundChange = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setBackgroundImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleAvatarChange = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setAvatar(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div 
        className="min-h-screen bg-black"
        style={{
          backgroundImage: backgroundImage 
            ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`
            : 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans%20bg%20-0CXd6tHJj9LLQMmPvqU92AqOdJYjM5.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <ProfileHeader 
          accentColor={accentColor}
          avatar={avatar}
          onSettingsClick={() => {}}
          onEditClick={() => {}}
        />

        <ContentFilters 
          selectedType={selectedType}
          onTypeSelect={setSelectedType}
          accentColor={accentColor}
        />

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item) => (
              <ContentCard key={item.id} item={item} accentColor={accentColor} />
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}