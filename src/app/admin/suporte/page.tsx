"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Filter,
  SlidersHorizontal,
  Download,
  MessageSquare,
  MessageCircle,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  ChevronRight,
  Reply,
  User,
  Calendar,
  Tag,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

interface Ticket {
  id: string;
  assunto: string;
  status: "Aberto" | "Em andamento" | "Resolvido" | "Cancelado";
  prioridade: "Baixa" | "Média" | "Alta" | "Urgente";
  departamento: string;
  dataCriacao: string;
  ultimaAtualizacao: string;
  usuario: string;
  email: string;
  mensagens: number;
}

interface Mensagem {
  id: string;
  autor: string;
  tipo: "usuario" | "admin";
  conteudo: string;
  data: string;
  anexos?: string[];
}

export default function AdminSuportePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [prioridadeFilter, setPrioridadeFilter] = useState("todos");
  const [departamentoFilter, setDepartamentoFilter] = useState("todos");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isRespondendo, setIsRespondendo] = useState(false);
  const [resposta, setResposta] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage] = useState(10);

  // Mock data para demonstração
  const tickets: Ticket[] = [
    {
      id: "TK-1001",
      assunto: "Problema com pagamento de comissão",
      status: "Aberto",
      prioridade: "Alta",
      departamento: "Financeiro",
      dataCriacao: "15/05/2023 14:30",
      ultimaAtualizacao: "15/05/2023 15:45",
      usuario: "João Silva",
      email: "joao.silva@email.com",
      mensagens: 3,
    },
    {
      id: "TK-1002",
      assunto: "Dúvida sobre material promocional",
      status: "Em andamento",
      prioridade: "Média",
      departamento: "Marketing",
      dataCriacao: "14/05/2023 09:15",
      ultimaAtualizacao: "14/05/2023 16:20",
      usuario: "Maria Oliveira",
      email: "maria.oliveira@email.com",
      mensagens: 5,
    },
    {
      id: "TK-1003",
      assunto: "Solicitação de novo link de afiliado",
      status: "Resolvido",
      prioridade: "Baixa",
      departamento: "Suporte",
      dataCriacao: "10/05/2023 11:00",
      ultimaAtualizacao: "12/05/2023 09:30",
      usuario: "Pedro Santos",
      email: "pedro.santos@email.com",
      mensagens: 4,
    },
    {
      id: "TK-1004",
      assunto: "Erro no dashboard de métricas",
      status: "Aberto",
      prioridade: "Urgente",
      departamento: "Técnico",
      dataCriacao: "15/05/2023 08:45",
      ultimaAtualizacao: "15/05/2023 10:15",
      usuario: "Ana Costa",
      email: "ana.costa@email.com",
      mensagens: 2,
    },
    {
      id: "TK-1005",
      assunto: "Atualização de dados cadastrais",
      status: "Cancelado",
      prioridade: "Baixa",
      departamento: "Cadastro",
      dataCriacao: "05/05/2023 13:20",
      ultimaAtualizacao: "06/05/2023 14:10",
      usuario: "Carlos Ferreira",
      email: "carlos.ferreira@email.com",
      mensagens: 3,
    },
    {
      id: "TK-1006",
      assunto: "Problema ao gerar link de afiliado",
      status: "Aberto",
      prioridade: "Alta",
      departamento: "Técnico",
      dataCriacao: "16/05/2023 10:30",
      ultimaAtualizacao: "16/05/2023 11:45",
      usuario: "Fernanda Lima",
      email: "fernanda.lima@email.com",
      mensagens: 1,
    },
    {
      id: "TK-1007",
      assunto: "Dúvida sobre qualificação de nível",
      status: "Em andamento",
      prioridade: "Média",
      departamento: "Suporte",
      dataCriacao: "15/05/2023 16:20",
      ultimaAtualizacao: "16/05/2023 09:10",
      usuario: "Roberto Alves",
      email: "roberto.alves@email.com",
      mensagens: 4,
    },
    {
      id: "TK-1008",
      assunto: "Solicitação de material personalizado",
      status: "Aberto",
      prioridade: "Baixa",
      departamento: "Marketing",
      dataCriacao: "16/05/2023 14:15",
      ultimaAtualizacao: "16/05/2023 14:15",
      usuario: "Juliana Mendes",
      email: "juliana.mendes@email.com",
      mensagens: 1,
    },
    {
      id: "TK-1009",
      assunto: "Problema com saque de comissões",
      status: "Aberto",
      prioridade: "Urgente",
      departamento: "Financeiro",
      dataCriacao: "16/05/2023 11:30",
      ultimaAtualizacao: "16/05/2023 13:45",
      usuario: "Marcelo Souza",
      email: "marcelo.souza@email.com",
      mensagens: 2,
    },
    {
      id: "TK-1010",
      assunto: "Dúvida sobre contrato de afiliado",
      status: "Resolvido",
      prioridade: "Média",
      departamento: "Jurídico",
      dataCriacao: "14/05/2023 10:20",
      ultimaAtualizacao: "15/05/2023 16:30",
      usuario: "Camila Rodrigues",
      email: "camila.rodrigues@email.com",
      mensagens: 6,
    },
    {
      id: "TK-1011",
      assunto: "Erro ao fazer login",
      status: "Resolvido",
      prioridade: "Alta",
      departamento: "Técnico",
      dataCriacao: "13/05/2023 08:45",
      ultimaAtualizacao: "13/05/2023 10:30",
      usuario: "Lucas Martins",
      email: "lucas.martins@email.com",
      mensagens: 3,
    },
    {
      id: "TK-1012",
      assunto: "Solicitação de cancelamento",
      status: "Cancelado",
      prioridade: "Baixa",
      departamento: "Suporte",
      dataCriacao: "12/05/2023 15:10",
      ultimaAtualizacao: "13/05/2023 09:20",
      usuario: "Amanda Oliveira",
      email: "amanda.oliveira@email.com",
      mensagens: 2,
    },
  ];

  // Mock data para mensagens de um ticket
  const mensagens: Mensagem[] = [
    {
      id: "MSG-1",
      autor: "João Silva",
      tipo: "usuario",
      conteudo:
        "Olá, estou com um problema no pagamento da minha comissão. O valor que aparece no dashboard não corresponde ao que foi depositado na minha conta. Poderiam verificar?",
      data: "15/05/2023 14:30",
    },
    {
      id: "MSG-2",
      autor: "Suporte Técnico",
      tipo: "admin",
      conteudo:
        "Olá João, obrigado por entrar em contato. Vamos verificar essa situação com o departamento financeiro. Você poderia nos informar qual o período de comissão que está com divergência?",
      data: "15/05/2023 15:15",
    },
    {
      id: "MSG-3",
      autor: "João Silva",
      tipo: "usuario",
      conteudo:
        "A divergência é referente ao período de 01/04/2023 a 30/04/2023. No dashboard aparece R$ 1.250,00, mas foi depositado apenas R$ 1.125,00.",
      data: "15/05/2023 15:45",
      anexos: ["comprovante-deposito.pdf"],
    },
  ];

  // Filtrar tickets com base nos filtros aplicados
  const filteredTickets = tickets.filter((ticket) => {
    // Filtro de busca
    const matchesSearch =
      ticket.assunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.email.toLowerCase().includes(searchTerm.toLowerCase());

    // Filtro de status
    const matchesStatus =
      statusFilter === "todos" || ticket.status === statusFilter;

    // Filtro de prioridade
    const matchesPrioridade =
      prioridadeFilter === "todos" || ticket.prioridade === prioridadeFilter;

    // Filtro de departamento
    const matchesDepartamento =
      departamentoFilter === "todos" ||
      ticket.departamento === departamentoFilter;

    return (
      matchesSearch && matchesStatus && matchesPrioridade && matchesDepartamento
    );
  });

  // Paginação
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(
    indexOfFirstTicket,
    indexOfLastTicket,
  );
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  // Função para obter a cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aberto":
        return "bg-blue-100 text-blue-800";
      case "Em andamento":
        return "bg-yellow-100 text-yellow-800";
      case "Resolvido":
        return "bg-green-100 text-green-800";
      case "Cancelado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Função para obter a cor da prioridade
  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "Baixa":
        return "bg-green-100 text-green-800";
      case "Média":
        return "bg-blue-100 text-blue-800";
      case "Alta":
        return "bg-orange-100 text-orange-800";
      case "Urgente":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Função para obter o ícone do status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Aberto":
        return <Clock className="h-4 w-4 mr-1" />;
      case "Em andamento":
        return <AlertCircle className="h-4 w-4 mr-1" />;
      case "Resolvido":
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case "Cancelado":
        return <XCircle className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  // Função para enviar resposta
  const enviarResposta = () => {
    // Aqui seria implementada a lógica para enviar a resposta
    console.log("Resposta enviada:", resposta);
    setResposta("");
    setIsRespondendo(false);
  };

  // Função para alterar status do ticket
  const alterarStatus = (novoStatus: string) => {
    if (selectedTicket) {
      // Cria uma cópia do ticket selecionado com o novo status
      const updatedTicket = {
        ...selectedTicket,
        status: novoStatus as
          | "Aberto"
          | "Em andamento"
          | "Resolvido"
          | "Cancelado",
      };

      // Atualiza o ticket selecionado
      setSelectedTicket(updatedTicket);

      // Aqui seria implementada a lógica para persistir a alteração no backend
      console.log("Status alterado para:", novoStatus);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Central de Suporte
        </h1>
      </div>

      <Tabs defaultValue="tickets" className="w-full">
        <TabsList className="grid grid-cols-3 md:w-[400px] bg-gradient-to-r from-blue-100 to-purple-100 p-1 rounded-xl">
          <TabsTrigger
            value="tickets"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg"
          >
            Tickets
          </TabsTrigger>
          <TabsTrigger
            value="estatisticas"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg"
          >
            Estatísticas
          </TabsTrigger>
          <TabsTrigger
            value="configuracoes"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg"
          >
            Configurações
          </TabsTrigger>
        </TabsList>

        {/* Tab de Tickets */}
        <TabsContent value="tickets" className="space-y-4 mt-4">
          {selectedTicket ? (
            <Card className="bg-white border-0 shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b pb-4">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedTicket(null)}
                    className="mb-2"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para lista
                  </Button>
                  <div className="flex items-center gap-2">
                    <Select
                      value={selectedTicket.status}
                      onValueChange={(value) => alterarStatus(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Aberto">Aberto</SelectItem>
                        <SelectItem value="Em andamento">
                          Em andamento
                        </SelectItem>
                        <SelectItem value="Resolvido">Resolvido</SelectItem>
                        <SelectItem value="Cancelado">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-200 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-xl">
                  {selectedTicket.id} - {selectedTicket.assunto}
                </CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                      selectedTicket.status,
                    )}`}
                  >
                    {getStatusIcon(selectedTicket.status)}
                    {selectedTicket.status}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPrioridadeColor(
                      selectedTicket.prioridade,
                    )}`}
                  >
                    {selectedTicket.prioridade}
                  </span>
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-800">
                    {selectedTicket.departamento}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {selectedTicket.usuario} ({selectedTicket.email})
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Criado em: {selectedTicket.dataCriacao}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Última atualização: {selectedTicket.ultimaAtualizacao}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Mensagens do ticket */}
                  {mensagens.map((mensagem) => (
                    <div
                      key={mensagem.id}
                      className={`flex ${mensagem.tipo === "usuario" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-3xl rounded-lg p-4 ${mensagem.tipo === "usuario" ? "bg-gray-100" : "bg-blue-50 border border-blue-100"}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{mensagem.autor}</span>
                          <span className="text-xs text-gray-500">
                            {mensagem.data}
                          </span>
                        </div>
                        <p className="text-gray-800">{mensagem.conteudo}</p>
                        {mensagem.anexos && mensagem.anexos.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-sm font-medium mb-2">Anexos:</p>
                            <div className="flex flex-wrap gap-2">
                              {mensagem.anexos.map((anexo, index) => (
                                <div
                                  key={index}
                                  className="flex items-center bg-white border rounded-md px-3 py-1 text-sm"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1 text-blue-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                  </svg>
                                  {anexo}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Área de resposta */}
                  {isRespondendo ? (
                    <div className="mt-6 border rounded-lg p-4 bg-white">
                      <h3 className="font-medium mb-2">Sua resposta</h3>
                      <Textarea
                        placeholder="Digite sua resposta..."
                        className="min-h-[120px] mb-4"
                        value={resposta}
                        onChange={(e) => setResposta(e.target.value)}
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsRespondendo(false)}
                        >
                          Cancelar
                        </Button>
                        <Button onClick={enviarResposta}>
                          Enviar Resposta
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center mt-6">
                      <Button
                        onClick={() => setIsRespondendo(true)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <Reply className="h-4 w-4 mr-2" />
                        Responder
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white border-0 shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b pb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle className="text-blue-800 flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                    Tickets de Suporte
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        type="search"
                        placeholder="Buscar tickets..."
                        className="pl-8 w-full md:w-[250px] border-blue-200"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    <Select
                      value={statusFilter}
                      onValueChange={(value) => setStatusFilter(value)}
                    >
                      <SelectTrigger className="w-[150px] border-blue-200 bg-white">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="Aberto">Aberto</SelectItem>
                        <SelectItem value="Em andamento">
                          Em andamento
                        </SelectItem>
                        <SelectItem value="Resolvido">Resolvido</SelectItem>
                        <SelectItem value="Cancelado">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={prioridadeFilter}
                      onValueChange={(value) => setPrioridadeFilter(value)}
                    >
                      <SelectTrigger className="w-[150px] border-blue-200 bg-white">
                        <SelectValue placeholder="Prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todas</SelectItem>
                        <SelectItem value="Baixa">Baixa</SelectItem>
                        <SelectItem value="Média">Média</SelectItem>
                        <SelectItem value="Alta">Alta</SelectItem>
                        <SelectItem value="Urgente">Urgente</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={departamentoFilter}
                      onValueChange={(value) => setDepartamentoFilter(value)}
                    >
                      <SelectTrigger className="w-[150px] border-blue-200 bg-white">
                        <SelectValue placeholder="Departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="Suporte">Suporte</SelectItem>
                        <SelectItem value="Financeiro">Financeiro</SelectItem>
                        <SelectItem value="Técnico">Técnico</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Cadastro">Cadastro</SelectItem>
                        <SelectItem value="Jurídico">Jurídico</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      variant="outline"
                      size="icon"
                      className="border-blue-200 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="border-blue-200 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="rounded-md">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead className="w-[100px] font-medium text-gray-600">
                          ID
                        </TableHead>
                        <TableHead className="font-medium text-gray-600">
                          Assunto
                        </TableHead>
                        <TableHead className="font-medium text-gray-600">
                          Usuário
                        </TableHead>
                        <TableHead className="font-medium text-gray-600">
                          Status
                        </TableHead>
                        <TableHead className="font-medium text-gray-600">
                          Prioridade
                        </TableHead>
                        <TableHead className="font-medium text-gray-600">
                          Departamento
                        </TableHead>
                        <TableHead className="font-medium text-gray-600">
                          Data de Criação
                        </TableHead>
                        <TableHead className="font-medium text-gray-600">
                          Última Atualização
                        </TableHead>
                        <TableHead className="w-[80px] font-medium text-gray-600">
                          Ações
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentTickets.length > 0 ? (
                        currentTickets.map((ticket) => (
                          <TableRow
                            key={ticket.id}
                            className="hover:bg-blue-50/50 transition-colors cursor-pointer"
                            onClick={() => setSelectedTicket(ticket)}
                          >
                            <TableCell className="font-medium">
                              {ticket.id}
                            </TableCell>
                            <TableCell>{ticket.assunto}</TableCell>
                            <TableCell>{ticket.usuario}</TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                                  ticket.status,
                                )}`}
                              >
                                {getStatusIcon(ticket.status)}
                                {ticket.status}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPrioridadeColor(
                                  ticket.prioridade,
                                )}`}
                              >
                                {ticket.prioridade}
                              </span>
                            </TableCell>
                            <TableCell>{ticket.departamento}</TableCell>
                            <TableCell>{ticket.dataCriacao}</TableCell>
                            <TableCell>{ticket.ultimaAtualizacao}</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedTicket(ticket);
                                }}
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={9}
                            className="text-center py-6 text-gray-500"
                          >
                            Nenhum ticket encontrado com os filtros aplicados.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Paginação */}
                {filteredTickets.length > ticketsPerPage && (
                  <div className="flex items-center justify-between px-4 py-4 border-t">
                    <div className="text-sm text-gray-600">
                      Mostrando {indexOfFirstTicket + 1} a{" "}
                      {Math.min(indexOfLastTicket, filteredTickets.length)} de{" "}
                      {filteredTickets.length} tickets
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="h-8 w-8 p-0"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <Button
                            key={page}
                            variant={
                              currentPage === page ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className={`h-8 w-8 p-0 ${currentPage === page ? "bg-blue-600" : ""}`}
                          >
                            {page}
                          </Button>
                        ),
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="h-8 w-8 p-0"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Tab de Estatísticas */}
        <TabsContent value="estatisticas" className="space-y-4 mt-4">
          <Card className="bg-white border-0 shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <CardTitle className="text-blue-800">
                Estatísticas de Tickets
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-800">
                          Total de Tickets
                        </p>
                        <p className="text-3xl font-bold text-blue-900">124</p>
                      </div>
                      <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <MessageSquare className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-yellow-800">
                          Tickets Abertos
                        </p>
                        <p className="text-3xl font-bold text-yellow-900">28</p>
                      </div>
                      <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-yellow-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-800">
                          Tickets Resolvidos
                        </p>
                        <p className="text-3xl font-bold text-green-900">87</p>
                      </div>
                      <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-800">
                          Tempo Médio de Resposta
                        </p>
                        <p className="text-3xl font-bold text-purple-900">
                          4.2h
                        </p>
                      </div>
                      <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Tickets por Departamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Suporte</span>
                          <span className="text-sm font-medium">35%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: "35%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">
                            Financeiro
                          </span>
                          <span className="text-sm font-medium">25%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-green-600 h-2.5 rounded-full"
                            style={{ width: "25%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Técnico</span>
                          <span className="text-sm font-medium">20%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-purple-600 h-2.5 rounded-full"
                            style={{ width: "20%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Marketing</span>
                          <span className="text-sm font-medium">15%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-yellow-600 h-2.5 rounded-full"
                            style={{ width: "15%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Outros</span>
                          <span className="text-sm font-medium">5%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-gray-600 h-2.5 rounded-full"
                            style={{ width: "5%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Tickets por Prioridade
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Baixa</span>
                          <span className="text-sm font-medium">40%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-green-600 h-2.5 rounded-full"
                            style={{ width: "40%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Média</span>
                          <span className="text-sm font-medium">30%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: "30%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Alta</span>
                          <span className="text-sm font-medium">20%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-orange-600 h-2.5 rounded-full"
                            style={{ width: "20%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Urgente</span>
                          <span className="text-sm font-medium">10%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-red-600 h-2.5 rounded-full"
                            style={{ width: "10%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Configurações */}
        <TabsContent value="configuracoes" className="space-y-4 mt-4">
          <Card className="bg-white border-0 shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <CardTitle className="text-blue-800">
                Configurações de Suporte
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Departamentos</h3>
                  <p className="text-sm text-gray-600">
                    Gerencie os departamentos disponíveis para categorização de
                    tickets.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {[
                      "Suporte",
                      "Financeiro",
                      "Técnico",
                      "Marketing",
                      "Cadastro",
                      "Jurídico",
                    ].map((departamento, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
                      >
                        <div className="flex items-center">
                          <Tag className="h-4 w-4 mr-2 text-blue-600" />
                          <span>{departamento}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </Button>
                      </div>
                    ))}
                    <div className="flex items-center justify-center p-3 border rounded-lg border-dashed">
                      <Button variant="ghost" className="text-blue-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Adicionar Departamento
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-6 border-t">
                  <h3 className="text-lg font-medium">Respostas Automáticas</h3>
                  <p className="text-sm text-gray-600">
                    Configure respostas automáticas para tipos comuns de
                    tickets.
                  </p>
                  <div className="space-y-4 mt-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Boas-vindas</h4>
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">
                        Olá, obrigado por entrar em contato com nosso suporte.
                        Sua solicitação foi recebida e será atendida em breve.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Problema Técnico</h4>
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">
                        Recebemos seu relato sobre um problema técnico. Nossa
                        equipe está analisando e retornará com uma solução o
                        mais breve possível.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Dúvida Financeira</h4>
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">
                        Sua dúvida sobre questões financeiras foi recebida.
                        Nossa equipe financeira irá analisar e responder em até
                        24 horas úteis.
                      </p>
                    </div>
                    <Button className="w-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Adicionar Nova Resposta
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 pt-6 border-t">
                  <h3 className="text-lg font-medium">Notificações</h3>
                  <p className="text-sm text-gray-600">
                    Configure as notificações para novos tickets e atualizações.
                  </p>
                  <div className="space-y-4 mt-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Email para novos tickets</p>
                        <p className="text-sm text-gray-600">
                          Receba notificações por email quando novos tickets
                          forem criados
                        </p>
                      </div>
                      <div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Notificações no sistema</p>
                        <p className="text-sm text-gray-600">
                          Receba notificações no sistema para atualizações de
                          tickets
                        </p>
                      </div>
                      <div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">
                          Alertas para tickets urgentes
                        </p>
                        <p className="text-sm text-gray-600">
                          Receba alertas especiais para tickets marcados como
                          urgentes
                        </p>
                      </div>
                      <div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
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
