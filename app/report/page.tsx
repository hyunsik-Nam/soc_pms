"use client";

import { useEffect, useState } from "react";
import SelectBox from "@/components/ui/SelectBox";
import BottomSheet from "@/components/ui/BottomSheet";
import { FilterChip } from "@/components/ui/FilterChip";
import { Textarea } from "@/components/ui/Textarea";
import { DataTable, Column } from "@/components/ui/DataTable";
import { ProjectCard } from "@/components/ui/ProjectCard";
// @ts-ignore
import Rolldate from "rolldate";

export default function ReportPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filterValues, setFilterValues] = useState({
    Report: "Report",
    Date: "Date",
    Status: "Status",
  });

  const columns: Column<typeof projects[0]>[] = [
    { header: "번호", accessorKey: "id", align: "center" },
    { header: "프로젝트명", accessorKey: "name", align: "left" },
    { header: "시작일자", accessorKey: "startDate", align: "center" },
    { header: "종료일자", accessorKey: "endDate", align: "center" },
    { header: "담당업무", accessorKey: "role", align: "left" },
    { header: "M/M", accessorKey: "mm", align: "right" },
    { header: "누적시간", accessorKey: "hours", align: "right" },
    { header: "총공정단계", accessorKey: "phase", align: "center" },
    { header: "총공정율", accessorKey: "progress", align: "right" },
    { header: "매출액", accessorKey: "revenue", align: "right" },
  ];

  const filterOptions: { [key: string]: string[] } = {
    Report: ["전체", "주간 보고", "월간 보고", "분기 보고"],
    // Date: Date handles separately
    Status: ["전체", "진행중", "완료", "보류"],
  };

  const handleOptionSelect = (value: string) => {
    if (activeFilter) {
      setFilterValues((prev) => ({
        ...prev,
        [activeFilter]: value === "전체" ? activeFilter : value,
      }));
      setActiveFilter(null);
    }
  };

  // Initialize Rolldate on the "Date" chip directly
  useEffect(() => {
    // Dynamically import/require to prevent SSR issues and potential import errors
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    let Rolldate: any;
    try {
      Rolldate = require("rolldate");
    } catch (e) {
      console.error("Rolldate require error", e);
      return;
    }

    if (Rolldate) {
        try {
          // Initialize on the specific ID
          new Rolldate({
            el: "#date-filter-chip",
            format: "YYYY-MM-DD",
            beginYear: 2000,
            endYear: 2100,
            lang: {
              title: "날짜 선택",
              cancel: "취소",
              confirm: "확인",
              year: "년",
              month: "월",
              day: "일",
            },
            confirm: (date: string) => {
              // Directly update the state without opening our custom bottom sheet
              setFilterValues((prev) => ({
                ...prev,
                Date: date,
              }));
            },
          });
        } catch (e) {
          console.error("Rolldate init error", e);
        }
    }
  }, []); // Run once on mount to bind to the button

  const projects = [
    {
      id: 1,
      name: "차세대 시스템 구축1",
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
      name: "차세대 시스템 구축2",
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
      id: 3,
      name: "차세대 시스템 구축3",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      role: "프론트엔드 개발",
      mm: 1.0,
      hours: "160h",
      phase: "구현",
      progress: "65%",
      revenue: "50,000,000",
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 lg:ml-64 transition-all duration-300">
      <h1 className="text-2xl font-bold text-black">Report</h1>
      {/* Filters */}
      <div className="w-full">
        {/* Desktop View: SelectBoxes */}
        <div className="hidden lg:flex gap-4">
          <div className="w-32">
            <SelectBox label="Report" options={[]} />
          </div>
          <div className="w-32">
            <SelectBox label="Report" options={[]} />
          </div>
          <div className="w-32">
            <SelectBox label="Report" options={[]} />
          </div>
        </div>

        {/* Mobile View: Chips */}
        <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {["Report", "Date", "Status"].map((filterKey) => {
            const isSelected = filterValues[filterKey as keyof typeof filterValues] !== filterKey;
            
            if (filterKey === "Date") {
                return (
                  <FilterChip
                    key={filterKey}
                    id="date-filter-chip"
                    label={filterValues.Date}
                    isActive={isSelected}
                  />
                );
            }

            return (
              <FilterChip
                key={filterKey}
                label={filterValues[filterKey as keyof typeof filterValues]}
                isActive={isSelected}
                onClick={() => setActiveFilter(filterKey)}
              />
            );
          })}
        </div>
      </div>
      
      {/* Mobile Filter Bottom Sheet */}
      <BottomSheet 
        isOpen={!!activeFilter} 
        onClose={() => setActiveFilter(null)}
        title={activeFilter ? `${activeFilter} 선택` : ""}
      >
        <div className="flex flex-col gap-2">
            {activeFilter && filterOptions[activeFilter]?.map((option) => (
              <button
                key={option}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${
                  filterValues[activeFilter as keyof typeof filterValues] === option
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </button>
            ))}
        </div>
      </BottomSheet>

      <div className="">
        <h2 className="text-2xl font-bold mb-4 text-black">프로젝트 리스트</h2>
        {/* Responsive Project List */}
        <div className="overflow-x-auto">
          {/* Desktop Table View */}
          <DataTable 
            columns={columns} 
            data={projects} 
            className="hidden lg:block"
          />

          
          {/* Mobile Card View */}
          <div className="grid grid-cols-1 gap-4 lg:hidden">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Other Tasks Section */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Textarea
              label="금주 그 외 업무"
              placeholder="금주 기타 업무 내용을 입력하세요."
            />
            <Textarea
              label="차주 그 외 업무"
              placeholder="차주 기타 업무 내용을 입력하세요."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
