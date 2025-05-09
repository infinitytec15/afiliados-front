"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  UserCog,
  Settings,
  Bell,
  LogOut,
  ChevronDown,
  Layers,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Usuários",
      href: "/admin/usuarios",
      icon: <Users className="h-5 w-5" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Cadastro Admin",
      href: "/admin/cadastro",
      icon: <UserPlus className="h-5 w-5" />,
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Afiliados",
      href: "/admin/afiliados",
      icon: <UserCog className="h-5 w-5" />,
      color: "from-orange-500 to-amber-500",
    },
    {
      title: "Suporte",
      href: "/admin/suporte",
      icon: <MessageSquare className="h-5 w-5" />,
      color: "from-purple-500 to-violet-500",
    },
    {
      title: "Configurações",
      href: "/admin/configuracoes",
      icon: <Settings className="h-5 w-5" />,
      color: "from-cyan-500 to-blue-500",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-gradient-to-b from-blue-900 to-indigo-900 text-white shadow-xl rounded-r-xl overflow-hidden">
        <div className="p-4 border-b border-indigo-700 bg-gradient-to-r from-blue-800 to-indigo-800">
          <div className="flex items-center space-x-2">
            <div className="bg-white p-2 rounded-lg shadow-inner">
              <Layers className="h-8 w-8 text-indigo-600" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-100">
              Admin Panel
            </h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm rounded-xl transition-all duration-200 group relative overflow-hidden",
                  isActive
                    ? `bg-gradient-to-r ${item.color} text-white shadow-md`
                    : "text-blue-100 hover:bg-blue-800/50",
                )}
              >
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-10",
                    !isActive && "bg-gradient-to-r " + item.color,
                  )}
                ></div>
                <div className="mr-3 bg-white/10 p-1.5 rounded-lg">
                  {item.icon}
                </div>
                <span>{item.title}</span>
                {isActive && (
                  <div className="absolute right-0 top-0 h-full w-1 bg-white"></div>
                )}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-indigo-700 bg-gradient-to-r from-blue-800/50 to-indigo-800/50">
          <Button
            variant="ghost"
            className="w-full justify-start text-blue-100 hover:bg-blue-700/50 hover:text-white group relative overflow-hidden rounded-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-10"></div>
            <LogOut className="h-5 w-5 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-md z-10 rounded-b-xl">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0"
                  >
                    <Layers className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {menuItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href} className="flex items-center">
                        <div
                          className={`mr-2 p-1 rounded-md bg-gradient-to-r ${item.color} text-white`}
                        >
                          {item.icon}
                        </div>
                        <span>{item.title}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex-1 md:ml-4">
              <h2 className="text-xl font-semibold text-gray-800 md:block hidden bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Painel Administrativo
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative bg-gray-100 rounded-full"
                  >
                    <Bell className="h-5 w-5 text-blue-600" />
                    <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="flex items-center justify-between p-4 border-b">
                    <h4 className="font-medium">Notificações</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-blue-600"
                    >
                      Marcar todas como lidas
                    </Button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <div className="p-4 border-b hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Novo ticket de suporte
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            João Silva abriu um novo ticket sobre pagamento de
                            comissão
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            Há 10 minutos
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-b hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <UserPlus className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Novo afiliado cadastrado
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Maria Oliveira completou o cadastro como afiliada
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            Há 30 minutos
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 border-t">
                    <Button
                      variant="ghost"
                      className="w-full text-sm justify-center text-blue-600"
                    >
                      Ver todas as notificações
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 bg-gray-100 rounded-full pl-1 pr-3"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium shadow-inner">
                      A
                    </div>
                    <span className="hidden md:inline-block font-medium text-gray-700">
                      Admin
                    </span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="cursor-pointer">
                    <div className="flex items-center w-full">Perfil</div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <div className="flex items-center w-full">
                      Configurações
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500">
                    <div className="flex items-center w-full">Sair</div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
