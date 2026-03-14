import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "KDD | 소융대 AI RAG 에이전트",
  description:
    "국민대학교 소프트웨어융합대학 특화 AI RAG 기반 에이전트 — 학사 규정, 공지, FAQ를 스마트하게 탐색하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={''}
      >
        {children}
      </body>
    </html>
  );
}
