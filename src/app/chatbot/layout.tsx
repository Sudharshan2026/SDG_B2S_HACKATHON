import { Suspense } from 'react';

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<div className="p-6 text-slate-500">Loading...</div>}>{children}</Suspense>;
}
