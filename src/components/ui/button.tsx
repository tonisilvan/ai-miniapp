import * as React from "react"
import { clsx } from "clsx"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost"
}

export function Button({ className, variant="default", ...props }: Props) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition",
        variant === "default" && "bg-black text-white hover:opacity-90",
        variant === "ghost" && "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800",
        "disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}
