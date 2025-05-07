"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";

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
  const [selectedUser, setSelectedUser] = useState<ReferralUser | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth();

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

  // Função para alternar a expansão de um usuário
  const toggleExpand = (userId: string) => {
    setExpandedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  // Função para mostrar detalhes do usuário
  const showUserDetails = (user: ReferralUser) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  // Renderiza um item de usuário na árvore
  const renderUserItem = (user: ReferralUser, depth: number = 0) => {
    const hasChildren = user.indicados && user.indicados.length > 0;
    const isExpanded = expandedUsers[user.id] || false;

    return (
      <div key={user.id} className="mb-2">
        <div
          className={`flex items-center p-3 rounded-md ${depth === 0 ? "bg-primary/5" : depth === 1 ? "bg-primary/3" : ""} hover:bg-primary/10`}
          style={{ marginLeft: `${depth * 24}px` }}
        >
          {hasChildren ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 mr-2"
              onClick={() => toggleExpand(user.id)}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          ) : (
            <div className="w-8 mr-2 flex justify-center">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
          <div className="flex-1">
            <button
              onClick={() => showUserDetails(user)}
              className="text-left font-medium text-primary hover:underline"
            >
              {user.nome}
            </button>
            <span className="ml-2 text-xs text-muted-foreground">
              Nível {user.nivel}
            </span>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="mt-1">
            {user.indicados!.map((child) => renderUserItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Árvore de Indicados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockReferrals.length > 0 ? (
            mockReferrals.map((referral) => renderUserItem(referral))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Você ainda não possui indicados.
            </div>
          )}
        </div>

        {/* Dialog para exibir detalhes do usuário */}
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            if (isDialogOpen !== open) {
              setIsDialogOpen(open);
            }
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalhes do Indicado</DialogTitle>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Nome
                    </p>
                    <p className="text-base">{selectedUser.nome}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Nível
                    </p>
                    <p className="text-base">{selectedUser.nivel}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Email
                    </p>
                    <p className="text-base">{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Telefone
                    </p>
                    <p className="text-base">{selectedUser.telefone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      CPF
                    </p>
                    <p className="text-base">{selectedUser.cpf}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
