"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Kanban,
  User,
  FileBarChart,
  Settings,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";
import logoSrc from "@/images/logo.png";

const navItems = [
  { name: "Board", href: "/board", icon: LayoutDashboard },
  { name: "PMO", href: "/pmo", icon: Kanban },
  { name: "Report", href: "/report", icon: FileBarChart },
  { name: "Member", href: "/member", icon: User },
  { name: "Status", href: "/status", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Trigger */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar Container */}
      <div
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-64 bg-[#0F172A] border-r border-indigo-900/30 transition-transform duration-300 ease-in-out lg:translate-x-0 text-white",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-center h-16 border-b border-indigo-900/30 bg-[#0F172A]">
          <Image
            src={logoSrc}
            alt="회사 로고"
            width={150}
            height={40}
            priority // 로고는 LCP 성능을 위해 priority 속성 권장
          />
        </div>

        <nav className="flex flex-col p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center p-3 rounded-xl transition-all duration-300",
                  isActive
                    ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg shadow-indigo-500/30"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
                onClick={() => setIsOpen(false)} // Close on click for mobile
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
