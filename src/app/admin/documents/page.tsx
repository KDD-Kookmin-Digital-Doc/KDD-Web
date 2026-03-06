"use client";

import { useState, useRef, useCallback } from "react";
import AdminSidebar from "@/components/AdminSidebar";

interface Document {
  id: string;
  name: string;
  type: string;
  pages: number;
  uploadDate: string;
  status: string;
}

const INITIAL_DOCS: Document[] = [
  { id: "1", name: "2025학년도 국민대학교 요람", type: "PDF", pages: 312, uploadDate: "2025-03-01", status: "완료" },
  { id: "2", name: "학사운영규정", type: "PDF", pages: 48, uploadDate: "2025-03-01", status: "완료" },
  { id: "3", name: "대학원 학칙", type: "PDF", pages: 96, uploadDate: "2025-03-05", status: "완료" },
  { id: "4", name: "수강신청 안내", type: "HWP", pages: 12, uploadDate: "2025-03-10", status: "완료" },
  { id: "5", name: "장학금 규정", type: "PDF", pages: 24, uploadDate: "2025-03-15", status: "완료" },
];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(INITIAL_DOCS);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadFileName, setUploadFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    files.forEach((file) => uploadFile(file));
  }, []);

  const uploadFile = (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!["pdf", "hwp"].includes(ext || "")) {
      alert("PDF 또는 HWP 파일만 업로드 가능합니다.");
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadFileName(file.name);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        const newDoc: Document = {
          id: Date.now().toString(),
          name: file.name.replace(/\.(pdf|hwp)$/i, ""),
          type: ext === "hwp" ? "HWP" : "PDF",
          pages: Math.floor(Math.random() * 100) + 10,
          uploadDate: new Date().toISOString().split("T")[0],
          status: "완료",
        };
        setDocuments((prev) => [newDoc, ...prev]);
        setTimeout(() => {
          setUploading(false);
          setUploadProgress(0);
          setUploadFileName("");
        }, 500);
      }
      setUploadProgress(Math.min(progress, 100));
    }, 150);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => uploadFile(file));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = (id: string) => {
    if (confirm("문서를 삭제하시겠습니까?")) {
      setDocuments((prev) => prev.filter((d) => d.id !== id));
    }
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      완료: "bg-emerald-100 text-emerald-700",
      "처리 중": "bg-amber-100 text-amber-700",
      오류: "bg-red-100 text-red-700",
    };
    return (
      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${styles[status] || "bg-gray-100 text-gray-600"}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">문서 관리</h1>
            <p className="text-gray-500 mt-1">학사 규정 문서를 업로드하고 관리합니다</p>
          </div>

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-2xl p-10 mb-8 text-center transition-all ${
              isDragging ? "border-indigo-500 bg-indigo-50" : "border-gray-200 bg-white hover:border-indigo-300"
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">파일을 드래그하거나 클릭하여 업로드</h3>
            <p className="text-sm text-gray-500 mb-4">PDF, HWP 파일 지원 · 최대 50MB</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              파일 선택
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.hwp"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">{uploadFileName} 업로드 중...</span>
                </div>
                <span className="text-sm text-indigo-600 font-medium">{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Documents Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">업로드된 문서</h2>
              <span className="text-sm text-gray-500">{documents.length}개 문서</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">문서명</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">형식</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">페이지</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">업로드일</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">상태</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${doc.type === "PDF" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>
                            {doc.type}
                          </div>
                          <span className="text-sm font-medium text-gray-800">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">{doc.type}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{doc.pages}p</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{doc.uploadDate}</td>
                      <td className="px-4 py-4">{statusBadge(doc.status)}</td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="text-xs text-gray-400 hover:text-red-600 transition-colors font-medium"
                        >
                          삭제
                        </button>
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
