"use client";

import { UserCircle } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 bg-white/50 backdrop-blur-md border-b border-indigo-100 flex items-center justify-end px-8 ml-0 lg:ml-64 transition-all duration-300 sticky top-0 z-20">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-slate-600">로그인 정보</span>
        <div className="p-1 rounded-full bg-indigo-50 border border-indigo-100">
          <UserCircle className="w-8 h-8 text-brand-primary" />
        </div>
      </div>
    </header>
  );
}
