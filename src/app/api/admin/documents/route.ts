import { NextRequest, NextResponse } from "next/server";

const MOCK_DOCUMENTS = [
  { id: "1", name: "2025학년도 국민대학교 요람", type: "PDF", pages: 312, uploadDate: "2025-03-01", status: "완료" },
  { id: "2", name: "학사운영규정", type: "PDF", pages: 48, uploadDate: "2025-03-01", status: "완료" },
  { id: "3", name: "대학원 학칙", type: "PDF", pages: 96, uploadDate: "2025-03-05", status: "완료" },
  { id: "4", name: "수강신청 안내", type: "HWP", pages: 12, uploadDate: "2025-03-10", status: "완료" },
  { id: "5", name: "장학금 규정", type: "PDF", pages: 24, uploadDate: "2025-03-15", status: "완료" },
];

export async function GET() {
  return NextResponse.json({ documents: MOCK_DOCUMENTS, total: MOCK_DOCUMENTS.length });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "파일이 필요합니다." }, { status: 400 });
    }

    const newDoc = {
      id: String(Date.now()),
      name: file.name,
      type: file.name.endsWith(".hwp") ? "HWP" : "PDF",
      pages: Math.floor(Math.random() * 100) + 10,
      uploadDate: new Date().toISOString().split("T")[0],
      status: "처리 중",
    };

    return NextResponse.json({ document: newDoc }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "문서 ID가 필요합니다." }, { status: 400 });
    }

    return NextResponse.json({ message: "문서가 삭제되었습니다." });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
