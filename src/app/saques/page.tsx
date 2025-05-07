"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WalletIcon, ArrowDownIcon, CheckCircleIcon } from "lucide-react";

export default function SaquesPage() {
  const [activeTab, setActiveTab] = useState("solicitacoes");

  return (
    <div className="flex flex-col gap-6 p-6 bg-background">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Saques</h1>
        <Button className="flex items-center gap-2">
          <WalletIcon className="h-4 w-4" />
          Solicitar Saque
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Saldo Disponível
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$ 1.250,00</p>
            <p className="text-xs text-muted-foreground mt-1">
              Atualizado em 15/05/2023
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Em Processamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$ 350,00</p>
            <p className="text-xs text-muted-foreground mt-1">
              Será liberado em 20/05/2023
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Sacado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$ 4.750,00</p>
            <p className="text-xs text-muted-foreground mt-1">
              Desde o início do programa
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="solicitacoes" className="w-full">
        <TabsList>
          <TabsTrigger value="solicitacoes">Solicitações</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>
        <TabsContent value="solicitacoes" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Solicitar Novo Saque</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="valor">Valor do Saque</Label>
                  <Input
                    id="valor"
                    placeholder="R$ 0,00"
                    type="number"
                    min="100"
                    step="0.01"
                  />
                  <p className="text-xs text-muted-foreground">
                    Valor mínimo: R$ 100,00
                  </p>
                </div>

                <div className="pt-2">
                  <Button className="w-full">
                    <ArrowDownIcon className="mr-2 h-4 w-4" />
                    Solicitar Saque
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Solicitações em Andamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">R$ 350,00</p>
                    <p className="text-sm text-muted-foreground">
                      Solicitado em 10/05/2023
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-amber-500">
                    <span className="text-sm font-medium">
                      Em processamento
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historico" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Saques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">R$ 750,00</p>
                    <p className="text-sm text-muted-foreground">
                      Solicitado em 15/04/2023
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircleIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">Concluído</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">R$ 1.200,00</p>
                    <p className="text-sm text-muted-foreground">
                      Solicitado em 02/03/2023
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircleIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">Concluído</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">R$ 2.800,00</p>
                    <p className="text-sm text-muted-foreground">
                      Solicitado em 10/01/2023
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircleIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">Concluído</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
