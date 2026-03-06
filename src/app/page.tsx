import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">KDD</h1>
              <p className="text-xs text-gray-500">국민대 학사 AI 비서</p>
            </div>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/chat" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
              채팅
            </Link>
            <Link
              href="/admin/login"
              className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              관리자
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            국민대학교 공식 학사 규정 기반
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            학사 규정, 이제 <span className="text-indigo-600">AI에게</span> 물어보세요
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            국민대학교 요람과 학칙을 학습한 AI가 학사 규정 관련 질문에 정확한 출처와 함께 답변해 드립니다.
            복잡한 규정도 쉽고 빠르게 확인하세요.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/chat"
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-all shadow-lg"
            >
              채팅 시작하기 →
            </Link>
            <Link
              href="/admin/login"
              className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all border border-gray-200 shadow"
            >
              관리자 로그인
            </Link>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">자연어 질의응답</h3>
              <p className="text-gray-600 leading-relaxed">
                어려운 규정 용어를 몰라도 괜찮습니다. 일상적인 언어로 질문하면 AI가 이해하고 정확한 답변을 제공합니다.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">근거 기반 답변</h3>
              <p className="text-gray-600 leading-relaxed">
                모든 답변은 실제 학칙 및 요람의 해당 조항을 근거로 제공됩니다. 출처 페이지와 조항을 직접 확인할 수 있습니다.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">멀티턴 대화</h3>
              <p className="text-gray-600 leading-relaxed">
                이전 대화 내용을 기억하여 연속적인 질문에도 맥락을 유지하며 자연스러운 대화를 이어갑니다.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-indigo-600 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
              <div>
                <div className="text-4xl font-bold mb-2">1,200+</div>
                <div className="text-indigo-200">학사 규정 문서 페이지</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-indigo-200">답변 정확도</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">5,000+</div>
                <div className="text-indigo-200">누적 질의응답 수</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-8">
          <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-500">
            <p>© 2025 KDD - 국민대학교 학사 AI 비서. 국민대학교 KDD 연구실.</p>
            <p className="mt-1">본 서비스의 답변은 참고용이며, 최종 결정은 교학처에 확인하시기 바랍니다.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
