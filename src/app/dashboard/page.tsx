"use client";

import React, { useState } from "react";
import UserPanelHeader from "@/components/UserPanelHeader";
import { motion } from "framer-motion";
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
    <>
      <UserPanelHeader userName={user?.name} />
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
                          {format(dateRange.from, "dd/MM/yyyy", {
                            locale: ptBR,
                          })}{" "}
                          -{" "}
                          {format(dateRange.to, "dd/MM/yyyy", { locale: ptBR })}
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
              <Select
                value={selectedSorteio}
                onValueChange={setSelectedSorteio}
              >
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

          {/* Qualificação do Afiliado */}
          <Card className="mt-6 overflow-hidden border-0 shadow-lg">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-6 text-white">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-xl font-bold mb-3">
                      Qualificação Atual
                    </h3>
                    <div className="flex items-center gap-4">
                      <motion.div
                        initial={{ scale: 0, rotate: -10, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: 0.2,
                        }}
                        className="relative"
                      >
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400 flex items-center justify-center shadow-lg">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.2, 1] }}
                            transition={{
                              duration: 0.8,
                              delay: 0.5,
                              times: [0, 0.7, 1],
                            }}
                            className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-400 to-gray-200 flex items-center justify-center border-4 border-gray-300"
                          >
                            <motion.span
                              className="text-gray-800 font-bold text-xl"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.8 }}
                            >
                              PRATA
                            </motion.span>
                          </motion.div>
                        </div>
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 1, duration: 0.3 }}
                          className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center border-2 border-white shadow-md"
                        >
                          Nv.2
                        </motion.div>
                      </motion.div>

                      <div className="flex flex-col">
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-white"
                        >
                          Prata
                        </motion.div>
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.8 }}
                          className="text-sm text-blue-200"
                        >
                          Afiliado Nível 2
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20 shadow-xl w-full md:w-auto"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-blue-500/30 p-2 rounded-lg">
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
                          className="text-blue-200"
                        >
                          <path d="M20 7h-9" />
                          <path d="M14 17H5" />
                          <circle cx="17" cy="17" r="3" />
                          <circle cx="7" cy="7" r="3" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-blue-200">Seu PIN</p>
                        <motion.p
                          className="font-bold text-xl tracking-wider"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                        >
                          AF25789
                        </motion.p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-purple-500/30 p-2 rounded-lg">
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
                          className="text-purple-200"
                        >
                          <path d="M12 2v20" />
                          <path d="m17 5-5-3-5 3" />
                          <path d="m17 19-5 3-5-3" />
                          <path d="M12 11v4" />
                          <path d="M12 7v1" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-purple-200">Seus Pontos</p>
                        <motion.div
                          className="font-bold text-xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.7 }}
                        >
                          1.250
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="flex justify-between mb-2 items-center">
                    <div className="flex items-center gap-2">
                      <span>Progresso para</span>
                      <span className="font-bold text-yellow-300">Ouro</span>
                    </div>
                    <span className="font-bold bg-white/10 px-3 py-1 rounded-full text-sm">
                      1.250 / 2.500 pontos
                    </span>
                  </div>
                  <div className="relative h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-300 to-yellow-500"
                      initial={{ width: 0 }}
                      animate={{ width: "50%" }}
                      transition={{ duration: 1.5, delay: 1.1 }}
                    >
                      <motion.div
                        className="absolute top-0 right-0 h-full w-4 bg-white/50"
                        animate={{
                          opacity: [0, 1, 0],
                          x: [0, 40, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              <div className="p-6 bg-gradient-to-b from-slate-50 to-white">
                <h4 className="font-semibold mb-4 text-gray-800">
                  Próximos Níveis de Qualificação
                </h4>
                <div className="space-y-4">
                  <motion.div
                    className="flex items-center justify-between p-3 rounded-xl border border-yellow-100 bg-gradient-to-r from-yellow-50 to-transparent"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-300 shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="8" r="6" />
                          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-lg text-yellow-700">
                          Ouro
                        </p>
                        <p className="text-sm text-gray-500">2.500 pontos</p>
                      </div>
                    </div>
                    <div className="text-sm font-medium bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                      +5% comissão
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center justify-between p-3 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-transparent"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-300 shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 3L1.5 18h21L12 3" />
                          <path d="M12 14l-3-3 3-3 3 3-3 3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-lg text-blue-700">
                          Diamante
                        </p>
                        <p className="text-sm text-gray-500">5.000 pontos</p>
                      </div>
                    </div>
                    <div className="text-sm font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      +10% comissão
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center justify-between p-3 rounded-xl border border-purple-100 bg-gradient-to-r from-purple-50 to-transparent"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.6 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-gradient-to-br from-purple-600 to-purple-400 shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 2L2 7l10 5 10-5-10-5Z" />
                          <path d="M2 17l10 5 10-5" />
                          <path d="M2 12l10 5 10-5" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-lg text-purple-700">
                          Mestre
                        </p>
                        <p className="text-sm text-gray-500">10.000 pontos</p>
                      </div>
                    </div>
                    <div className="text-sm font-medium bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                      +15% comissão
                    </div>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>

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
    </>
  );
}
