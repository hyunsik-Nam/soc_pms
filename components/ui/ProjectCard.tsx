import { cn } from "@/lib/utils";

export interface ProjectData {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  role: string;
  mm: number;
  hours: string;
  phase: string;
  progress: string;
  revenue: string;
}

interface ProjectCardProps {
  project: ProjectData;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <div className={cn("bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col gap-3", className)}>
      <div className="flex justify-between items-start border-b border-gray-100 pb-2">
        <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded">
          No. {project.id}
        </span>
        <span
          className={cn(
            "text-sm font-bold",
            project.progress === "100%" ? "text-green-600" : "text-blue-600"
          )}
        >
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
  );
}
