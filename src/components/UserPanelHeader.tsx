"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Search,
  User,
  Menu,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SimpleNotificationBell from "@/components/SimpleNotificationBell";

interface UserPanelHeaderProps {
  userName?: string;
  userAvatar?: string;
  userInitials?: string;
}

export default function UserPanelHeader({
  userName = "Usuário",
  userAvatar,
  userInitials = "U",
}: UserPanelHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // Implement logout functionality here
    console.log("Logout clicked");
  };

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
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/dashboard" className="flex items-center gap-2">
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
            <Search className="h-5 w-5" />
          </Button>

          {/* Notification Bell Component */}
          <SimpleNotificationBell />

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 h-9 px-2"
              >
                <Avatar className="h-8 w-8">
                  {userAvatar && (
                    <AvatarImage src={userAvatar} alt={userName} />
                  )}
                  <AvatarFallback className="bg-primary/10">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-block text-sm font-medium">
                  {userName}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{userName}</p>
                  <p className="text-xs text-muted-foreground">
                    usuario@exemplo.com
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/configuracoes"
                  className="cursor-pointer w-full flex items-center"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/suporte"
                  className="cursor-pointer w-full flex items-center"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Suporte</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
            <Link
              href="/configuracoes"
              className="text-sm font-medium transition-colors hover:text-primary p-2 rounded-md hover:bg-accent"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Configurações
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
