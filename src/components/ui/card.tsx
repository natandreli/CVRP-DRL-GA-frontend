import { type ReactNode } from 'react'
import { cn } from '@/utils/cn'

type CardProps = {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export const Card = ({ children, className, onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900',
        onClick && 'cursor-pointer transition-shadow hover:shadow-md',
        className
      )}
    >
      {children}
    </div>
  )
}

export const CardHeader = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return <div className={cn('mb-4', className)}>{children}</div>
}

export const CardTitle = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <span className={cn('text-base font-semibold text-slate-900 dark:text-slate-100', className)}>
      {children}
    </span>
  )
}

export const CardDescription = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return <p className={cn('text-sm text-slate-600 dark:text-slate-400', className)}>{children}</p>
}

export const CardContent = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return <div className={cn('', className)}>{children}</div>
}
