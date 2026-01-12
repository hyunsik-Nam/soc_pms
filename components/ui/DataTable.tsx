import { cn } from "@/lib/utils";

export interface Column<T> {
  header: string;
  accessorKey: keyof T;
  align?: "left" | "center" | "right";
  width?: string;
  render?: (value: any, item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
  onRowClick?: (item: T) => void;
}

export function DataTable<T>({
  columns,
  data,
  className,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="min-w-full border-collapse border border-gray-200 text-sm">
        <thead className="bg-[#0F172A] text-white">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className={cn(
                  "border border-indigo-900/30 px-4 py-3 font-semibold whitespace-nowrap",
                  {
                    "text-left": col.align === "left",
                    "text-center": !col.align || col.align === "center",
                    "text-right": col.align === "right",
                  }
                )}
                style={{ width: col.width }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className={cn("hover:bg-gray-50", onRowClick && "cursor-pointer")}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((col, colIndex) => {
                const value = item[col.accessorKey];
                return (
                  <td
                    key={colIndex}
                    className={cn("border border-gray-200 px-4 py-2 text-black", {
                      "text-left": col.align === "left",
                      "text-center": !col.align || col.align === "center",
                      "text-right": col.align === "right",
                    })}
                  >
                    {col.render ? col.render(value, item) : (value as React.ReactNode)}
                  </td>
                );
              })}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="border border-gray-200 px-4 py-8 text-center text-gray-500"
              >
                데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
