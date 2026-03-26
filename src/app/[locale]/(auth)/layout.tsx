import { AuthGuard } from '@/features/auth';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard mode="guest">{children}</AuthGuard>;
}
