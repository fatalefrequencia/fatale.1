import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from "@/components/ui/card"
import { Music, Radio } from 'lucide-react'

export function Recommendations() {
  const navigate = useNavigate()
  
  const recommendations = [
    { type: 'playlist', name: 'Dark Ambient', info: '45 tracks', icon: <Music className="h-6 w-6 md:h-8 md:w-8 mb-2" /> },
    { type: 'radio', name: 'Ethereal Echoes', info: '2.4K listening', icon: <Radio className="h-6 w-6 md:h-8 md:w-8 mb-2" /> },
    { type: 'playlist', name: 'Gothic Metal', info: '32 tracks', icon: <Music className="h-6 w-6 md:h-8 md:w-8 mb-2" /> },
    { type: 'radio', name: 'Neon Nights', info: '1.8K listening', icon: <Radio className="h-6 w-6 md:h-8 md:w-8 mb-2" /> }
  ]

  return (
    <Card className="bg-red-950/20 border-red-900/20">
      <CardContent className="p-4">
        <h2 className="text-base md:text-lg font-semibold mb-4 text-red-300">Recommended</h2>
        <div className="space-y-3">
          {recommendations.map((item, i) => (
            <Card 
              key={i} 
              className="bg-black/30 border-red-900/20 hover:bg-red-900/30 transition-colors cursor-pointer"
              onClick={() => item.type === 'radio' ? navigate('/radio') : navigate(`/player/${encodeURIComponent(item.name)}`)}
            >
              <CardContent className="p-3 flex items-center gap-3">
                <div className="bg-black/20 p-2 rounded-lg">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm md:text-base font-medium text-red-300 truncate">{item.name}</h3>
                  <p className="text-xs md:text-sm text-red-700">{item.info}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}