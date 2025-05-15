"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboardIcon,
  UsersIcon,
  LineChartIcon,
  WalletIcon,
  FileTextIcon,
  SettingsIcon,
  HelpCircleIcon,
  LogOutIcon,
} from "lucide-react";
import { Icon } from "@iconify/react";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const SidebarItem = ({ href, icon, label, isActive }: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-primary/5 hover:text-foreground",
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

interface DashboardSidebarProps {
  className?: string;
}

const DashboardSidebar = ({ className }: DashboardSidebarProps) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const sidebarItems = [
    {
      href: "/dashboard",
      icon: <LayoutDashboardIcon className="h-5 w-5" />,
      label: "Dashboard",
    },
    {
      href: "/indicados",
      icon: <UsersIcon className="h-5 w-5" />,
      label: "Meus Indicados",
    },
    {
      href: "/financeiro",
      icon: <LineChartIcon className="h-5 w-5" />,
      label: "Financeiro",
    },
    {
      href: "/saques",
      icon: <WalletIcon className="h-5 w-5" />,
      label: "Saques",
    },
    {
      href: "/materiais",
      icon: <FileTextIcon className="h-5 w-5" />,
      label: "Materiais",
    },
    {
      href: "/gamificacao",
      icon: <LineChartIcon className="h-5 w-5" />,
      label: "Benefícios",
    },
    {
      href: "/configuracoes",
      icon: <SettingsIcon className="h-5 w-5" />,
      label: "Configurações",
    },
    {
      href: "/suporte",
      icon: <HelpCircleIcon className="h-5 w-5" />,
      label: "Suporte",
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-background border-r border-border p-4",
        className,
      )}
    >
      <div className="mb-8 px-3">
        <h2 className="text-xl font-bold">Programa de Afiliados</h2>
        {user && (
          <p className="text-sm text-muted-foreground mt-1">{user.name}</p>
        )}
      </div>

      <nav className="space-y-1 flex-1">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={pathname === item.href}
          />
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t border-border">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOutIcon className="h-5 w-5" />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
