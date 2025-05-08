"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ReferralUser {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  nivel: number;
  indicados?: ReferralUser[];
}

export default function ExpandableReferralTree() {
  const [expandedUsers, setExpandedUsers] = useState<Record<string, boolean>>(
    {},
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isCompactView, setIsCompactView] = useState(false);
  const [allExpanded, setAllExpanded] = useState(false);

  // Mock data para demonstração
  const mockReferrals: ReferralUser[] = [
    {
      id: "1",
      nome: "Maria Oliveira",
      email: "maria.oliveira@email.com",
      telefone: "(11) 91234-5678",
      cpf: "987.654.321-00",
      nivel: 1,
      indicados: [
        {
          id: "3",
          nome: "Pedro Santos",
          email: "pedro.santos@email.com",
          telefone: "(11) 92345-6789",
          cpf: "456.789.123-00",
          nivel: 2,
        },
        {
          id: "4",
          nome: "Ana Costa",
          email: "ana.costa@email.com",
          telefone: "(11) 93456-7890",
          cpf: "789.123.456-00",
          nivel: 2,
        },
      ],
    },
    {
      id: "2",
      nome: "Carlos Ferreira",
      email: "carlos.ferreira@email.com",
      telefone: "(11) 94567-8901",
      cpf: "321.654.987-00",
      nivel: 1,
      indicados: [
        {
          id: "5",
          nome: "Juliana Lima",
          email: "juliana.lima@email.com",
          telefone: "(11) 95678-9012",
          cpf: "654.987.321-00",
          nivel: 2,
        },
      ],
    },
    {
      id: "6",
      nome: "Roberto Alves",
      email: "roberto.alves@email.com",
      telefone: "(11) 96789-0123",
      cpf: "123.456.789-11",
      nivel: 1,
    },
  ];

  // Filtrar referrals baseado no termo de busca
  const filteredReferrals =
    searchTerm.trim() === ""
      ? mockReferrals
      : mockReferrals.filter((user) => {
          const searchTermLower = searchTerm.toLowerCase();
          return (
            user.nome.toLowerCase().includes(searchTermLower) ||
            user.email.toLowerCase().includes(searchTermLower)
          );
        });

  // Função para alternar a expansão de um usuário
  const toggleExpand = (userId: string) => {
    setExpandedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  // Função para expandir todos os nós
  const expandAll = () => {
    const newExpandedUsers: Record<string, boolean> = {};

    const processUser = (user: ReferralUser) => {
      if (user.indicados && user.indicados.length > 0) {
        newExpandedUsers[user.id] = true;
        user.indicados.forEach(processUser);
      }
    };

    mockReferrals.forEach(processUser);
    setExpandedUsers(newExpandedUsers);
    setAllExpanded(true);
  };

  // Função para recolher todos os nós
  const collapseAll = () => {
    setExpandedUsers({});
    setAllExpanded(false);
  };

  // Função para alternar entre expandir e colapsar todos
  const toggleExpandAll = () => {
    if (allExpanded) {
      collapseAll();
    } else {
      expandAll();
    }
  };

  // Renderiza um item de usuário na árvore
  const renderUserItem = (user: ReferralUser) => {
    const hasChildren = user.indicados && user.indicados.length > 0;
    const isExpanded = expandedUsers[user.id] || false;
    const isLevel1 = user.nivel === 1;

    return (
      <div key={user.id} className="relative mb-4">
        <div
          className={`flex items-center p-3 sm:p-4 rounded-lg shadow-sm border border-transparent ${isLevel1 ? "bg-blue-50" : "bg-purple-50"}`}
        >
          <div
            className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3 ${isLevel1 ? "bg-blue-500 text-white" : "bg-purple-500 text-white"}`}
          >
            <span>{user.nome.charAt(0)}</span>
          </div>

          <div className="flex-1 min-w-0">
            <div
              className={`text-left font-medium truncate w-full ${isLevel1 ? "text-blue-700" : "text-purple-700"}`}
            >
              {user.nome}
            </div>
            <div className="flex items-center mt-1 flex-wrap gap-y-1">
              <span
                className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium ${isLevel1 ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}`}
              >
                Nível {user.nivel}
              </span>
              {hasChildren && (
                <span className="ml-2 text-xs text-muted-foreground flex items-center">
                  {user.indicados!.length} indicado
                  {user.indicados!.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>

          {hasChildren && (
            <Button
              variant="ghost"
              size="sm"
              className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full ${isLevel1 ? "text-blue-600" : "text-purple-600"}`}
              onClick={() => toggleExpand(user.id)}
            >
              {isExpanded ? "−" : "+"}
            </Button>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="mt-2 ml-4 sm:ml-8 pl-2 sm:pl-4 border-l-2 border-dashed border-gray-300">
            {user.indicados!.map((child) => renderUserItem(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full bg-white overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-100 pb-4 sm:pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="text-xl sm:text-2xl font-bold text-blue-800">
            Árvore de Indicados
          </CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                placeholder="Buscar indicados..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 pl-8 text-sm shadow-sm"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleExpandAll}
                className="text-xs sm:text-sm flex-1 sm:flex-none hover:bg-blue-50 flex items-center gap-1"
              >
                {allExpanded ? "Recolher Tudo" : "Expandir Tudo"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCompactView(!isCompactView)}
                className={`hover:bg-blue-50 ${isCompactView ? "bg-blue-100" : ""}`}
              >
                Compactar
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent
        className={`p-3 sm:p-6 ${isCompactView ? "space-y-2" : "space-y-4"}`}
      >
        <div className="space-y-2 sm:space-y-4">
          {filteredReferrals.length > 0 ? (
            filteredReferrals.map((referral) => renderUserItem(referral))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm
                ? "Nenhum indicado encontrado com este termo."
                : "Você ainda não possui indicados."}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
