"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "@/store";
import { LoginForm } from "@/components/screen";
import { toast } from "react-toastify";
import type { User, Tokens } from "@/models";

export default function LoginPage() {
  const router = useRouter();
  const login = useAppStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      if (!password) {
        toast.error("Password required");
        return;
      }

      const user: User = {
        _id: "1",
        name: "User",
        email: email,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const tokens: Tokens = {
        accessToken: "token_" + Date.now(),
        refreshToken: "refresh_" + Date.now(),
      };

      await login(user, tokens);
      toast.success("Login successful!");
      router.push("/home");
    } catch {
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Login
        </h1>
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        <p className="text-center mt-6 text-sm text-gray-700">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 hover:underline font-semibold"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
