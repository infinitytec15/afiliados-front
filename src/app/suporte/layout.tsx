"use client";

import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";

export default function SuporteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();

  if (!isLoading && !user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
