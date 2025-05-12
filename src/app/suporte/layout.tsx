"use client";

import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";

export default function SuporteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();

  // Redirecionar para login se não estiver autenticado
  if (!isAuthenticated) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar para telas maiores */}
      <div className="hidden md:block w-64 h-full">
        <DashboardSidebar />
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
