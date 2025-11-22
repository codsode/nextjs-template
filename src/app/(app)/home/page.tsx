"use client";

import React from "react";
import { useAppStore } from "@/store";
import { HomePage } from "@/components/screen";

export default function Home() {
  const user = useAppStore((state) => state.user);

  return <HomePage user={user} />;
}
