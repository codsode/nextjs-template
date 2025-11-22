"use client";

import React from "react";
import type { User } from "@/models";

interface HomePageProps {
  user: User | null;
}

export const HomePage: React.FC<HomePageProps> = ({ user }) => {
  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-2 text-gray-900">
        Welcome, {user?.name}!
      </h1>
      <p className="text-lg text-gray-700 mb-8">Email: {user?.email}</p>

      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-6">
        <p className="text-gray-900 text-base">
          You are successfully logged in! You can use the logout button in the
          navbar.
        </p>
      </div>

      <div className="space-y-2 text-gray-700">
        <p className="text-gray-900 font-semibold">Features:</p>
        <p className="ml-4">• Simple and clean interface</p>
        <p className="ml-4">• Secure authentication</p>
        <p className="ml-4">• Protected routes</p>
      </div>
    </div>
  );
};
