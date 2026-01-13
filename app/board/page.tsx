"use client";

import { useEffect, useMemo, useState } from "react";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import SelectBox from "@/components/ui/SelectBox";
import { Textbox } from "@/components/ui/Textbox";
import { Pagination } from "@/components/ui/Pagination";

// =====================
// Types (백엔드 응답 구조)
// =====================
type SearchType = "title" | "content";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
};

type PageResponse<T> = {
  content: T[];
  currentPage: number; // 0-base
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

type BoardListItem = {
  id: number;
  title: string;
  category: string;
  authorName: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
};

// UI에서 쓰는 데이터(기존 테이블 컬럼 맞추기)
interface Notice {
  id: number;
  title: string;
  author: string;
  date: string;
  views: number; // 백엔드에 없으면 0으로
}

// createdAt -> "2026.01.12" 형태로 변환
function formatDate(iso: string) {
  if (!iso) return "";
  // "2026-01-12T08:25:16.420323" -> "2026.01.12"
  return iso.slice(0, 10).replaceAll("-", ".");
}

function toNotice(item: BoardListItem): Notice {
  return {
    id: item.id,
    title: item.title,
    author: item.authorName,
    date: formatDate(item.createdAt),
    views: 0,
  };
}

// =====================
// Table Columns
// =====================
const COLUMNS: Column<Notice>[] = [
  { header: "번호", accessorKey: "id", width: "80px", align: "center" },
  { header: "제목", accessorKey: "title", align: "left" },
  { header: "작성자", accessorKey: "author", width: "120px", align: "center" },
  { header: "작성일자", accessorKey: "date", width: "120px", align: "center" },
  { header: "조회수", accessorKey: "views", width: "100px", align: "center" },
];

export default function BoardPage() {
  // ====== 검색/페이징 상태 ======
  // 서버는 0-base 페이지. 프론트도 0-base로 맞추는 게 편함.
  const [page, setPage] = useState(0);
  const [size] = useState(10);

  // keyword (백엔드 query param)
  const [keyword, setKeyword] = useState("");

  // UI에 있는 "검색 타입(제목/내용)"은 백엔드가 아직 지원 안 하니까 일단 유지용
  const [searchType, setSearchType] = useState<"title" | "content">("title");

  // ====== 서버 데이터 ======
  const [rows, setRows] = useState<Notice[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // ====== 서버 호출 함수 ======


  async function loadBoards(
    nextPage: number,
    nextKeyword: string,
    nextType: SearchType
  ) {
    const qs = new URLSearchParams();

    qs.set("page", String(nextPage));
    qs.set("size", String(size));
    qs.set("sort", "createdAt,desc");

    qs.set("type", nextType); // ⭐ 핵심
    if (nextKeyword.trim()) {
      qs.set("keyword", nextKeyword.trim());
    }

    const url = `${baseUrl}/api/boards?${qs.toString()}`;
    console.log("FETCH:", url);

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(await res.text());

    const json: ApiResponse<PageResponse<BoardListItem>> = await res.json();

    setRows(json.data.content.map(toNotice));
    setTotalPages(json.data.totalPages);
    setTotalElements(json.data.totalElements);
    setPage(json.data.currentPage);
  }

  // ====== 첫 진입 시 1회 로딩 ======
  useEffect(() => {
    loadBoards(0, "", "title");
  }, []);

  // ====== 페이지네이션: 페이지 버튼 목록 만들기 (최대 7개만 보여주기) ======
  const pageButtons = useMemo(() => {
    const maxButtons = 7;
    if (totalPages <= 0) return [];

    let start = Math.max(0, page - Math.floor(maxButtons / 2));
    let end = start + maxButtons;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(0, end - maxButtons);
    }

    const arr: number[] = [];
    for (let p = start; p < end; p++) arr.push(p);
    return arr;
  }, [page, totalPages]);

  const canPrev = page > 0;
  const canNext = totalPages > 0 && page < totalPages - 1;

  // ====== 검색 버튼 클릭 ======
  function onSearch() {
    // 검색하면 항상 0페이지부터
    loadBoards(0, keyword, searchType);
  }

  // 엔터로 검색
  function onKeywordKeyDown(e: any) {
    if (e.key === "Enter") onSearch();
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 min-h-screen lg:ml-64 transition-all duration-300">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">공지사항</h1>
            <div className="text-sm text-gray-500">
              {loading ? "불러오는 중..." : `총 ${totalElements}건`}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 flex flex-col gap-6">
            {/* 오류 표시 */}
            {errorMsg && (
              <div className="p-3 rounded border border-red-200 bg-red-50 text-red-700 text-sm">
                {errorMsg}
              </div>
            )}

            {/* Desktop Table View */}
            <div className="hidden lg:block">
              <DataTable columns={COLUMNS} data={rows} />
            </div>

            {/* Mobile Card View */}
            <div className="grid grid-cols-1 gap-4 lg:hidden">
              {rows.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-2"
                >
                  <div className="flex justify-between items-start">
                    <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded">
                      No. {item.id}
                    </span>
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 line-clamp-2">{item.title}</h3>
                  <div className="flex justify-between items-center text-sm text-gray-500 mt-2 pt-2 border-t border-gray-50">
                    <span>{item.author}</span>
                    <span className="flex items-center gap-1">
                      <span className="text-xs">조회</span> {item.views}
                    </span>
                  </div>
                </div>
              ))}

              {!loading && rows.length === 0 && (
                <div className="text-center text-sm text-gray-500 py-10">
                  조회된 데이터가 없습니다.
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="py-6">
              <Pagination
                currentPage={page + 1}                 // 서버 0-base → UI 1-base
                totalPages={totalPages}                // 서버 totalPages 그대로
                onPageChange={(p) => loadBoards(p - 1, keyword, searchType)} // UI 1-base → 서버 0-base
              />
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col lg:flex-row items-center justify-between mt-auto pt-4 border-t border-gray-100 gap-4">
              <div className="flex gap-2 w-full lg:w-auto">
                <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                  목록
                </Button>
                <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                  글쓰기
                </Button>
              </div>

              {/* 검색 영역 */}
              <div className="flex flex-col sm:flex-row items-center gap-2 w-full lg:w-auto">
                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="w-1/3 sm:w-32">
                    <SelectBox
                      options={[
                        { label: "제목", value: "title" },
                        { label: "내용", value: "content" },
                      ]}
                      className="h-9 py-1"
                      value={searchType}
                      onChange={(e) => {
                        const t = e.target.value as "title" | "content";
                        setSearchType(t);
                        loadBoards(0, keyword, t);
                      }}
                    />
                  </div>

                  <div className="flex-1 sm:w-64">
                    <Textbox
                      placeholder="검색어를 입력하세요"
                      className="h-9"
                      value={keyword}
                      onChange={(e: any) => setKeyword(e.target.value)}
                      onKeyDown={onKeywordKeyDown}
                    />
                  </div>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  className="h-9 px-4 border border-gray-300 w-full sm:w-auto"
                  disabled={loading}
                  onClick={onSearch}
                >
                  {loading ? "조회중..." : "조회"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
