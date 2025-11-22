import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store";

/**
 * Hook to protect auth pages (login, signup, etc.) from authenticated users
 * Redirects to /home if user is already logged in
 * Returns hydration state and loading state during redirect
 */
export const useAuthPageProtection = () => {
  const router = useRouter();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const isHydrated = useAppStore((state) => state.__hydrated);

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, isHydrated, router]);

  return {
    isHydrated,
    isAuthenticated,
    isLoading: !isHydrated,
    isRedirecting: isAuthenticated && isHydrated,
  };
};
