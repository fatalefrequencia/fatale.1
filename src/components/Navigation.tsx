import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Search, PlusCircle, User, ShoppingBag, MessageCircle } from 'lucide-react'
import { Button } from './ui/button'

export function Navigation() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="fixed bottom-0 left-0 right-0 md:relative md:bottom-auto z-50 bg-black/80 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none border-t border-red-900/20 md:border-none">
      <div className="flex justify-around md:justify-center gap-1 md:gap-4 p-2 md:p-4">
        <Button
          variant="ghost"
          size="icon"
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-sm ${
            isActive('/home') ? 'bg-red-500/30 hover:bg-red-500/50' : 'bg-red-950/30 hover:bg-red-900/50'
          }`}
          onClick={() => navigate('/home')}
        >
          <Home className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-sm ${
            isActive('/create') ? 'bg-red-500/30 hover:bg-red-500/50' : 'bg-red-950/30 hover:bg-red-900/50'
          }`}
          onClick={() => navigate('/create')}
        >
          <PlusCircle className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-sm ${
            isActive('/search') ? 'bg-red-500/30 hover:bg-red-500/50' : 'bg-red-950/30 hover:bg-red-900/50'
          }`}
          onClick={() => navigate('/search')}
        >
          <Search className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-sm ${
            isActive('/marketplace') ? 'bg-red-500/30 hover:bg-red-500/50' : 'bg-red-950/30 hover:bg-red-900/50'
          }`}
          onClick={() => navigate('/marketplace')}
        >
          <ShoppingBag className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-sm ${
            isActive('/messages') ? 'bg-red-500/30 hover:bg-red-500/50' : 'bg-red-950/30 hover:bg-red-900/50'
          }`}
          onClick={() => navigate('/messages')}
        >
          <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-sm ${
            isActive('/profile') ? 'bg-red-500/30 hover:bg-red-500/50' : 'bg-red-950/30 hover:bg-red-900/50'
          }`}
          onClick={() => navigate('/profile')}
        >
          <User className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>
    </div>
  )
}