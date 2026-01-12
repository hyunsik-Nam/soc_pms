import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface FilterChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isActive?: boolean;
}

export function FilterChip({ label, isActive, className, ...props }: FilterChipProps) {
  return (
    <button
      className={cn(
        "flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium border whitespace-nowrap transition-colors",
        isActive
          ? "bg-indigo-50 text-indigo-700 border-indigo-200"
          : "bg-white text-slate-600 border-gray-200 hover:bg-gray-50",
        className
      )}
      {...props}
    >
      <span>{label}</span>
      <ChevronDown
        className={cn(
          "h-4 w-4",
          isActive ? "text-indigo-500" : "text-gray-400"
        )}
      />
    </button>
  );
}
