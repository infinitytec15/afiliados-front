"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SimpleHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const unreadNotifications = 2;

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <button
            className="md:hidden p-2"
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
            >
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Afiliados Pro
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium transition-colors hover:text-blue-600"
          >
            Dashboard
          </Link>
          <Link
            href="/indicados"
            className="text-sm font-medium transition-colors hover:text-blue-600"
          >
            Indicados
          </Link>
          <Link
            href="/financeiro"
            className="text-sm font-medium transition-colors hover:text-blue-600"
          >
            Financeiro
          </Link>
          <Link
            href="/saques"
            className="text-sm font-medium transition-colors hover:text-blue-600"
          >
            Saques
          </Link>
          <Link
            href="/materiais"
            className="text-sm font-medium transition-colors hover:text-blue-600"
          >
            Materiais
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              className="p-2 rounded-full hover:bg-gray-100 relative"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
              {unreadNotifications > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg border overflow-hidden z-50">
                <div className="p-3 border-b flex justify-between items-center">
                  <h3 className="font-medium">Notificações</h3>
                  <button className="text-xs text-blue-600 hover:underline">
                    Marcar todas como lidas
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  <div className="p-3 border-b bg-blue-50">
                    <div className="flex justify-between">
                      <p className="font-medium text-sm">Novo Afiliado</p>
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Maria Oliveira se cadastrou como afiliada.
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Agora mesmo</p>
                  </div>
                  <div className="p-3 border-b bg-blue-50">
                    <div className="flex justify-between">
                      <p className="font-medium text-sm">Comissão Recebida</p>
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Você recebeu uma comissão de R$ 150,00.
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      5 minutos atrás
                    </p>
                  </div>
                  <div className="p-3 border-b">
                    <p className="font-medium text-sm">Documentos Pendentes</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Carlos Ferreira precisa enviar documentos.
                    </p>
                    <p className="text-xs text-gray-400 mt-1">1 hora atrás</p>
                  </div>
                </div>
                <div className="p-2 text-center border-t">
                  <Link
                    href="/notificacoes"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Ver todas as notificações
                  </Link>
                </div>
              </div>
            )}
          </div>

          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t p-4 bg-white">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/dashboard"
              className="text-sm font-medium p-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/indicados"
              className="text-sm font-medium p-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Indicados
            </Link>
            <Link
              href="/financeiro"
              className="text-sm font-medium p-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Financeiro
            </Link>
            <Link
              href="/saques"
              className="text-sm font-medium p-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Saques
            </Link>
            <Link
              href="/materiais"
              className="text-sm font-medium p-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Materiais
            </Link>
            <Link
              href="/notificacoes"
              className="text-sm font-medium p-2 rounded-md hover:bg-gray-100"
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
