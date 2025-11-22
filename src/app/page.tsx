"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store";
import { LoadingSpinner } from "@/components/ui";

export default function RootPage() {
  const router = useRouter();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const isHydrated = useAppStore((state) => state.__hydrated);

  useEffect(() => {
    if (isHydrated) {
      if (isAuthenticated) {
        router.push("/home");
      } else {
        router.push("/login");
      }
    }
  }, [isAuthenticated, isHydrated, router]);

  return <LoadingSpinner message="Loading..." />;
}
