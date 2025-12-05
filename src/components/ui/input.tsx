import {
  type DetailedHTMLProps,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  useId,
} from 'react'
import { cn } from '@/utils/cn'

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  containerProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  icon?: ReactNode
  label?: string
  labelOffset?: number
  errorMessage?: string
  setValue?: (value: string) => void
}

export const Input = (props: InputProps) => {
  const inputProps = { ...props }
  delete inputProps.containerProps
  delete inputProps.icon
  delete inputProps.errorMessage
  delete inputProps.setValue
  delete inputProps.label
  delete inputProps.labelOffset
  delete inputProps.min
  delete inputProps.max

  const minValue = props.min
  const maxValue = props.max

  let id = useId()
  id = props.id || id

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value

    if (props.type === 'number') {
      if (value === '-' || value === '') {
        return
      }

      const numValue = parseFloat(value)
      const min = minValue ? parseFloat(minValue.toString()) : -Infinity

      if (isNaN(numValue) || numValue < min) {
        return
      }
    }

    props.setValue?.(value)
    props.onChange?.(event)
  }

  const handleIncrement = () => {
    const currentValue = parseFloat(props.value?.toString() || '0')
    const step = parseFloat(props.step?.toString() || '1')
    const max = maxValue ? parseFloat(maxValue.toString()) : Infinity
    const newValue = currentValue + step
    if (newValue <= max) {
      props.setValue?.(newValue.toString())
    }
  }

  const handleDecrement = () => {
    const currentValue = parseFloat(props.value?.toString() || '0')
    const step = parseFloat(props.step?.toString() || '1')
    const min = minValue ? parseFloat(minValue.toString()) : -Infinity
    const newValue = currentValue - step
    if (newValue >= min) {
      props.setValue?.(newValue.toString())
    }
  }

  const currentValue = parseFloat(props.value?.toString() || '0')
  const min = minValue ? parseFloat(minValue.toString()) : -Infinity
  const max = maxValue ? parseFloat(maxValue.toString()) : Infinity
  const isDecrementDisabled = currentValue <= min
  const isIncrementDisabled = currentValue >= max

  return (
    <div {...props.containerProps} className={cn('space-y-1.5', props.containerProps?.className)}>
      {props.label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-700 dark:text-slate-400"
        >
          {props.label}
          {props.required && <span className="text-red-800"> *</span>}
        </label>
      )}
      <div className="relative flex max-w-full flex-1 items-center rounded-lg border bg-white transition-all focus-within:border-slate-600/50 focus-within:ring-2 focus-within:ring-slate-900/10 dark:border-slate-700/50 dark:bg-slate-900 dark:focus-within:ring-slate-100/10">
        <input
          {...inputProps}
          placeholder={props.placeholder}
          className={cn(
            'block w-full max-w-full bg-transparent px-4 py-2.5 text-sm text-slate-900 outline-none dark:text-slate-100',
            props.readOnly && 'cursor-default opacity-70',
            props.icon ? 'cursor-pointer caret-transparent' : '',
            props.icon ? 'pl-10' : 'px-4',
            props.type === 'checkbox' && 'h-4 w-4 accent-slate-600',
            props.type === 'number' &&
              '[appearance:textfield] pr-16 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
            props.className
          )}
          type={props.type}
          id={id}
          onChange={handleOnChange}
        />
        {props.icon && <div className="absolute left-3 text-slate-400">{props.icon}</div>}
        {props.type === 'number' && props.setValue && (
          <div className="gap-0.1 absolute right-2 mr-1 flex flex-col">
            <button
              type="button"
              onClick={handleIncrement}
              disabled={isIncrementDisabled}
              className={cn(
                'flex items-center justify-center transition-colors',
                isIncrementDisabled
                  ? 'cursor-not-allowed text-slate-400 dark:text-slate-600'
                  : 'cursor-pointer text-slate-600 hover:text-slate-100 dark:text-slate-300 dark:hover:text-slate-100'
              )}
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              disabled={isDecrementDisabled}
              className={cn(
                'flex items-center justify-center transition-colors',
                isDecrementDisabled
                  ? 'cursor-not-allowed text-slate-400 dark:text-slate-600'
                  : 'cursor-pointer text-slate-600 hover:text-slate-100 dark:text-slate-300 dark:hover:text-slate-100'
              )}
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      {props.errorMessage && <p className="text-xs text-red-500">{props.errorMessage}</p>}
    </div>
  )
}
