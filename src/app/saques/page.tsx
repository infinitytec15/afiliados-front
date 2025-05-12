"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  WalletIcon,
  ArrowDownIcon,
  CheckCircleIcon,
  ClockIcon,
  HistoryIcon,
  CreditCardIcon,
} from "lucide-react";
import UserPanelHeader from "@/components/UserPanelHeader";

export default function SaquesPage() {
  const [activeTab, setActiveTab] = useState("solicitacoes");

  return (
    <>
      <UserPanelHeader />
      <div className="flex flex-col gap-6 p-6 bg-background bg-gradient-to-br from-background to-secondary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <CreditCardIcon className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Saques</h1>
          </div>
          <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 shadow-lg text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105">
            <WalletIcon className="h-5 w-5" />
            Solicitar Saque
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-all duration-200">
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

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800 shadow-lg hover:shadow-xl transition-all duration-200">
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

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800 shadow-lg hover:shadow-xl transition-all duration-200">
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

        <Tabs
          defaultValue="solicitacoes"
          className="w-full rounded-xl overflow-hidden border shadow-lg bg-card"
        >
          <TabsList className="w-full justify-start p-1 bg-muted/50">
            <TabsTrigger
              value="solicitacoes"
              className="flex items-center gap-2"
            >
              <ClockIcon className="h-4 w-4" /> Solicitações
            </TabsTrigger>
            <TabsTrigger value="historico" className="flex items-center gap-2">
              <HistoryIcon className="h-4 w-4" /> Histórico
            </TabsTrigger>
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
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium transition-all duration-200">
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
    </>
  );
}
