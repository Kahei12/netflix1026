import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Import components
import { Button } from './components/ui/Button'
import { Dialog, DialogContent, DialogHeader } from './components/ui/Dialog'
import { Input } from './components/ui/Input'
import { Label } from './components/ui/Label'
import { Navbar } from './components/layout/Navbar'
import { HeroBanner } from './components/memories/HeroBanner'
import { MemoryRow } from './components/memories/MemoryRow'

// Import types
import { Memory } from './types'

// Sample data
const sampleMemories: Memory[] = [
  {
    id: "1",
    title: "Sunset by the Beach",
    category: "First Dates",
    description: "The day we watched the sunset together and knew this was something special. The sky was painted in shades of pink and orange, just like our growing feelings.",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    mediaUrls: []
  },
  {
    id: "2",
    title: "Romantic Dinner Date",
    category: "First Dates", 
    description: "Our first candlelit dinner. The food was amazing, but nothing compared to the conversation and laughter we shared.",
    coverImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
    mediaUrls: []
  },
  {
    id: "3",
    title: "Mountain Adventure",
    category: "Travel Memories",
    description: "Conquering peaks together and discovering that the journey is always better with you by my side.",
    coverImage: "https://images.unsplash.com/photo-1464822759844-d62ea929ef21?w=800",
    mediaUrls: []
  },
  {
    id: "4",
    title: "Coffee Shop Mornings",
    category: "First Dates",
    description: "Lazy Sunday mornings at our favorite coffee shop, talking about everything and nothing.",
    coverImage: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800",
    mediaUrls: []
  },
  {
    id: "5",
    title: "City Lights",
    category: "Travel Memories",
    description: "Exploring the city at night, hand in hand, feeling like we owned the world.",
    coverImage: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800",
    mediaUrls: []
  }
]

export default function App() {
  // State management
  const [memories, setMemories] = useState<Memory[]>(sampleMemories)
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [isMusicSettingsOpen, setIsMusicSettingsOpen] = useState(false)
  const [musicUrl, setMusicUrl] = useState("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3")
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Load saved data
  useEffect(() => {
    const savedMemories = localStorage.getItem("memories")
    if (savedMemories) {
      try {
        setMemories(JSON.parse(savedMemories))
      } catch (e) {
        console.error("Error loading memories:", e)
      }
    }
    
    const savedMusicUrl = localStorage.getItem("musicUrl")
    if (savedMusicUrl) {
      setMusicUrl(savedMusicUrl)
    }
  }, [])

  // Save memories when they change
  useEffect(() => {
    localStorage.setItem("memories", JSON.stringify(memories))
  }, [memories])

  // Event handlers
  const handleMemoryClick = (memory: Memory) => {
    setSelectedMemory(memory)
    setIsModalOpen(true)
  }

  const handleAddMemory = (newMemory: Omit<Memory, "id">) => {
    const memory: Memory = {
      ...newMemory,
      id: Date.now().toString(),
    }
    setMemories([...memories, memory])
    setIsAddFormOpen(false)
  }

  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(musicUrl)
      audioRef.current.loop = true
      audioRef.current.volume = 0.3
    }

    if (isMusicPlaying) {
      audioRef.current.pause()
      setIsMusicPlaying(false)
    } else {
      audioRef.current.play().catch(console.error)
      setIsMusicPlaying(true)
    }
  }

  const handleSaveMusicUrl = (newUrl: string) => {
    setMusicUrl(newUrl)
    localStorage.setItem("musicUrl", newUrl)
    
    if (audioRef.current) {
      const wasPlaying = isMusicPlaying
      audioRef.current.pause()
      audioRef.current.src = newUrl
      if (wasPlaying) {
        audioRef.current.play().catch(console.error)
      }
    }
    setIsMusicSettingsOpen(false)
  }

  // Group memories by category
  const groupedMemories = {
    "First Dates": memories.filter((m) => m.category === "First Dates"),
    "Travel Memories": memories.filter((m) => m.category === "Travel Memories"),
    "Special Moments": memories.filter((m) => m.category === "Special Moments"),
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar
        onAddMemory={() => setIsAddFormOpen(true)}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={toggleMusic}
        onMusicSettings={() => setIsMusicSettingsOpen(true)}
      />

      <HeroBanner
        memories={memories}
        onViewDetails={handleMemoryClick}
      />

      <div className="relative mt-8 pb-16">
        {Object.entries(groupedMemories).map(([category, categoryMemories]) => (
          <MemoryRow
            key={category}
            title={category}
            memories={categoryMemories}
            onMemoryClick={handleMemoryClick}
          />
        ))}
      </div>

      {/* Memory Detail Modal */}
      <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 text-white p-0">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
            >
              <X className="h-6 w-6" />
            </Button>

            {selectedMemory && (
              <>
                <div className="relative w-full h-96">
                  <img
                    src={selectedMemory.coverImage}
                    alt={selectedMemory.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                </div>

                <div className="p-8">
                  <h2 className="text-white text-3xl font-bold mb-2">{selectedMemory.title}</h2>
                  <p className="text-red-500 text-lg mb-4">{selectedMemory.category}</p>
                  <p className="text-gray-300 text-lg mb-8">{selectedMemory.description}</p>

                  {selectedMemory.mediaUrls && selectedMemory.mediaUrls.length > 0 && (
                    <div>
                      <h3 className="text-white text-xl mb-4">Gallery</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedMemory.mediaUrls.map((url, index) => (
                          <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-gray-800">
                            <img
                              src={url}
                              alt={`${selectedMemory.title} - ${index + 1}`}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Memory Form */}
      <Dialog isOpen={isAddFormOpen} onClose={() => setIsAddFormOpen(false)}>
        <DialogContent className="max-w-2xl bg-gray-900 text-white">
          <DialogHeader>
            <h2 className="text-2xl font-bold">Add New Memory</h2>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Our First Date"
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Tell the story of this memory..."
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="coverImage">Cover Image URL *</Label>
              <Input
                id="coverImage"
                placeholder="https://example.com/image.jpg"
                className="mt-2"
              />
            </div>
            
            <div className="flex gap-4 pt-4">
              <Button 
                onClick={() => handleAddMemory({
                  title: "New Memory",
                  description: "A beautiful memory",
                  category: "First Dates",
                  coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
                  mediaUrls: []
                })}
                className="flex-1"
              >
                Add Memory
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => setIsAddFormOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Music Settings */}
      <Dialog isOpen={isMusicSettingsOpen} onClose={() => setIsMusicSettingsOpen(false)}>
        <DialogContent className="max-w-md bg-gray-900 text-white">
          <DialogHeader>
            <h2 className="text-2xl font-bold">Music Settings</h2>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="musicUrl">Background Music URL</Label>
              <Input
                id="musicUrl"
                value={musicUrl}
                onChange={(e) => setMusicUrl(e.target.value)}
                placeholder="https://example.com/music.mp3"
                className="mt-2"
              />
            </div>
            
            <div className="flex gap-4 pt-4">
              <Button 
                onClick={() => handleSaveMusicUrl(musicUrl)}
                className="flex-1"
              >
                Save
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => setIsMusicSettingsOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="bg-black border-t border-gray-800 py-12 px-8 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">Made with ❤️ for the most amazing person in the world</p>
          <p className="text-gray-500 mt-2">Happy Birthday, my love!</p>
        </div>
      </footer>
    </div>
  )
}