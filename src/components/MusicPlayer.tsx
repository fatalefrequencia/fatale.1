import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MoreHorizontal, Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import { Button } from './ui/button'
import { Slider } from './ui/slider'

export function MusicPlayer() {
  const navigate = useNavigate()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [error, setError] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            setError(true)
          })
        }
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleError = () => {
    setError(true)
    setIsPlaying(false)
  }

  return (
    <div className="fixed bottom-[4.5rem] md:bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/90 px-2 py-2 md:p-4 backdrop-blur-lg">
      <div className="container mx-auto flex items-center gap-2 md:gap-4">
        <audio
          ref={audioRef}
          src="/death-waltz.mp3"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          onError={handleError}
        />
        <div className="flex items-center gap-1 md:gap-2">
          <Button size="icon" variant="ghost" className="w-8 h-8 md:w-10 md:h-10 hover:bg-white/5">
            <SkipBack className="h-3 w-3 md:h-4 md:w-4" />
            <span className="sr-only">Previous track</span>
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="w-8 h-8 md:w-10 md:h-10 hover:bg-white/5" 
            onClick={togglePlay}
            disabled={error}
          >
            {isPlaying ? (
              <Pause className="h-3 w-3 md:h-4 md:w-4" />
            ) : (
              <Play className="h-3 w-3 md:h-4 md:w-4" />
            )}
            <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
          </Button>
          <Button size="icon" variant="ghost" className="w-8 h-8 md:w-10 md:h-10 hover:bg-white/5">
            <SkipForward className="h-3 w-3 md:h-4 md:w-4" />
            <span className="sr-only">Next track</span>
          </Button>
        </div>
        <div className="flex-1 hidden md:block">
          <Slider
            value={[currentTime]}
            max={audioRef.current?.duration || 100}
            step={1}
            onValueChange={handleSliderChange}
            className="w-full"
            disabled={error}
          />
        </div>
        <div 
          className="text-center flex-1 text-xs md:text-sm text-red-400 cursor-pointer hover:text-red-300 truncate"
          onClick={() => navigate('/player/death-waltz')}
        >
          {error ? (
            <span>Audio file not available</span>
          ) : (
            <span>Now Playing: Death Waltz - Adam S. Hurst</span>
          )}
        </div>
        <Button size="icon" variant="ghost" className="w-8 h-8 md:w-10 md:h-10 hover:bg-white/5">
          <MoreHorizontal className="h-3 w-3 md:h-4 md:w-4" />
          <span className="sr-only">More options</span>
        </Button>
      </div>
    </div>
  )
}
