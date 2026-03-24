"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5 ">
        <label htmlFor={id} className="block text-xs font-bold uppercase tracking-wider text-muted">
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full rounded-xl border-2 px-4 py-3.5 text-sm font-medium outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10",
            error
              ? "border-red-400 bg-red-50"
              : "border-border bg-white text-foreground placeholder:text-muted focus:bg-white",
            className,
          )}
          {...props}
        />
        {error ? <p className="text-xs text-red-600">{error}</p> : null}
      </div>
    );
  },
);

Input.displayName = "Input";
