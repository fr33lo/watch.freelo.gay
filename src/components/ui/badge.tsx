import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-3 py-1 text-xs font-terminal font-bold transition-colors duration-150 focus:outline-none uppercase tracking-wider",
  {
    variants: {
      variant: {
        default:
          "bg-terminal-bg-dark text-terminal-accent border-terminal-accent hover:bg-terminal-accent hover:text-terminal-bg",
        secondary:
          "bg-terminal-bg text-terminal-accent border-terminal-accent hover:bg-terminal-accent hover:text-terminal-bg",
        destructive:
          "bg-destructive text-destructive-foreground border-destructive hover:bg-destructive/80",
        outline: "bg-transparent text-terminal-accent border-terminal-accent hover:bg-terminal-accent hover:text-terminal-bg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
