import { Mail } from 'lucide-react'
import { Button } from './ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 py-3 px-6 flex justify-between items-center bg-black/90 backdrop-blur-sm">
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-SkfSYNrdrlVEPaA3n5o0z1COGv6JZh.png"
        alt="Fatale.fm Logo"
        className="h-8 w-8"
      />
      <Button size="icon" variant="ghost" className="hover:bg-white/5">
        <Mail className="h-5 w-5 text-red-500" />
        <span className="sr-only">Contact</span>
      </Button>
    </header>
  )
}