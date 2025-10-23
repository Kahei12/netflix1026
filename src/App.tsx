import React, { useState, useEffect, useRef } from 'react'
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
  // Movies (4 videos)
  {
    id: "1",
    title: "Airside asmr",
    category: "Movies",
    description: "Airside asmr video memory",
    coverImage: "https://drive.google.com/thumbnail?id=1zZiouggK4umTDTyBs-RyVin_suegGle-&sz=w800",
    mediaUrls: [],
    isVideo: true,
    videoUrl: "https://drive.google.com/file/d/1hhv6N5Zh_n1-tZY0bnf0uQbCeAPXEwaU/preview"
  },
  {
    id: "2",
    title: "珀麗灣",
    category: "Movies",
    description: "珀麗灣 video memory",
    coverImage: "https://drive.google.com/thumbnail?id=12EMabrcZg0NZOKEassXhJmgxILD8EPhP&sz=w800",
    mediaUrls: [],
    isVideo: true,
    videoUrl: "https://drive.google.com/file/d/1eZWHBibvJAHue-iePJtaoIIOR_XDT8QU/preview"
  },
  {
    id: "3",
    title: "深圳",
    category: "Movies",
    description: "深圳 video memory",
    coverImage: "https://drive.google.com/thumbnail?id=1_L1wK-wr-PfMSoZdmuNWN7S1yxIRUzkL&sz=w800",
    mediaUrls: [],
    isVideo: true,
    videoUrl: "https://drive.google.com/file/d/10n7crjwTKbReM0WqSu_jGkN2RCZOuevY/preview",
    coverImagePosition: "object-top"
  },
  {
    id: "4",
    title: "感謝",
    category: "Movies",
    description: "感謝 video memory",
    coverImage: "https://drive.google.com/thumbnail?id=1w0h_rh3fujL4rg2KFIsq68DCPO9M3KCX&sz=w800",
    mediaUrls: [],
    isVideo: true,
    videoUrl: "https://drive.google.com/file/d/1WstUzIQqRtBeQknnotlj4c8MRBU3ygN0/preview"
  },
  // Shorts (7 videos)
  {
    id: "5",
    title: "呆",
    category: "Shorts",
    description: "呆 short video memory",
    coverImage: "https://drive.google.com/thumbnail?id=1i-6y3EkuTyWaPkQ5P0MRBq0FbV5f4-Wp&sz=w800",
    mediaUrls: [],
    isVideo: true,
    videoUrl: "https://drive.google.com/file/d/1i-6y3EkuTyWaPkQ5P0MRBq0FbV5f4-Wp/preview"
  },
  {
    id: "6",
    title: "我要食雪糕",
    category: "Shorts",
    description: "我要食雪糕 short video memory",
    coverImage: "https://drive.google.com/thumbnail?id=1hmwyutBJx1gzRD3a-qMdH4xTjjXAKklb&sz=w800",
    mediaUrls: [],
    isVideo: true,
    videoUrl: "https://drive.google.com/file/d/1hmwyutBJx1gzRD3a-qMdH4xTjjXAKklb/preview"
  },
  {
    id: "7",
    title: "偷食",
    category: "Shorts",
    description: "偷食 short video memory",
    coverImage: "https://drive.google.com/thumbnail?id=1VPmsNAH3YA4hOITGVjuZjCWHHdC8ZJSi&sz=w800",
    mediaUrls: [],
    isVideo: true,
    videoUrl: "https://drive.google.com/file/d/1VPmsNAH3YA4hOITGVjuZjCWHHdC8ZJSi/preview"
  },
  {
    id: "8",
    title: "嬲",
    category: "Shorts",
    description: "嬲 short video memory",
    coverImage: "https://drive.google.com/thumbnail?id=1hfEd_cf2HiE0vw2X0119uCEd_w4ih_Q1&sz=w800",
    mediaUrls: [],
    isVideo: true,
    videoUrl: "https://drive.google.com/file/d/1hfEd_cf2HiE0vw2X0119uCEd_w4ih_Q1/preview"
  },
  {
    id: "9",
    title: "Kam",
    category: "Shorts",
    description: "Kam short video memory",
    coverImage: "https://drive.google.com/thumbnail?id=1emY3OqPjwrt-I-B7FxKnlMb-xFE7rFBe&sz=w800",
    mediaUrls: [],
    isVideo: true,
    videoUrl: "https://drive.google.com/file/d/1emY3OqPjwrt-I-B7FxKnlMb-xFE7rFBe/preview"
  },
  {
    id: "10",
    title: "Mua",
    category: "Shorts",
    description: "Mua short video memory",
    coverImage: "https://drive.google.com/thumbnail?id=1Kx73f2qAWaa5nq6vKT4XHbHuHKVaXf3d&sz=w800",
    mediaUrls: [],
    isVideo: true,
    videoUrl: "https://drive.google.com/file/d/1Kx73f2qAWaa5nq6vKT4XHbHuHKVaXf3d/preview"
  },
  {
    id: "11",
    title: "Mua2",
    category: "Shorts",
    description: "Mua2 short video memory",
    coverImage: "https://drive.google.com/thumbnail?id=19J9hARA2Is0t_GgqCJmudl3t3IqhHdcW&sz=w800",
    mediaUrls: [],
    isVideo: true,
    videoUrl: "https://drive.google.com/file/d/19J9hARA2Is0t_GgqCJmudl3t3IqhHdcW/preview"
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
  const [musicUrl, setMusicUrl] = useState("https://github.com/Kahei12/netflix1026/raw/refs/heads/main/Can't%20Breakup%20Girl,%20Can't%20Breakaway%20Boy%20(feat.%20Jung%20In).mp3")
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
      // 使用設定的音樂 URL
      audioRef.current = new Audio(musicUrl)
      audioRef.current.loop = true
      audioRef.current.volume = 0.3
      audioRef.current.preload = 'auto'
      
      audioRef.current.addEventListener('error', (e) => {
        console.error('音樂載入失敗:', e)
        alert('音樂播放失敗！請檢查音樂連結是否正確。')
      })
      
      audioRef.current.addEventListener('canplay', () => {
        console.log('音樂可以播放')
      })
      
      audioRef.current.addEventListener('loadstart', () => {
        console.log('開始載入音樂')
      })
    }

    if (isMusicPlaying) {
      audioRef.current?.pause()
      setIsMusicPlaying(false)
    } else {
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.error('播放失敗:', error)
          alert('音樂播放失敗！請嘗試以下解決方案：\n\n1. 檢查瀏覽器是否允許音頻播放\n2. 嘗試點擊頁面後再播放音樂\n3. 使用其他音頻託管服務')
        })
        setIsMusicPlaying(true)
      }
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


  // Navigation functions
  const navigateToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateToMovies = () => {
    const moviesSection = document.querySelector('[data-category="Movies"]')
    if (moviesSection) {
      moviesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navigateToShorts = () => {
    const shortsSection = document.querySelector('[data-category="Shorts"]')
    if (shortsSection) {
      shortsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Group memories by category
  const groupedMemories = {
    "Movies": memories.filter((m) => m.category === "Movies"),
    "Shorts": memories.filter((m) => m.category === "Shorts"),
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar
        onAddMemory={() => setIsAddFormOpen(true)}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={toggleMusic}
        onMusicSettings={() => setIsMusicSettingsOpen(true)}
        onNavigateToHome={navigateToHome}
        onNavigateToMovies={navigateToMovies}
        onNavigateToShorts={navigateToShorts}
      />

      <HeroBanner
        memories={memories.filter((m) => m.category === "Movies")}
        onViewDetails={handleMemoryClick}
      />

      <div className="relative mt-8 pb-16">
        {Object.entries(groupedMemories).map(([category, categoryMemories]) => (
          <div key={category} data-category={category}>
            <MemoryRow
              title={category}
              memories={categoryMemories}
              onMemoryClick={handleMemoryClick}
            />
          </div>
        ))}
      </div>

      {/* Memory Detail Modal */}
      <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 text-white p-0">
          <div className="relative">

            {selectedMemory && (
              <>
                <div className="relative w-full h-96">
                  {selectedMemory.isVideo && selectedMemory.videoUrl ? (
                    <iframe
                      src={selectedMemory.videoUrl}
                      className="w-full h-full border-0"
                      frameBorder="0"
                      allowFullScreen
                      title={selectedMemory.title}
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={selectedMemory.coverImage}
                      alt={selectedMemory.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent pointer-events-none" />
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
              <Label htmlFor="musicUrl">Music URL</Label>
              <Input
                id="musicUrl"
                value={musicUrl}
                onChange={(e) => setMusicUrl(e.target.value)}
                placeholder="https://example.com/music.mp3"
                className="mt-2"
              />
              <div className="mt-2 text-sm text-gray-400">
                <p>Recommended audio hosting services:</p>
                <p className="text-xs mt-1">• SoundCloud: Upload and get direct link</p>
                <p className="text-xs">• GitHub: https://raw.githubusercontent.com/username/repo/main/audio/file.mp3</p>
                <p className="text-xs">• Dropbox: Right-click file → "Copy Dropbox link" → Change ?dl=0 to ?dl=1</p>
                <p className="text-xs">• OneDrive: Right-click file → "Embed" → Copy direct link</p>
              </div>
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