import SelectBox from "@/components/ui/SelectBox";

export default function ReportPage() {
  return (
    <div className="flex flex-col gap-4 p-4 sm:ml-64">
      <h1 className="text-2xl font-bold">Report</h1>
      <SelectBox label="Report" options={[]} />
       <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">프로젝트 리스트</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200 text-sm">
            <thead className="bg-[#0F172A] text-white">
              <tr>
                <th className="border border-indigo-900/30 px-4 py-3 font-semibold text-left">번호</th>
                <th className="border border-indigo-900/30 px-4 py-3 font-semibold text-left">프로젝트명</th>
                <th className="border border-indigo-900/30 px-4 py-3 font-semibold text-center">시작일자</th>
                <th className="border border-indigo-900/30 px-4 py-3 font-semibold text-center">종료일자</th>
                <th className="border border-indigo-900/30 px-4 py-3 font-semibold text-left">담당업무</th>
                <th className="border border-indigo-900/30 px-4 py-3 font-semibold text-right">M/M</th>
                <th className="border border-indigo-900/30 px-4 py-3 font-semibold text-right">누적시간</th>
                <th className="border border-indigo-900/30 px-4 py-3 font-semibold text-center">총공정단계</th>
                <th className="border border-indigo-900/30 px-4 py-3 font-semibold text-right">총공정율</th>
                <th className="border border-indigo-900/30 px-4 py-3 font-semibold text-right">매출액</th>
              </tr>
            </thead>
            <tbody>
              {/* Example row */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2 text-center">1</td>
                <td className="border border-gray-200 px-4 py-2">차세대 시스템 구축1</td>
                <td className="border border-gray-200 px-4 py-2 text-center">2024-01-01</td>
                <td className="border border-gray-200 px-4 py-2 text-center">2024-12-31</td>
                <td className="border border-gray-200 px-4 py-2">프론트엔드 개발</td>
                <td className="border border-gray-200 px-4 py-2 text-right">1.0</td>
                <td className="border border-gray-200 px-4 py-2 text-right">160h</td>
                <td className="border border-gray-200 px-4 py-2 text-center">구현</td>
                <td className="border border-gray-200 px-4 py-2 text-right">65%</td>
                <td className="border border-gray-200 px-4 py-2 text-right">50,000,000</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2 text-center">2</td>
                <td className="border border-gray-200 px-4 py-2">차세대 시스템 구축2</td>
                <td className="border border-gray-200 px-4 py-2 text-center">2024-01-01</td>
                <td className="border border-gray-200 px-4 py-2 text-center">2024-12-31</td>
                <td className="border border-gray-200 px-4 py-2">프론트엔드 개발</td>
                <td className="border border-gray-200 px-4 py-2 text-right">1.0</td>
                <td className="border border-gray-200 px-4 py-2 text-right">160h</td>
                <td className="border border-gray-200 px-4 py-2 text-center">구현</td>
                <td className="border border-gray-200 px-4 py-2 text-right">65%</td>
                <td className="border border-gray-200 px-4 py-2 text-right">50,000,000</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2 text-center">3</td>
                <td className="border border-gray-200 px-4 py-2">차세대 시스템 구축3</td>
                <td className="border border-gray-200 px-4 py-2 text-center">2024-01-01</td>
                <td className="border border-gray-200 px-4 py-2 text-center">2024-12-31</td>
                <td className="border border-gray-200 px-4 py-2">프론트엔드 개발</td>
                <td className="border border-gray-200 px-4 py-2 text-right">1.0</td>
                <td className="border border-gray-200 px-4 py-2 text-right">160h</td>
                <td className="border border-gray-200 px-4 py-2 text-center">구현</td>
                <td className="border border-gray-200 px-4 py-2 text-right">65%</td>
                <td className="border border-gray-200 px-4 py-2 text-right">50,000,000</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-8 grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold">현재주차 그 외 업무</h3>
              <textarea
                className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="현재주차 기타 업무 내용을 입력하세요."
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold">차주 그 외 업무</h3>
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
