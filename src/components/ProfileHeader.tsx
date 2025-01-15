import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Settings, Edit, Mail, Link2, UserPlus, UserCheck, LayoutDashboard } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface ProfileHeaderProps {
  accentColor: string
  avatar: string
  onSettingsClick: () => void
  onEditClick: () => void
}

export function ProfileHeader({ accentColor, avatar, onSettingsClick, onEditClick }: ProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(false)
  const navigate = useNavigate()

  const handleContact = () => {
    window.location.href = "mailto:darkartist@example.com"
  }

  const handleLink = () => {
    window.open('https://darkartist.example.com', '_blank')
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <div className="relative px-4 py-8 md:py-12 backdrop-blur-sm bg-black/40 rounded-b-3xl">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
          <Avatar className="w-24 h-24 md:w-32 md:h-32 ring-2 ring-offset-2 ring-offset-black/50" style={{ ringColor: accentColor }}>
            <AvatarImage src={avatar} />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: accentColor }}>Dark Artist</h1>
            <p className="text-gray-400 mb-4">@darkartist</p>
            
            <div className="flex justify-center md:justify-start items-center gap-3 mb-4">
              <Button
                variant={isFollowing ? "ghost" : "default"}
                size="sm"
                onClick={handleFollow}
                className={`flex items-center gap-2 ${
                  isFollowing ? 'bg-black/50 hover:bg-black/70' : ''
                } backdrop-blur-sm`}
                style={{ color: isFollowing ? accentColor : undefined }}
              >
                {isFollowing ? (
                  <>
                    <UserCheck className="h-4 w-4" />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    Follow
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleContact}
                className="bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center gap-2"
                style={{ color: accentColor }}
              >
                <Mail className="h-4 w-4" />
                Contact
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLink}
                className="bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center gap-2"
                style={{ color: accentColor }}
              >
                <Link2 className="h-4 w-4" />
                Links
              </Button>
            </div>

            <div className="max-w-lg">
              <p className="text-sm text-gray-300 leading-relaxed">
                Digital artist exploring the depths of darkness through visual and auditory experiences. 
                Specializing in gothic aesthetics, dark ambient soundscapes, and ethereal compositions.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs px-2 py-1 rounded-full bg-black/30 text-gray-400">Digital Art</span>
                <span className="text-xs px-2 py-1 rounded-full bg-black/30 text-gray-400">Dark Ambient</span>
                <span className="text-xs px-2 py-1 rounded-full bg-black/30 text-gray-400">Gothic</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 md:self-start">
            <Button 
              variant="ghost" 
              size="icon"
              className="bg-black/50 hover:bg-black/70 backdrop-blur-sm"
              onClick={() => navigate('/profile/dashboard')}
            >
              <LayoutDashboard className="h-4 w-4" style={{ color: accentColor }} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="bg-black/50 hover:bg-black/70 backdrop-blur-sm"
              onClick={onSettingsClick}
            >
              <Settings className="h-4 w-4" style={{ color: accentColor }} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="bg-black/50 hover:bg-black/70 backdrop-blur-sm"
              onClick={onEditClick}
            >
              <Edit className="h-4 w-4" style={{ color: accentColor }} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}