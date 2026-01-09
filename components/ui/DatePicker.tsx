"use client";

import React, { forwardRef } from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import { ko } from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface DatePickerProps extends Omit<ReactDatePickerProps, "onChange"> {
  className?: string;
  selected?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholderText?: string;
}

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  ({ className, selected, onChange, placeholderText = "Select date", ...props }, ref) => {
    // Custom input component to match the UI style
    const CustomInput = forwardRef<HTMLButtonElement, any>(
        ({ value, onClick, className }, ref) => (
        <Button
            variant="outline"
            className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
            )}
            onClick={onClick}
            ref={ref}
        >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value || placeholderText}
        </Button>
        )
    );
    CustomInput.displayName = "CustomInput";

    return (
      <div className={cn("relative", className)} ref={ref}>
        <ReactDatePicker
          selected={selected}
          onChange={onChange}
          locale={ko}
          dateFormat="yyyy년 MM월 dd일"
          customInput={<CustomInput />}
          placeholderText={placeholderText}
          {...props}
        />
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker };