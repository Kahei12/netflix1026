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
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute right-2 top-2 z-10"
        >
          <X className="h-4 w-4" />
        </Button>
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