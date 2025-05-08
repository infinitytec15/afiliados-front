"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SimpleNotificationBell from "@/components/SimpleNotificationBell";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Afiliados Pro
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            href="/indicados"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Indicados
          </Link>
          <Link
            href="/financeiro"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Financeiro
          </Link>
          <Link
            href="/saques"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Saques
          </Link>
          <Link
            href="/materiais"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Materiais
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </Button>
          <SimpleNotificationBell />
          <Button variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t p-4 bg-background">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/dashboard"
              className="text-sm font-medium transition-colors hover:text-primary p-2 rounded-md hover:bg-accent"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/indicados"
              className="text-sm font-medium transition-colors hover:text-primary p-2 rounded-md hover:bg-accent"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Indicados
            </Link>
            <Link
              href="/financeiro"
              className="text-sm font-medium transition-colors hover:text-primary p-2 rounded-md hover:bg-accent"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Financeiro
            </Link>
            <Link
              href="/saques"
              className="text-sm font-medium transition-colors hover:text-primary p-2 rounded-md hover:bg-accent"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Saques
            </Link>
            <Link
              href="/materiais"
              className="text-sm font-medium transition-colors hover:text-primary p-2 rounded-md hover:bg-accent"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Materiais
            </Link>
            <Link
              href="/notificacoes"
              className="text-sm font-medium transition-colors hover:text-primary p-2 rounded-md hover:bg-accent"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Notificações
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
