import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { IconChevronDown } from '@tabler/icons-react'
import { useClickOutside } from '@/hooks/use-click-outside'
import { cn } from '@/utils/cn'

interface SelectOption {
  value: string
  label: string
  subtitle?: string
}

interface SelectProps {
  label?: string
  placeholder?: string
  value: string
  options: SelectOption[]
  onChange: (value: string) => void
  required?: boolean
  disabled?: boolean
  className?: string
}

export const Select = ({
  label,
  placeholder = 'Select an option...',
  value,
  options,
  onChange,
  required = false,
  disabled = false,
  className,
}: SelectProps) => {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 })
  const containerRef = useClickOutside<HTMLDivElement>(() => setOpen(false))
  const triggerRef = useRef<HTMLButtonElement>(null)

  const selectedOption = options.find((opt) => opt.value === value)

  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width,
      })
    }
  }, [open])

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setOpen(false)
  }

  return (
    <div ref={containerRef} className={cn('relative space-y-1.5', className)}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-400">
          {label}
          {required && <span className="text-red-800"> *</span>}
        </label>
      )}

      <button
        ref={triggerRef}
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={cn(
          'relative flex w-full items-center justify-between rounded-lg border bg-white px-4 py-2.5 text-left text-sm transition-all',
          'dark:border-slate-700/50 dark:bg-slate-900',
          'focus:border-slate-600/50 focus:ring-2 focus:ring-slate-900/10 focus:outline-none dark:focus:ring-slate-100/10',
          disabled && 'cursor-not-allowed opacity-60',
          !disabled && 'hover:border-slate-400 dark:hover:border-slate-600'
        )}
      >
        <div className="flex-1 truncate">
          {selectedOption ? (
            <div>
              <div className="font-medium text-slate-900 dark:text-slate-100">
                {selectedOption.label}
              </div>
              {selectedOption.subtitle && (
                <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {selectedOption.subtitle}
                </div>
              )}
            </div>
          ) : (
            <span className="text-slate-500 dark:text-slate-400">{placeholder}</span>
          )}
        </div>
        <IconChevronDown
          size={20}
          className={cn(
            'ml-2 flex-shrink-0 text-slate-400 transition-transform dark:text-slate-500',
            open && 'rotate-180'
          )}
        />
      </button>

      {typeof window !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15 }}
                className="fixed z-[9999] max-h-80 overflow-auto rounded-lg border border-slate-700/50 bg-slate-900 shadow-xl"
                style={{
                  top: `${position.top}px`,
                  left: `${position.left}px`,
                  width: `${position.width}px`,
                  originY: 0,
                }}
              >
                {options.map((option) => (
                  <motion.button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      'w-full px-4 py-3 text-left transition-colors',
                      'hover:bg-slate-800',
                      option.value === value && 'bg-slate-800/50'
                    )}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    <div className="text-sm font-medium text-slate-100">{option.label}</div>
                    {option.subtitle && (
                      <div className="mt-0.5 text-xs text-slate-400">{option.subtitle}</div>
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  )
}
