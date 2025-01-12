import React from "react";
import { cn } from "../../libs/classnames";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "placeholder:text-border flex h-12 w-full rounded-full border bg-transparent px-5 py-2 text-lg shadow-sm transition-colors placeholder:text-base focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          "border-border",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
