import { ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface CardProps {
  children: ReactNode
  className?: string
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={cn(
      'rounded-lg border border-gray-800 bg-gray-900/50 backdrop-blur-sm',
      className
    )}>
      {children}
    </div>
  )
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

export const CardContent = ({ children, className }: CardProps) => {
  return (
    <div className={cn('p-6', className)}>
      {children}
    </div>
  )
}