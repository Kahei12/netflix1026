import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { Memory } from '../../types'

interface MemoryCardProps {
  memory: Memory
  onClick: () => void
}

export const MemoryCard = ({ memory, onClick }: MemoryCardProps) => {
  return (
    <motion.div
      className="relative cursor-pointer flex-shrink-0 w-64 h-36 group"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full h-full rounded-md overflow-hidden bg-gray-800">
        {memory.isVideo ? (
          <>
            <img
              src={memory.coverImage}
              alt={memory.title}
              className={`w-full h-full object-cover ${memory.coverImagePosition || 'object-center'}`}
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="bg-red-600 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Play className="h-6 w-6 text-white fill-current" />
              </div>
            </div>
          </>
        ) : (
          <img
            src={memory.coverImage}
            alt={memory.title}
            className={`w-full h-full object-cover ${memory.coverImagePosition || 'object-center'}`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-sm font-medium">{memory.title}</p>
        </div>
      </div>
    </motion.div>
  )
}