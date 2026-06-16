import * as React from 'react'
import { cn } from './lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-11 w-full rounded-xl border border-border-default bg-surface-canvas px-4 text-sm text-content-primary outline-hidden transition-colors placeholder:text-content-tertiary disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-brand-500/25 aria-invalid:border-border-error aria-invalid:ring-2 aria-invalid:ring-state-error/20',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
