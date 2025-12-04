import { cn } from '@/utils/cn'
import { IconLoader2 } from '@tabler/icons-react'
import { type HTMLMotionProps, motion } from 'framer-motion'

type ButtonProps = Readonly<
  Omit<HTMLMotionProps<'button'>, 'ref'> & {
    children: React.ReactNode
    className?: string
    icon?: React.ReactNode
    isLoading?: boolean
    disableOnLoading?: boolean
    iconPosition?: 'left' | 'right'
    altColor?: boolean
    variant?: 'primary' | 'alt' | 'error' | 'grey' | 'success'
    size?: 'xs' | 'sm' | 'md' | 'lg'
  }
>

export const Button = ({
  children,
  className,
  icon,
  isLoading,
  disableOnLoading = true,
  iconPosition = 'left',
  altColor,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) => {
  const disabled = disableOnLoading && isLoading

  if (altColor) {
    variant = 'alt'
  }

  const sizeClasses = {
    xs: 'px-2.5 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-2.5 text-base',
  }[size]

  return (
    <motion.button
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      {...props}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded bg-slate-800 font-semibold text-slate-100 transition-all hover:bg-slate-700 disabled:cursor-default disabled:opacity-50 disabled:hover:bg-slate-800',
        sizeClasses,
        disabled && 'cursor-default opacity-50',
        variant === 'alt' &&
          'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:hover:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700',
        variant === 'error' &&
          'bg-rose-600 text-white hover:bg-rose-500 disabled:hover:bg-rose-600',
        variant === 'grey' &&
          'border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:text-slate-400 disabled:hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700',
        variant === 'success' &&
          'bg-emerald-600 text-emerald-50 hover:bg-emerald-500 disabled:hover:bg-emerald-600',
        className
      )}
    >
      {iconPosition === 'left' && (isLoading ? <IconLoader2 className="animate-spin" /> : icon)}
      {children}
      {iconPosition === 'right' && (isLoading ? <IconLoader2 className="animate-spin" /> : icon)}
    </motion.button>
  )
}
