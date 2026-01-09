import { cn } from "@/lib/utils";
import * as React from "react";
import { Circle } from "lucide-react";

const RadioGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div className={cn("grid gap-2", className)} ref={ref} {...props} />;
});
RadioGroup.displayName = "RadioGroup";

interface RadioboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Radiobox = React.forwardRef<HTMLInputElement, RadioboxProps>(
  ({ className, label, id, ...props }, ref) => {
    // Generate a unique ID if one isn't provided and a label exists
    const inputId = id || React.useId();

    return (
      <div className="flex items-center space-x-2">
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="radio"
            id={inputId}
            className={cn(
              "peer h-4 w-4 appearance-none rounded-full border border-gray-300 bg-white checked:border-brand-primary checked:bg-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            {...props}
          />
          <Circle className="pointer-events-none absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 fill-white text-white opacity-0 transition-opacity peer-checked:opacity-100" />
        </div>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
Radiobox.displayName = "Radiobox";

export { RadioGroup, Radiobox };
