import type { Metadata } from 'next';
import { AppProvider } from '@/lib/store';
import { Header } from '@/components/layout/Header';
import { PanelSwitcher } from '@/components/layout/PanelSwitcher';
import { BottomNav } from '@/components/layout/BottomNav';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hometown Connect',
  description: 'Stay connected to your hometown - schemes, utilities, news & complaints',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className="antialiased min-h-screen pb-20 bg-slate-50 text-slate-800">
        <AppProvider>
          <Header />
          <main className="max-w-2xl mx-auto px-4">
            <PanelSwitcher />
            {children}
          </main>
          <BottomNav />
        </AppProvider>
      </body>
    </html>
  );
}
