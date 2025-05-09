"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  MessageSquareIcon,
  PlusCircleIcon,
  SearchIcon,
  FilterIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
} from "lucide-react";

interface Ticket {
  id: string;
  assunto: string;
  status: "Aberto" | "Em andamento" | "Resolvido" | "Cancelado";
  prioridade: "Baixa" | "Média" | "Alta" | "Urgente";
  departamento: string;
  dataCriacao: string;
  ultimaAtualizacao: string;
  mensagens: number;
}

export default function TicketsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [prioridadeFilter, setPrioridadeFilter] = useState("todos");
  const [departamentoFilter, setDepartamentoFilter] = useState("todos");
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);

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
      mensagens: 3,
    },
  ];

  // Filtrar tickets com base nos filtros aplicados
  const filteredTickets = tickets.filter((ticket) => {
    // Filtro de busca
    const matchesSearch =
      ticket.assunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());

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
        return <ClockIcon className="h-4 w-4 mr-1" />;
      case "Em andamento":
        return <AlertCircleIcon className="h-4 w-4 mr-1" />;
      case "Resolvido":
        return <CheckCircleIcon className="h-4 w-4 mr-1" />;
      case "Cancelado":
        return <XCircleIcon className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Meus Tickets</h1>
        <Button onClick={() => setIsNewTicketOpen(true)}>
          <PlusCircleIcon className="h-4 w-4 mr-2" />
          Novo Ticket
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Tickets de Suporte</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Buscar tickets..."
                  className="pl-8 w-full md:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value)}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Aberto">Aberto</SelectItem>
                  <SelectItem value="Em andamento">Em andamento</SelectItem>
                  <SelectItem value="Resolvido">Resolvido</SelectItem>
                  <SelectItem value="Cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={prioridadeFilter}
                onValueChange={(value) => setPrioridadeFilter(value)}
              >
                <SelectTrigger className="w-[150px]">
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
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Suporte">Suporte</SelectItem>
                  <SelectItem value="Financeiro">Financeiro</SelectItem>
                  <SelectItem value="Técnico">Técnico</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Cadastro">Cadastro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Assunto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Data de Criação</TableHead>
                <TableHead>Última Atualização</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>{ticket.assunto}</TableCell>
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
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <ChevronRightIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6">
                    Nenhum ticket encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isNewTicketOpen} onOpenChange={setIsNewTicketOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Criar Novo Ticket</DialogTitle>
            <DialogDescription>
              Preencha os detalhes abaixo para abrir um novo ticket de suporte.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="departamento" className="text-right">
                Departamento
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="suporte">Suporte</SelectItem>
                  <SelectItem value="financeiro">Financeiro</SelectItem>
                  <SelectItem value="tecnico">Técnico</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="cadastro">Cadastro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prioridade" className="text-right">
                Prioridade
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="urgente">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="assunto" className="text-right">
                Assunto
              </Label>
              <Input
                id="assunto"
                placeholder="Digite o assunto do ticket"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mensagem" className="text-right">
                Mensagem
              </Label>
              <Textarea
                id="mensagem"
                placeholder="Descreva seu problema ou solicitação em detalhes"
                className="col-span-3"
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Enviar Ticket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
