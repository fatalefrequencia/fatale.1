import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Settings, Edit, Upload, Palette } from 'lucide-react'

interface ProfileSettingsProps {
  onBackgroundChange: (file: File) => void
  onColorChange: (color: string) => void
  onAvatarChange: (file: File) => void
  accentColor: string
}

export function ProfileSettings({ 
  onBackgroundChange, 
  onColorChange, 
  onAvatarChange,
  accentColor 
}: ProfileSettingsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const avatarInputRef = useRef<HTMLInputElement>(null)
  const backgroundInputRef = useRef<HTMLInputElement>(null)
  const colorInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    handler: (file: File) => void
  ) => {
    const file = event.target.files?.[0]
    if (file) handler(file)
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        variant="ghost"
        size="icon"
        className="bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full"
        onClick={() => setIsOpen(!isOpen)}
        style={{ color: accentColor }}
      >
        <Settings className="h-5 w-5" />
      </Button>

      {isOpen && (
        <Card className="absolute top-12 right-0 w-64 bg-black/90 backdrop-blur-sm border-none">
          <CardContent className="p-4">
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 hover:bg-white/10"
                style={{ color: accentColor }}
                onClick={() => avatarInputRef.current?.click()}
              >
                <Edit className="h-4 w-4" />
                Change Avatar
              </Button>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, onAvatarChange)}
              />

              <Button
                variant="ghost"
                className="w-full justify-start gap-2 hover:bg-white/10"
                style={{ color: accentColor }}
                onClick={() => backgroundInputRef.current?.click()}
              >
                <Upload className="h-4 w-4" />
                Change Background
              </Button>
              <input
                ref={backgroundInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, onBackgroundChange)}
              />

              <Button
                variant="ghost"
                className="w-full justify-start gap-2 hover:bg-white/10"
                style={{ color: accentColor }}
                onClick={() => colorInputRef.current?.click()}
              >
                <Palette className="h-4 w-4" />
                Change Theme Color
              </Button>
              <input
                ref={colorInputRef}
                type="color"
                className="hidden"
                onChange={(e) => onColorChange(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}