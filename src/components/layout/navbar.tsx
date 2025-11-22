"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store";

export const Navbar: React.FC = () => {
  const router = useRouter();
  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/home" className="font-bold text-lg">
          App
        </Link>

        <div className="flex items-center gap-6">
          <span className="text-sm">{user?.name}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white text-blue-600 rounded font-medium hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
