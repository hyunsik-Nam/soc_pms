import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export interface TextboxProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Explicit width of the input. Can be a string (e.g., "100%", "200px") or number (pixels).
   * If not provided, defaults to w-full or can be controlled via className.
   */
  width?: string | number;
}

const Textbox = forwardRef<HTMLInputElement, TextboxProps>(
  ({ className, width, style, ...props }, ref) => {
    const widthStyle = width ? { width } : {};

    return (
      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        style={{ ...widthStyle, ...style }}
        {...props}
      />
    );
  }
);
Textbox.displayName = "Textbox";

export { Textbox };
