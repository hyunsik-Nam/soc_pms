"use client";

import { Card } from "@/components/ui/Card";
import { Users, Briefcase, Clock, AlertCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const stats = [
  { label: "Active Projects", value: "12", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-100" },
  { label: "Total Resources", value: "48", icon: Users, color: "text-green-600", bg: "bg-green-100" },
  { label: "Total M/M", value: "156.5", icon: Clock, color: "text-purple-600", bg: "bg-purple-100" },
  { label: "Critical Issues", value: "3", icon: AlertCircle, color: "text-red-600", bg: "bg-red-100" },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
        gsap.fromTo(containerRef.current.children,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
        );
    }
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="flex items-center p-6 hover:shadow-md transition-shadow">
            <div className={`p-4 rounded-full ${stat.bg} mr-4`}>
              <Icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <h4 className="text-2xl font-bold text-gray-900">{stat.value}</h4>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
