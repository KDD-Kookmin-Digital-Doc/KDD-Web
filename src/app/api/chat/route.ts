import { NextRequest, NextResponse } from "next/server";

const MOCK_RESPONSES: Record<string, { message: string; sources: { title: string; page: number; article?: string; url?: string }[]; confidence: string }> = {
  default: {
    message:
      "안녕하세요! 국민대학교 학사 규정 AI 비서입니다. 학사 규정, 졸업 요건, 수강 신청, 성적 처리 등 학사 관련 질문을 해주시면 관련 규정을 찾아 답변해 드리겠습니다.",
    sources: [],
    confidence: "high",
  },
  졸업: {
    message:
      "국민대학교의 졸업 요건은 다음과 같습니다:\n\n1. **이수 학점**: 최소 130학점 이상 취득\n2. **평점 평균**: 전체 평점 2.0 이상 (D0 이상)\n3. **필수 이수 과목**: 교양 필수 및 전공 필수 과목 모두 이수\n4. **영어 졸업 요건**: 공인 영어 성적 기준 충족 또는 교내 영어 시험 합격\n5. **졸업 논문/시험**: 학과별 졸업 논문 또는 졸업 시험 합격\n\n자세한 사항은 소속 학과 학생부에 문의하시거나 학사지원팀에 확인하시기 바랍니다.",
    sources: [
      { title: "2025학년도 국민대학교 요람", page: 45, article: "제30조(졸업의 인정)" },
      { title: "학사운영규정", page: 12, article: "제15조(졸업 이수학점)" },
    ],
    confidence: "high",
  },
  수강신청: {
    message:
      "수강신청 관련 규정입니다:\n\n**수강신청 기간**: 매 학기 개강 약 2주 전\n**수강 학점 제한**: 학기당 최대 21학점 (직전 학기 4.0 이상 시 24학점까지 가능)\n**최소 수강 학점**: 학기당 최소 9학점 이상 (단, 졸업예정자 제외)\n\n수강신청 변경(정정)은 개강 후 1주일 이내에 가능하며, 이후에는 학과 사무실을 통해서만 변경 가능합니다.",
    sources: [
      { title: "2025학년도 국민대학교 요람", page: 78, article: "제20조(수강신청)" },
      { title: "학사운영규정", page: 8, article: "제10조(수강학점 제한)" },
    ],
    confidence: "high",
  },
  성적: {
    message:
      "성적 처리 관련 규정입니다:\n\n**성적 등급**: A+ (4.5), A0 (4.0), B+ (3.5), B0 (3.0), C+ (2.5), C0 (2.0), D+ (1.5), D0 (1.0), F (0.0)\n**성적 이의신청**: 성적 발표 후 1주일 이내\n**Pass/Fail 적용**: 교양 선택 과목 일부 해당\n\n중간고사, 기말고사, 과제, 출석 등을 종합하여 담당 교수가 산정하며, 상대평가 비율은 학과별로 상이합니다.",
    sources: [
      { title: "2025학년도 국민대학교 요람", page: 92, article: "제35조(성적 평가)" },
      { title: "학사운영규정", page: 18, article: "제22조(성적 처리)" },
    ],
    confidence: "medium",
  },
  휴학: {
    message:
      "휴학 관련 규정입니다:\n\n**일반 휴학**: 학기당 최대 2학기, 총 4학기까지 가능 (의무 복무 기간 제외)\n**신청 기간**: 학기 개강 후 4주 이내 신청 가능\n**복학**: 휴학 기간 만료 전 복학 신청 필수\n\n군 입대로 인한 휴학은 기간 제한 없이 인정되며, 휴학 중 재학생 신분이 유지됩니다.",
    sources: [
      { title: "2025학년도 국민대학교 요람", page: 55, article: "제25조(휴학)" },
    ],
    confidence: "high",
  },
};

function findMockResponse(message: string) {
  const keywords = ["졸업", "수강신청", "성적", "휴학"];
  for (const keyword of keywords) {
    if (message.includes(keyword)) {
      return MOCK_RESPONSES[keyword];
    }
  }
  return MOCK_RESPONSES.default;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "메시지가 필요합니다." }, { status: 400 });
    }

    await new Promise((resolve) => setTimeout(resolve, 800));

    const response = findMockResponse(message);

    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
