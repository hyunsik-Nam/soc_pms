"use client";

import { useState } from "react";
import SelectBox from "@/components/ui/SelectBox";
import { Button } from "@/components/ui/Button";
import BottomSheet from "@/components/ui/BottomSheet";
import { Textbox } from "@/components/ui/Textbox";
import { Calendar } from "@/components/ui/Calendar";
import { DatePicker } from "@/components/ui/DatePicker";
import { RadioGroup, Radiobox } from "@/components/ui/Radiobox";
import { FilterChip } from "@/components/ui/FilterChip";
import { Textarea } from "@/components/ui/Textarea";
import { ProjectCard, ProjectData } from "@/components/ui/ProjectCard";
import { DataTable, Column } from "@/components/ui/DataTable";

export default function ReportPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  // Dummy data for examples
  const testProjects: ProjectData[] = [
    {
      id: 1,
      name: "차세대 시스템 구축",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      role: "프론트엔드 개발",
      mm: 1.0,
      hours: "160h",
      phase: "구현",
      progress: "65%",
      revenue: "50,000,000",
    },
    {
      id: 2,
      name: "유지보수 프로젝트",
      startDate: "2024-03-01",
      endDate: "2024-12-31",
      role: "백엔드 개발",
      mm: 0.5,
      hours: "80h",
      phase: "운영",
      progress: "100%",
      revenue: "20,000,000",
    },
  ];

  const columns: Column<ProjectData>[] = [
    { header: "번호", accessorKey: "id", align: "center" },
    { header: "프로젝트명", accessorKey: "name", align: "left" },
    { header: "담당업무", accessorKey: "role", align: "left" },
    { header: "진행률", accessorKey: "progress", align: "right" },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 sm:ml-64">
      <h1 className="text-2xl font-bold">UI Components Test</h1>
      
      {/* Existing Components... logic kept, just adding specific implementations below if re-rendering whole file or specific sections. Since I am replacing the whole file content effectively or large chunks, I will reproduce the existing parts briefly or just append. Wait, I should replace specific parts? No, the user wants me to ADD to the page. 
      The Instruction says "EndLine: 58". I will replace the whole file content to be safe and ensure everything is there, reusing the existing parts from the viewed file. */}
      
      <div className="flex gap-4 items-end mb-8">
        <div className="w-32">
          <SelectBox label="SelectBox" options={[{label: "Option 1", value: "1"}]} />
        </div>
        <Button>Button</Button>
      </div>

      <div className="grid gap-8 p-4 border rounded-lg">
        {/* Existing Sections */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Textbox</h2>
          <div className="flex flex-col gap-4">
            <Textbox placeholder="Default width (100%)" />
            <Textbox width="300px" placeholder="Fixed width (300px)" />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Radiobox</h2>
          <RadioGroup className="flex gap-4">
            <Radiobox name="option" label="Option 1" value="1" defaultChecked />
            <Radiobox name="option" label="Option 2" value="2" />
          </RadioGroup>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Calendar / DatePicker</h2>
          <div className="w-fit border rounded-md p-4 bg-white">
            <DatePicker selected={date} onChange={(date) => setDate(date || undefined)} />
          </div>
        </section>

        {/* New Components */}
        <hr className="my-4" />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">FilterChip & BottomSheet</h2>
          <div className="flex gap-4">
            <FilterChip label="Inactive Chip" />
            <FilterChip label="Active Chip" isActive={true} />
            <FilterChip 
              label="Open BottomSheet(모바일 크기에서만 보임)" 
              isActive={isSheetOpen}
              onClick={() => setIsSheetOpen(true)}
            />
          </div>
          <BottomSheet 
            isOpen={isSheetOpen} 
            onClose={() => setIsSheetOpen(false)}
            title="Bottom Sheet Example"
          >
            <div className="p-4">
              <p className="text-gray-600">This is the content of the bottom sheet.</p>
              <Button onClick={() => setIsSheetOpen(false)} className="mt-4 w-full">
                Close Sheet
              </Button>
            </div>
          </BottomSheet>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Textarea</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Textarea placeholder="No label textarea" />
            <Textarea label="With Label" placeholder="Enter text here..." />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">ProjectCard (Mobile View)</h2>
          <div className="max-w-md">
            <ProjectCard project={testProjects[0]} />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">DataTable (Desktop View)</h2>
          <DataTable 
            columns={columns} 
            data={testProjects} 
          />
        </section>
      </div>
    </div>
  );
}
