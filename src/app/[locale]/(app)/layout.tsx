import { AuthGuard } from '@/features/auth';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard mode="protected">
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </div>
    </AuthGuard>
  );
}
