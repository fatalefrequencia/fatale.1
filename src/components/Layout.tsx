import { Outlet } from 'react-router-dom'
import { Navigation } from './Navigation'
import { MusicPlayer } from './MusicPlayer'

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="flex-1 flex overflow-hidden pb-[4.5rem] md:pb-0">
        <main className="flex-1 relative">
          <Navigation />
          <div className="h-full overflow-y-auto">
            <Outlet />
          </div>
        </main>
      </div>
      <MusicPlayer />
    </div>
  )
}