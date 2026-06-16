import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from './lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-brand-500/14 text-brand-300',
        secondary: 'border-transparent bg-surface-elevated text-content-secondary',
        outline: 'border-border-default text-content-secondary',
        success: 'border-transparent bg-state-success-subtle text-state-success',
        warning: 'border-transparent bg-state-warning-subtle text-state-warning',
        error: 'border-transparent bg-state-error-subtle text-state-error',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type BadgeProps = React.ComponentProps<'div'> & VariantProps<typeof badgeVariants>

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
