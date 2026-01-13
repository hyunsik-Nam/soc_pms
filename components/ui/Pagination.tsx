import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number; // 1-based
    totalPages: number;
    onPageChange: (page: number) => void;
    blockSize?: number; // Defaults to 10
    className?: string;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    blockSize = 10,
    className,
}: PaginationProps) {
    // Calculate current block
    // e.g. if blockSize=10:
    // page 1 -> block 0 (start 1)
    // page 10 -> block 0 (start 1)
    // page 11 -> block 1 (start 11)
    const currentBlock = Math.ceil(currentPage / blockSize);
    const startPage = (currentBlock - 1) * blockSize + 1;
    const endPage = Math.min(startPage + blockSize - 1, totalPages);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    // Navigation handlers
    const handlePrevBlock = () => {
        if (startPage > 1) {
            onPageChange(startPage - 1);
        }
    };

    const handleNextBlock = () => {
        if (endPage < totalPages) {
            onPageChange(endPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    if (totalPages === 0) return null;

    return (
        <div className={cn("flex flex-wrap items-center justify-center gap-1", className)}>
            {/* First Page */}
            <button
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                className="p-1.5 sm:p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                aria-label="First page"
            >
                <ChevronsLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Prev Page */}
            <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="p-1.5 sm:p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30 disabled:hover:bg-transparent transition-colors mr-1 sm:mr-2"
                aria-label="Previous page"
            >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Page Numbers */}
            <div className="flex flex-wrap justify-center gap-1">
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={cn(
                            "w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200",
                            currentPage === page
                                ? "bg-brand-primary text-white shadow-md shadow-brand-primary/30 transform scale-100"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        )}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Next Page */}
            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="p-1.5 sm:p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30 disabled:hover:bg-transparent transition-colors ml-1 sm:ml-2"
                aria-label="Next page"
            >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Last Page */}
            <button
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="p-1.5 sm:p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                aria-label="Last page"
            >
                <ChevronsRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
        </div>
    );
}
