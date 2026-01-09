import Login from "@/components/layout/Login";

export default function Home() {
  return (
    <div>
      <Login />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">프로젝트 리스트</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 px-4 py-2">번호</th>
                <th className="border border-gray-200 px-4 py-2">프로젝트명</th>
                <th className="border border-gray-200 px-4 py-2">시작일자</th>
                <th className="border border-gray-200 px-4 py-2">종료일자</th>
                <th className="border border-gray-200 px-4 py-2">담당업무</th>
                <th className="border border-gray-200 px-4 py-2">M/M</th>
                <th className="border border-gray-200 px-4 py-2">누적시간</th>
                <th className="border border-gray-200 px-4 py-2">총공정단계</th>
                <th className="border border-gray-200 px-4 py-2">총공정율</th>
                <th className="border border-gray-200 px-4 py-2">매출액</th>
              </tr>
            </thead>
            <tbody>
              {/* Example row */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2 text-center">1</td>
                <td className="border border-gray-200 px-4 py-2">차세대 시스템 구축</td>
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
        </div>
      </div>

    </div>
  );
}
