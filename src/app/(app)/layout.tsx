"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store";
import { Navbar } from "@/components/layout";
import { LoadingSpinner } from "@/components/ui";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const isHydrated = useAppStore((state) => state.__hydrated);

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isHydrated, router]);

  // Show loading while hydrating
  if (!isHydrated) {
    return <LoadingSpinner message="Loading..." />;
  }

  // Show redirecting if not authenticated
  if (!isAuthenticated) {
    return <LoadingSpinner message="Redirecting..." />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-4">{children}</main>
    </div>
  );
}
