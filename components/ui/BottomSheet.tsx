"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
}: BottomSheetProps) {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      // Small delay to allow render before animation
      setTimeout(() => setIsVisible(true), 10);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setIsRendered(false), 300); // Wait for animation
      document.body.style.overflow = "";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center lg:hidden">
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={cn(
          "relative w-full bg-white rounded-t-2xl shadow-xl transition-transform duration-300 transform max-h-[80vh] overflow-y-auto",
          isVisible ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">{title || "Select"}</h3>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 safe-area-bottom">{children}</div>
      </div>
    </div>,
    document.body
  );
}
