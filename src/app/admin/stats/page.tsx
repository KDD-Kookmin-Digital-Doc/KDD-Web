import AdminSidebar from "@/components/AdminSidebar";

const faqData = [
  { rank: 1, question: "졸업 요건이 어떻게 되나요?", count: 892, category: "졸업" },
  { rank: 2, question: "수강신청은 언제 하나요?", count: 743, category: "수강신청" },
  { rank: 3, question: "휴학 신청 방법이 어떻게 되나요?", count: 621, category: "휴학" },
  { rank: 4, question: "성적 이의신청은 어떻게 하나요?", count: 534, category: "성적" },
  { rank: 5, question: "복수전공 신청 조건은?", count: 487, category: "전공" },
  { rank: 6, question: "장학금 지원 기준이 어떻게 되나요?", count: 421, category: "장학금" },
  { rank: 7, question: "학점 인정 기준을 알고 싶습니다", count: 387, category: "학점" },
  { rank: 8, question: "편입학 절차가 어떻게 되나요?", count: 312, category: "편입" },
  { rank: 9, question: "영어 졸업 요건은 어떻게 충족하나요?", count: 298, category: "졸업" },
  { rank: 10, question: "계절학기 수강 제한이 있나요?", count: 256, category: "수강신청" },
];

const categoryData = [
  { label: "졸업", count: 1190, color: "bg-indigo-500" },
  { label: "수강신청", count: 999, color: "bg-blue-500" },
  { label: "휴학", count: 621, color: "bg-violet-500" },
  { label: "성적", count: 534, color: "bg-emerald-500" },
  { label: "전공", count: 487, color: "bg-amber-500" },
  { label: "장학금", count: 421, color: "bg-rose-500" },
  { label: "학점", count: 387, color: "bg-sky-500" },
  { label: "기타", count: 607, color: "bg-gray-400" },
];

const dailyData = [
  { day: "월", count: 842 },
  { day: "화", count: 1124 },
  { day: "수", count: 987 },
  { day: "목", count: 1247 },
  { day: "금", count: 1089 },
  { day: "토", count: 432 },
  { day: "일", count: 318 },
];

const maxCount = Math.max(...categoryData.map((d) => d.count));
const maxDaily = Math.max(...dailyData.map((d) => d.count));

const categoryBadge: Record<string, string> = {
  졸업: "bg-indigo-100 text-indigo-700",
  수강신청: "bg-blue-100 text-blue-700",
  휴학: "bg-violet-100 text-violet-700",
  성적: "bg-emerald-100 text-emerald-700",
  전공: "bg-amber-100 text-amber-700",
  장학금: "bg-rose-100 text-rose-700",
  학점: "bg-sky-100 text-sky-700",
  편입: "bg-orange-100 text-orange-700",
};

export default function StatsPage() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">통계</h1>
            <p className="text-gray-500 mt-1">질의응답 현황 및 FAQ 분석</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Category Bar Chart */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">카테고리별 질의 수</h2>
              <div className="space-y-4">
                {categoryData.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      <span className="text-sm text-gray-500">{item.count.toLocaleString()}건</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className={`${item.color} h-2.5 rounded-full transition-all`}
                        style={{ width: `${(item.count / maxCount) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Trend */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">요일별 질의 추이 (이번 주)</h2>
              <div className="flex items-end justify-between gap-3 h-48">
                {dailyData.map((item) => (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-xs text-gray-500 font-medium">{item.count >= 1000 ? (item.count / 1000).toFixed(1) + "k" : item.count}</span>
                    <div className="w-full flex items-end justify-center" style={{ height: "140px" }}>
                      <div
                        className="w-full bg-indigo-500 rounded-t-lg hover:bg-indigo-600 transition-colors"
                        style={{ height: `${(item.count / maxDaily) * 140}px` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{item.day}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                <span>주간 총 질의: <strong className="text-gray-900">6,039건</strong></span>
                <span>일 평균: <strong className="text-gray-900">863건</strong></span>
              </div>
            </div>
          </div>

          {/* FAQ Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">TOP 10 자주 묻는 질문</h2>
              <p className="text-sm text-gray-500 mt-1">전체 기간 누적 기준</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3 w-12">순위</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">질문</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">카테고리</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">질의 수</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 w-32">비율</th>
                  </tr>
                </thead>
                <tbody>
                  {faqData.map((item) => (
                    <tr key={item.rank} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${item.rank <= 3 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"}`}>
                          {item.rank}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-800">{item.question}</td>
                      <td className="px-4 py-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${categoryBadge[item.category] || "bg-gray-100 text-gray-600"}`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-900">{item.count.toLocaleString()}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                            <div
                              className="bg-indigo-500 h-1.5 rounded-full"
                              style={{ width: `${(item.count / faqData[0].count) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400 w-8 text-right">{Math.round((item.count / faqData[0].count) * 100)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
