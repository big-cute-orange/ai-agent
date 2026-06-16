import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from './lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-canvas',
  {
    variants: {
      variant: {
        default: 'bg-brand-500 text-content-primary shadow-xs hover:bg-brand-600',
        secondary:
          'border border-border-default bg-surface-panel text-content-primary hover:border-border-strong hover:bg-surface-elevated',
        outline:
          'border border-border-default bg-transparent text-content-secondary hover:bg-surface-panel hover:text-content-primary',
        ghost: 'text-content-secondary hover:bg-surface-panel hover:text-content-primary',
        danger: 'bg-state-error text-content-primary shadow-xs hover:bg-red-600',
      },
      size: {
        default: 'h-11 px-5',
        sm: 'h-9 rounded-lg px-4 text-xs',
        lg: 'h-12 px-6 text-base',
        icon: 'size-10 px-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

export { Button, buttonVariants }
