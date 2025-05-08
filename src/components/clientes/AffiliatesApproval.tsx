"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface PendingAffiliate {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  dataSubmissao: string;
  status: "pendente" | "aprovado" | "rejeitado";
}

export default function AffiliatesApproval() {
  const { user } = useAuth();

  // Mock data para demonstração
  const [pendingAffiliates, setPendingAffiliates] = useState<
    PendingAffiliate[]
  >([
    {
      id: "101",
      nome: "Lucas Mendes",
      email: "lucas.mendes@email.com",
      telefone: "(11) 98765-4321",
      cpf: "123.456.789-10",
      dataSubmissao: "2023-10-15",
      status: "pendente",
    },
    {
      id: "102",
      nome: "Mariana Costa",
      email: "mariana.costa@email.com",
      telefone: "(21) 97654-3210",
      cpf: "987.654.321-00",
      dataSubmissao: "2023-10-16",
      status: "pendente",
    },
    {
      id: "103",
      nome: "Rafael Oliveira",
      email: "rafael.oliveira@email.com",
      telefone: "(31) 96543-2109",
      cpf: "456.789.123-00",
      dataSubmissao: "2023-10-17",
      status: "pendente",
    },
  ]);

  const handleApprove = (id: string) => {
    setPendingAffiliates((prev) =>
      prev.map((affiliate) =>
        affiliate.id === id ? { ...affiliate, status: "aprovado" } : affiliate,
      ),
    );
    // Em um caso real, aqui seria feita uma chamada à API
  };

  const handleReject = (id: string) => {
    setPendingAffiliates((prev) =>
      prev.map((affiliate) =>
        affiliate.id === id ? { ...affiliate, status: "rejeitado" } : affiliate,
      ),
    );
    // Em um caso real, aqui seria feita uma chamada à API
  };

  const filteredAffiliates = pendingAffiliates.filter(
    (affiliate) => affiliate.status === "pendente",
  );

  return (
    <Card className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-xl">
        <CardTitle className="text-xl font-bold flex items-center">
          <AlertCircle className="mr-2 h-5 w-5" />
          Aprovações Pendentes
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {filteredAffiliates.length > 0 ? (
          <div className="space-y-4">
            {filteredAffiliates.map((affiliate) => (
              <div
                key={affiliate.id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center"
                style={{
                  animation: "fadeIn 0.5s ease-in-out",
                }}
              >
                <div>
                  <h3 className="font-medium text-gray-900">
                    {affiliate.nome}
                  </h3>
                  <p className="text-sm text-gray-500">{affiliate.email}</p>
                  <p className="text-xs text-gray-400">
                    Submetido em: {affiliate.dataSubmissao}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleApprove(affiliate.id)}
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Check className="h-4 w-4 mr-1" /> Aprovar
                  </Button>
                  <Button
                    onClick={() => handleReject(affiliate.id)}
                    variant="destructive"
                    size="sm"
                  >
                    <X className="h-4 w-4 mr-1" /> Rejeitar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Não há aprovações pendentes no momento.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
