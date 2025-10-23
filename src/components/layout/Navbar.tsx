import { Music, Plus, Settings } from 'lucide-react'
import { Button } from '../ui/Button'

interface NavbarProps {
  onAddMemory: () => void
  isMusicPlaying: boolean
  onToggleMusic: () => void
  onMusicSettings: () => void
  onNavigateToHome: () => void
  onNavigateToMovies: () => void
  onNavigateToShorts: () => void
}

export const Navbar = ({ 
  onAddMemory, 
  isMusicPlaying, 
  onToggleMusic, 
  onMusicSettings,
  onNavigateToHome,
  onNavigateToMovies,
  onNavigateToShorts
}: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent px-8 py-4 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-red-600 text-3xl font-bold">NETFLIX</h1>
          
          <div className="hidden md:flex gap-6 text-gray-300">
            <button 
              onClick={onNavigateToHome}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <button 
              onClick={onNavigateToMovies}
              className="hover:text-white transition-colors"
            >
              Movies
            </button>
            <button 
              onClick={onNavigateToShorts}
              className="hover:text-white transition-colors"
            >
              Shorts
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleMusic}
            className="text-white hover:text-red-400"
          >
            <Music className={`h-5 w-5 ${isMusicPlaying ? 'text-red-500' : ''}`} />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onMusicSettings}
            className="text-white hover:text-red-400"
          >
            <Settings className="h-5 w-5" />
          </Button>
          
          <Button
            onClick={onAddMemory}
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            <span className="hidden sm:inline">Add Memory</span>
          </Button>
        </div>
      </div>
    </nav>
  )
}