import { cn } from "@/lib/utils";

export const Spinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-green-600",
        className,
      )}
      aria-label="Loading"
    />
  );
};
