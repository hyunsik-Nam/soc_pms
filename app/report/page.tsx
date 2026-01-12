"use client";

import { useEffect, useState } from "react";
import SelectBox from "@/components/ui/SelectBox";
import BottomSheet from "@/components/ui/BottomSheet";
// @ts-ignore
import Rolldate from "rolldate";

export default function ReportPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filterValues, setFilterValues] = useState({
    Report: "Report",
    Date: "Date",
    Status: "Status",
  });

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
            
            // Special handling for Date button: needs ID for Rolldate and onClick logic
            if (filterKey === "Date") {
                return (
                  <button
                    key={filterKey}
                    id="date-filter-chip"
                    // Do NOT set activeFilter for Date, Rolldate handles it
                    className={`flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium border whitespace-nowrap transition-colors ${
                      isSelected
                        ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                        : "bg-white text-slate-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <span>{filterValues.Date}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 ${isSelected ? "text-indigo-500" : "text-gray-400"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                );
            }

            return (
              <button
                key={filterKey}
                onClick={() => setActiveFilter(filterKey)}
                className={`flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium border whitespace-nowrap transition-colors ${
                  isSelected
                    ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                    : "bg-white text-slate-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span>{filterValues[filterKey as keyof typeof filterValues]}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ${isSelected ? "text-indigo-500" : "text-gray-400"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
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
          <table className="min-w-full border-collapse border border-gray-200 text-sm hidden lg:table">
            <thead className="bg-[#0F172A] text-white">
              <tr>
                <th className="border border-indigo-900/30 px-4 py-3 font-semibold text-center">
                  번호
                </th>
                <th className="border border-indigo-900/30 px-4 py-3 font-semibold text-left">
                  프로젝트명
                </th>
                <th className="border border-indigo-900/30 px-4 py-3 font-semibold text-center">
                  시작일자
                </th>
                <th className="border border-indigo-900/30 px-4 py-3 font-semibold text-center">
                  종료일자
                </th>
                <th className="border border-indigo-900/30 px-4 py-3 font-semibold text-left">
                  담당업무
                </th>
                <th className="border border-indigo-900/30 px-4 py-3 font-semibold text-right">
                  M/M
                </th>
                <th className="border border-indigo-900/30 px-4 py-3 font-semibold text-right">
                  누적시간
                </th>
                <th className="border border-indigo-900/30 px-4 py-3 font-semibold text-center">
                  총공정단계
                </th>
                <th className="border border-indigo-900/30 px-4 py-3 font-semibold text-right">
                  총공정율
                </th>
                <th className="border border-indigo-900/30 px-4 py-3 font-semibold text-right">
                  매출액
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2 text-center text-black">
                    {project.id}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-black">
                    {project.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center text-black">
                    {project.startDate}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center text-black">
                    {project.endDate}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-black">
                    {project.role}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-right text-black">
                    {project.mm}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-right text-black">
                    {project.hours}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center text-black">
                    {project.phase}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-right text-black">
                    {project.progress}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-right text-black">
                    {project.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Card View */}
          <div className="grid grid-cols-1 gap-4 lg:hidden">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col gap-3"
              >
                <div className="flex justify-between items-start border-b border-gray-100 pb-2">
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded">
                    No. {project.id}
                  </span>
                  <span className={`text-sm font-bold ${
                    project.progress === '100%' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {project.progress}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {project.startDate} ~ {project.endDate}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-400">담당업무</span>
                    <span className="font-medium text-black">{project.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">공정단계</span>
                    <span className="font-medium text-black">{project.phase}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">M/M</span>
                    <span className="font-medium text-black">{project.mm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">누적시간</span>
                    <span className="font-medium text-black">{project.hours}</span>
                  </div>
                  <div className="col-span-2 flex justify-between pt-2 border-t border-gray-100 mt-1">
                    <span className="text-gray-400">매출액</span>
                    <span className="font-bold text-gray-900">{project.revenue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-black">금주 그 외 업무</h3>
              <textarea
                className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="금주 기타 업무 내용을 입력하세요."
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-black">차주 그 외 업무</h3>
              <textarea
                className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="차주 기타 업무 내용을 입력하세요."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
