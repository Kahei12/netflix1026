import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Memory } from '../../types'
import { MemoryCard } from './MemoryCard'
import { Button } from '../ui/Button'

interface MemoryRowProps {
  title: string
  memories: Memory[]
  onMemoryClick: (memory: Memory) => void
}

export const MemoryRow = ({ title, memories, onMemoryClick }: MemoryRowProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 800
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount)
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      })
    }
  }

  if (memories.length === 0) return null

  return (
    <div className="mb-12 group/row">
      <h3 className="text-white text-xl font-semibold px-8 mb-4">{title}</h3>
      
      <div className="relative">
        {showLeftArrow && (
          <Button
            variant="ghost"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-full bg-black/50 hover:bg-black/70 text-white rounded-none opacity-0 group-hover/row:opacity-100 transition-opacity"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
        )}
        
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-8 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {memories.map((memory) => (
            <MemoryCard
              key={memory.id}
              memory={memory}
              onClick={() => onMemoryClick(memory)}
            />
          ))}
        </div>

        {showRightArrow && (
          <Button
            variant="ghost"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-full bg-black/50 hover:bg-black/70 text-white rounded-none opacity-0 group-hover/row:opacity-100 transition-opacity"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        )}
      </div>
    </div>
  )
}