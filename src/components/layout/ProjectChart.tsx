"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Card } from '@/components/ui/Card';

const data = [
  { name: 'Alpha', mm: 12.5 },
  { name: 'Beta', mm: 8.0 },
  { name: 'Gamma', mm: 15.2 },
  { name: 'Delta', mm: 5.5 },
  { name: 'Epsilon', mm: 9.8 },
];

export function ProjectChart() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Animation for chart entry
    if (chartRef.current) {
      gsap.fromTo(chartRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <Card className="h-[400px] w-full p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Project Resource Allocation (M/M)</h3>
      <div ref={chartRef} className="h-full w-full pb-8">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
                dy={10}
            />
            <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <Tooltip
                cursor={{ fill: 'rgba(37, 99, 235, 0.1)' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Bar
                dataKey="mm"
                fill="#2563EB"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
