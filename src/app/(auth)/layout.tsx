"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store";
import { LoadingSpinner } from "@/components/ui";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const isHydrated = useAppStore((state) => state.__hydrated);

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, isHydrated, router]);

  // Show loading while hydrating
  if (!isHydrated) {
    return <LoadingSpinner message="Loading..." />;
  }

  // Show redirecting if authenticated
  if (isAuthenticated) {
    return <LoadingSpinner message="Redirecting..." />;
  }

  return <>{children}</>;
}
