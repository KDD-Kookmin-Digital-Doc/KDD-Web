import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";

const stats = [
  { label: "총 문서 수", value: "30", sub: "PDF 24개, HWP 6개", icon: "📄", color: "bg-blue-50 text-blue-700" },
  { label: "오늘 질의 수", value: "1,247", sub: "전일 대비 +12%", icon: "💬", color: "bg-emerald-50 text-emerald-700" },
  { label: "활성 사용자", value: "384", sub: "현재 온라인", icon: "👥", color: "bg-violet-50 text-violet-700" },
  { label: "평균 응답시간", value: "1.2초", sub: "지난 1시간", icon: "⚡", color: "bg-amber-50 text-amber-700" },
];

const recentActivity = [
  { type: "upload", desc: "2025학년도 국민대학교 요람 (개정본)", time: "10분 전", icon: "📤" },
  { type: "query", desc: "졸업 요건 관련 질문 급증 (오늘 248회)", time: "1시간 전", icon: "📈" },
  { type: "upload", desc: "학사운영규정 v2.1 업로드 완료", time: "3시간 전", icon: "✅" },
  { type: "system", desc: "벡터 DB 인덱싱 완료 (30개 문서)", time: "5시간 전", icon: "🔄" },
  { type: "query", desc: "수강신청 관련 FAQ 자동 생성됨", time: "1일 전", icon: "🤖" },
];

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
              <p className="text-gray-500 mt-1">KDD 학사 AI 비서 관리 현황</p>
            </div>
            <Link
              href="/admin/documents"
              className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              문서 업로드
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-xl mb-4 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-gray-700">{stat.label}</div>
                <div className="text-xs text-gray-400 mt-1">{stat.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-5">최근 활동</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 font-medium">{activity.desc}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-5">빠른 작업</h2>
              <div className="space-y-3">
                <Link
                  href="/admin/documents"
                  className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span className="text-sm font-medium text-indigo-700">문서 업로드</span>
                </Link>
                <Link
                  href="/admin/stats"
                  className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-sm font-medium text-emerald-700">통계 보기</span>
                </Link>
                <Link
                  href="/chat"
                  className="flex items-center gap-3 p-3 rounded-xl bg-violet-50 hover:bg-violet-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-sm font-medium text-violet-700">채팅 테스트</span>
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">시스템 상태</h3>
                <div className="space-y-2.5">
                  {[
                    { label: "벡터 DB", status: "정상", ok: true },
                    { label: "AI 모델", status: "정상", ok: true },
                    { label: "문서 처리", status: "대기 중", ok: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{item.label}</span>
                      <span className={`text-xs font-medium flex items-center gap-1 ${item.ok ? "text-emerald-600" : "text-amber-600"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.ok ? "bg-emerald-500" : "bg-amber-500"}`}></span>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
