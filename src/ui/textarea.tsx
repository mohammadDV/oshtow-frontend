import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-border placeholder:text-caption focus-visible:border-sub focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive/50 flex field-sizing-content min-h-16 w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
