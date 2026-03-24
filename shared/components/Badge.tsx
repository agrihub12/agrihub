import { cn } from "@/lib/utils";

type Status = "active" | "sold" | "inactive" | "pending" | "paid";

const statusClasses: Record<Status, string> = {
  active: "bg-primary/10 text-primary border border-primary/20",
  sold: "bg-blue-100 text-blue-700 border border-blue-200",
  inactive: "bg-surface text-muted border border-border",
  pending: "bg-accent/10 text-accent-dark border border-accent/20",
  paid: "bg-purple-100 text-purple-700 border border-purple-200",
};

export const Badge = ({ status }: { status: Status }) => {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
        statusClasses[status],
      )}
    >
      {status}
    </span>
  );
};
