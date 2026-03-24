"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:-translate-y-0.5 active:translate-y-0 focus:ring-4 focus:ring-primary/20 shadow-lg shadow-primary/20",
  secondary: "bg-surface text-foreground border-2 border-border/50 hover:border-primary/50 hover:shadow-sm",
  ghost: "bg-transparent text-muted hover:text-foreground hover:bg-surface",
};

export const Button = ({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition-all disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
};
