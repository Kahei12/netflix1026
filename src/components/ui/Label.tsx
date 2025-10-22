import { cn } from '../../utils/cn'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = ({ className, ...props }: LabelProps) => {
  return (
    <label
      className={cn(
        'text-sm font-medium text-white mb-2 block',
        className
      )}
      {...props}
    />
  )
}