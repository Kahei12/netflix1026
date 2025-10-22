import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Info } from 'lucide-react'
import { Memory } from '../../types'
import { Button } from '../ui/Button'

interface HeroBannerProps {
  memories: Memory[]
  onViewDetails: (memory: Memory) => void
}

export const HeroBanner = ({ memories, onViewDetails }: HeroBannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (memories.length === 0 || isPaused) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % memories.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [memories.length, isPaused])

  if (memories.length === 0) return null

  const currentMemory = memories[currentIndex]

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % memories.length)
  }

  return (
    <div 
      className="relative h-[85vh] w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMemory.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0">
            <img
              src={currentMemory.coverImage}
              alt={currentMemory.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          <div className="relative h-full flex items-center px-8 md:px-16">
            <div className="max-w-2xl">
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white text-4xl font-bold mb-4"
              >
                {currentMemory.title}
              </motion.h2>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-200 text-lg mb-8 line-clamp-3"
              >
                {currentMemory.description}
              </motion.p>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex gap-4"
              >
                <Button
                  onClick={() => onViewDetails(currentMemory)}
                  className="bg-white text-black hover:bg-gray-200 flex items-center gap-2 px-8"
                >
                  <Play className="h-6 w-6 fill-current" />
                  View Memory
                </Button>
                <Button
                  onClick={() => onViewDetails(currentMemory)}
                  variant="secondary"
                  className="bg-gray-500/50 text-white hover:bg-gray-500/70 flex items-center gap-2 px-8"
                >
                  <Info className="h-6 w-6" />
                  More Info
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        <Button
          variant="ghost"
          size="sm"
          onClick={goToPrevious}
          className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white border border-white/20"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex gap-2 max-w-xs overflow-hidden">
          {memories.slice(0, Math.min(10, memories.length)).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-red-600' 
                  : 'w-6 bg-gray-400 hover:bg-gray-300'
              }`}
            />
          ))}
          {memories.length > 10 && (
            <div className="flex items-center text-gray-400 text-xs px-1">...</div>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={goToNext}
          className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white border border-white/20"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        <div className="text-white/70 text-sm bg-black/30 px-3 py-1 rounded-full">
          {currentIndex + 1} / {memories.length}
        </div>
      </div>
    </div>
  )
}