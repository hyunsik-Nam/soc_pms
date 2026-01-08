import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "active" | "pending" | "closed" | "risk" | "default";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    active: "bg-status-active/10 text-status-active",
    pending: "bg-status-pending/10 text-status-pending",
    closed: "bg-status-closed/10 text-status-closed",
    risk: "bg-status-risk/10 text-status-risk",
    default: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
