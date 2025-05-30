import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, onBlur, ...props }, ref) => {
  return (
    (<input
      type={type}
      onBlur={onBlur}
      className={cn(
        "flex h-9 w-full rounded-md border border-primary bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-2 focus-visible:border-[#3c72de] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }
