export interface Memory {
  id: string
  title: string
  description: string
  category: string
  coverImage: string
  mediaUrls: string[]
  videoUrl?: string
  isVideo?: boolean
  coverImagePosition?: string
}

export interface MemoryCardProps {
  memory: Memory
  onClick: () => void
}

export interface MemoryRowProps {
  title: string
  memories: Memory[]
  onMemoryClick: (memory: Memory) => void
}