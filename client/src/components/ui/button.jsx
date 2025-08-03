import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.99] min-h-fit text-xl font-semibold",
  {
    variants: {
      variant: {
        // primary:
        //   "bg-secondary text-primary hover:bg-secondary/85  ",
        primary:
          "bg-primary text-primary-foreground shadow hover:bg-primary/85",
        accent:
          "bg-accent text-primary shadow hover:bg-accent/80",
        destructive:
          "bg-destructive text-secondary shadow-sm hover:bg-destructive/90",
        outline:
          "border-[2px] border-secondary border-dashed bg-primary text-secondary shadow-sm hover:bg-secondary hover:text-primary hover:border-primary  ",
        // outline:
        //   "border-[3px] border-primary border-dashed bg-background shadow-sm hover:bg-primary/10 hover:text-accent-foreground  ",
        secondary: "bg-secondary text-primary shadow-sm hover:bg-secondary/80 shadow-[inset_0_0_0_2px_black]  ",
        ghost: "hover:bg-accent hover:text-accent-foreground ",
        link: "text-primary underline-offset-4 hover:underline ",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 py-0 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "rounded-2xl py-3 text-xl font-medium",
        icon: "h-9 w-9",
      },

    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
