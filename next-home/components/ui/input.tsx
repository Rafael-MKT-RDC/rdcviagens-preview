import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-[#D6D6D6] bg-white px-3 py-2 text-sm text-[#2D2D2D] placeholder:text-[#999999] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9100] disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
