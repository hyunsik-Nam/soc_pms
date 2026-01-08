import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-gray-100 shadow-sm p-6 overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
