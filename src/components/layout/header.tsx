"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="w-full py-4 px-6 md:px-8 flex items-center justify-between bg-background border-b border-border">
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold text-foreground">
          Programa de Afiliados
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:inline-block">
              Olá, {user?.name}
            </span>
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <Button variant="ghost" onClick={logout}>
              Sair
            </Button>
          </div>
        ) : (
          <Link href="/login">
            <Button variant="outline">Entrar</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
