import BottomNav from '@/components/layout/BottomNav';
import { PrivacyProvider } from '@/components/privacy/PrivacyProvider';
import PrivacyToggle from '@/components/privacy/PrivacyToggle';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-container">
      <PrivacyProvider>
        <main className="min-h-screen pb-20 pt-4 px-4">
          <div className="mb-3 flex justify-end">
            <PrivacyToggle />
          </div>
          {children}
        </main>
        <BottomNav />
      </PrivacyProvider>
    </div>
  );
}
