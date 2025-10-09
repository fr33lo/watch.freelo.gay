import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center text-sm font-terminal font-bold transition-colors duration-150 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wider border',
  {
    variants: {
      variant: {
        default: 'bg-terminal-bg-dark text-terminal-accent border-terminal-accent hover:bg-terminal-accent hover:text-terminal-bg',
        destructive:
          'bg-destructive text-destructive-foreground border-destructive hover:bg-destructive/90',
        outline:
          'border-terminal-accent bg-transparent text-terminal-accent hover:bg-terminal-accent hover:text-terminal-bg',
        secondary:
          'bg-terminal-bg text-terminal-accent border-terminal-accent hover:bg-terminal-accent hover:text-terminal-bg',
        ghost: 'border-transparent text-terminal-accent hover:bg-terminal-bg-dark hover:border-terminal-accent',
        link: 'border-none text-terminal-accent underline-offset-4 hover:text-terminal-accent-bright hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
