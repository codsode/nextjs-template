"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "@/store";
import { SignupForm } from "@/components/screen";
import { toast } from "react-toastify";
import type { User, Tokens } from "@/models";

export default function SignupPage() {
  const router = useRouter();
  const login = useAppStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (
    name: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    try {
      if (!password) {
        toast.error("Password required");
        return;
      }

      const user: User = {
        _id: Math.random().toString(),
        name: name,
        email: email,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const tokens: Tokens = {
        accessToken: "token_" + Date.now(),
        refreshToken: "refresh_" + Date.now(),
      };

      await login(user, tokens);
      toast.success("Account created!");
      router.push("/home");
    } catch {
      toast.error("Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Sign Up
        </h1>
        <SignupForm onSubmit={handleSignup} isLoading={isLoading} />
        <p className="text-center mt-6 text-sm text-gray-700">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
