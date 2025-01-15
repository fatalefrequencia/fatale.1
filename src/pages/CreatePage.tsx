import { useNavigate } from 'react-router-dom'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Music, Image, FileText, Video } from 'lucide-react'

export default function CreatePage() {
  const navigate = useNavigate()

  const createOptions = [
    { title: 'Upload Music', icon: <Music className="h-12 w-12" />, description: 'Share your dark melodies', path: '/upload' },
    { title: 'Share Artwork', icon: <Image className="h-12 w-12" />, description: 'Showcase your gothic creations', path: '/upload' },
    { title: 'Write Post', icon: <FileText className="h-12 w-12" />, description: 'Express your thoughts', path: '/upload' },
    { title: 'Upload Video', icon: <Video className="h-12 w-12" />, description: 'Share your visual stories', path: '/upload' },
  ]

  return (
    <ScrollArea className="h-[calc(100vh-8rem)] px-4">
      <div className="max-w-2xl mx-auto pt-8">
        <h1 className="text-2xl font-bold text-center mb-8">Create</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {createOptions.map((option, i) => (
            <Card 
              key={i} 
              className="bg-red-950/20 border-red-900/20 hover:bg-red-900/30 transition-colors cursor-pointer"
              onClick={() => navigate(option.path)}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="text-red-500 mb-4">{option.icon}</div>
                <h2 className="text-lg font-semibold text-red-300 mb-2">{option.title}</h2>
                <p className="text-sm text-red-700">{option.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}