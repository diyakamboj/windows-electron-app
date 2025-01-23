// app/components/layout/Header.tsx
"use client";
import { Mail } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-6">
      <div className="text-xl font-semibold">Dashboard</div>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Mail size={20} />
        </button>
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
      </div>
    </header>
  );
}
