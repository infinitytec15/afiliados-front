"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, LinkIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import MetricsCards from "@/components/dashboard/MetricsCards";
import PerformanceCharts from "@/components/dashboard/PerformanceCharts";
import CommissionCards from "@/components/dashboard/CommissionCards";
import InvoiceUploadModal from "@/components/dashboard/InvoiceUploadModal";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export default function DashboardPage() {
  // Estado para controlar as datas selecionadas
  const [dateRange, setDateRange] = React.useState<{
    from: Date;
    to?: Date;
  }>({ from: new Date(new Date().setDate(new Date().getDate() - 30)) });

  // Estado para controlar o sorteio selecionado
  const [selectedSorteio, setSelectedSorteio] = React.useState<string>("todos");

  // Estado para controlar o popover
  const [open, setOpen] = React.useState(false);

  // Estado para controlar o modal de upload de nota fiscal
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);

  // Dados do usuário e link de indicação
  const { user, getReferralLink } = useAuth();
  const { toast } = useToast();

  // Dados simulados para o dashboard
  const dashboardData = {
    totalPurchaseValue: "R$ 25.750,00",
    level1Referrals: 18,
    level2Referrals: 7,
    totalCommission: "R$ 1.687,50",
    availableBalance: "R$ 1.250,00",
  };

  // Link de indicação do usuário
  const referralLink = getReferralLink();

  // Função para copiar o link de indicação
  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link copiado!",
      description:
        "Seu link de indicação foi copiado para a área de transferência.",
    });
  };

  // Função para lidar com o upload da nota fiscal
  const handleInvoiceUpload = (file: File | null) => {
    if (file) {
      // Aqui seria feito o upload do arquivo para o servidor
      console.log("Arquivo para upload:", file.name);
      toast({
        title: "Nota fiscal enviada!",
        description: "Sua solicitação de saque foi recebida e está em análise.",
      });
    }
  };

  // Função para atualizar o range de datas de forma segura
  const handleDateRangeChange = (
    range: { from: Date; to?: Date } | undefined,
  ) => {
    if (!range) return;
    // Comparar datas antes de atualizar o estado para evitar loops infinitos
    const isSameRange =
      dateRange.from?.toDateString() === range.from?.toDateString() &&
      ((!dateRange.to && !range.to) ||
        dateRange.to?.toDateString() === range.to?.toDateString());

    if (!isSameRange) {
      setDateRange(range);
    }
  };

  return (
    <div className="bg-background min-h-screen p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Olá, {user?.name || "Afiliado"}
        </h1>
        <p className="text-muted-foreground">
          Bem-vindo ao seu dashboard de afiliados.
        </p>
      </header>

      {/* Menu para dispositivos móveis */}
      <div className="md:hidden mb-6">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Menu de Navegação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dashboard">Dashboard</SelectItem>
            <SelectItem value="indicados">Meus Indicados</SelectItem>
            <SelectItem value="financeiro">Financeiro</SelectItem>
            <SelectItem value="saques">Saques</SelectItem>
            <SelectItem value="materiais">Materiais</SelectItem>
            <SelectItem value="configuracoes">Configurações</SelectItem>
            <SelectItem value="suporte">Suporte</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-6">
        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <h2 className="text-xl font-semibold">Visão Geral</h2>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Filtro de Data */}
            <Popover open={open} onOpenChange={setOpen} modal={true}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-[300px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })}{" "}
                        - {format(dateRange.to, "dd/MM/yyyy", { locale: ptBR })}
                      </>
                    ) : (
                      format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })
                    )
                  ) : (
                    <span>Selecione um período</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={handleDateRangeChange}
                  numberOfMonths={1}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>

            {/* Filtro de Sorteio */}
            <Select value={selectedSorteio} onValueChange={setSelectedSorteio}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Por Sorteio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Sorteios</SelectItem>
                <SelectItem value="sorteio1">Sorteio Janeiro</SelectItem>
                <SelectItem value="sorteio2">Sorteio Fevereiro</SelectItem>
                <SelectItem value="sorteio3">Sorteio Março</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Link de Indicação */}
        <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Seu Link de Indicação
                </h3>
                <p className="text-sm text-white/80 mb-2">
                  Compartilhe este link para ganhar comissões quando novas
                  pessoas se cadastrarem
                </p>
                <div className="bg-white/20 p-2 rounded-md text-sm overflow-hidden text-ellipsis">
                  {referralLink}
                </div>
              </div>
              <Button
                onClick={copyReferralLink}
                className="bg-white text-blue-600 hover:bg-white/90"
              >
                <LinkIcon className="h-4 w-4 mr-2" />
                Copiar Link
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Cards de Métricas */}
        <MetricsCards
          vendasNivel1={dashboardData.totalPurchaseValue}
          vendasNivel2="R$ 8.750,00"
          comissaoNivel1={`${dashboardData.level1Referrals} indicados`}
          comissaoNivel2={`${dashboardData.level2Referrals} indicados`}
          trendVendasNivel1={12.5}
          trendVendasNivel2={8.3}
          trendComissaoNivel1={15.2}
          trendComissaoNivel2={-3.7}
        />

        {/* Cards de Comissão */}
        <div className="mt-6">
          <CommissionCards
            totalCommission={dashboardData.totalCommission}
            availableBalance={dashboardData.availableBalance}
            onRequestWithdrawal={() => setInvoiceModalOpen(true)}
          />
        </div>

        {/* Gráficos de Performance */}
        <div className="mt-6">
          <PerformanceCharts />
        </div>

        {/* Modal de Upload de Nota Fiscal */}
        <InvoiceUploadModal
          open={invoiceModalOpen}
          onOpenChange={setInvoiceModalOpen}
          onSubmit={handleInvoiceUpload}
        />

        {/* Resumo de Atividades Recentes */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">Novo cliente cadastrado</p>
                  <p className="text-sm text-muted-foreground">
                    Maria Oliveira realizou cadastro pelo seu link
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  Hoje, 14:32
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">Comissão recebida</p>
                  <p className="text-sm text-muted-foreground">
                    R$ 150,00 - Venda #12345
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  Ontem, 10:15
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">Novo afiliado nível 2</p>
                  <p className="text-sm text-muted-foreground">
                    Carlos Santos se cadastrou através de Pedro Almeida
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  23/04/2023
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
