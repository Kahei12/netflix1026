import { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '../../utils/cn'
import { Button } from './Button'

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

export const Dialog = ({ isOpen, onClose, children, className }: DialogProps) => {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div 
        className={cn(
          'relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-gray-900',
          className
        )}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  )
}

interface DialogContentProps {
  children: ReactNode
  className?: string
}

export const DialogContent = ({ children, className }: DialogContentProps) => {
  return (
    <div className={cn('p-6', className)}>
      {children}
    </div>
  )
}

interface DialogHeaderProps {
  children: ReactNode
  className?: string
}

export const DialogHeader = ({ children, className }: DialogHeaderProps) => {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  )
}