'use client'

import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"
import { Loading } from "./loading"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg cursor-pointer text-base font-normal transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-l from-primary to-primary-light text-primary-foreground hover:opacity-90",
        outline:
          "border-2 border-border bg-transparent hover:border-sub/35 text-title",
        ghost:
          "text-primary dark:hover:bg-sub/30 bg-sub/20",
        link:
          "text-primary underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        success:
          "bg-success text-white shadow-xs hover:bg-success/90 focus-visible:ring-success/20 dark:focus-visible:ring-success/40",
      },
      size: {
        default: "px-5 py-[11px] has-[>svg]:px-3",
        sm: "rounded-md text-sm py-2.5 gap-1.5 px-4 has-[>svg]:px-2.5",
        lg: "text-lg rounded-[10px] py-3 px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  isLoading,
  disabled,
  children,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean,
    isLoading?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isLoading || disabled}
      {...props}>
      {children}
      {isLoading && <Loading type="spinner" />}
    </Comp>
  )
}

export { Button, buttonVariants }