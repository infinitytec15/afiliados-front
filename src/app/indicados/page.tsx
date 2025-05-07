"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientesTable from "@/components/clientes/ClientesTable";
import ExpandableReferralTree from "@/components/clientes/ExpandableReferralTree";
import { useAuth } from "@/contexts/AuthContext";

export default function IndicadosPage() {
  const { user } = useAuth();

  return (
    <div className="bg-background min-h-screen p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Meus Indicados</h1>
        <p className="text-muted-foreground">
          Gerencie seus indicados diretos e indiretos.
        </p>
      </header>

      <Tabs defaultValue="arvore" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="arvore">Árvore de Indicados</TabsTrigger>
          <TabsTrigger value="lista">Lista de Indicados</TabsTrigger>
        </TabsList>

        <TabsContent value="arvore" className="space-y-6">
          <ExpandableReferralTree />
        </TabsContent>

        <TabsContent value="lista" className="space-y-6">
          <ClientesTable />
        </TabsContent>
      </Tabs>

      <Card className="mt-6 bg-white">
        <CardHeader>
          <CardTitle>Estatísticas de Indicados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">
                Total de Indicados Diretos
              </p>
              <p className="text-2xl font-bold">18</p>
            </div>
            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">
                Total de Indicados Indiretos
              </p>
              <p className="text-2xl font-bold">7</p>
            </div>
            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">
                Conversão para Compras
              </p>
              <p className="text-2xl font-bold">68%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
