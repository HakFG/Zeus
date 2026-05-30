import BottomNav from '@/components/layout/BottomNav';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-container">
      <main className="min-h-screen pb-20 pt-4 px-4">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
