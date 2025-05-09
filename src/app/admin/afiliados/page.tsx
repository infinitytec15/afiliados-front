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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MoreHorizontal,
  Download,
  Filter,
  UserPlus,
  SlidersHorizontal,
  Eye,
  Edit,
  Ban,
  Users,
} from "lucide-react";

interface Afiliado {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  nivel: number;
  status: string;
  comissoes: number;
  indicados: number;
  dataRegistro: string;
  qualificacao: string;
}

export default function AfiliadosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [nivelFilter, setNivelFilter] = useState("todos");
  const [qualificacaoFilter, setQualificacaoFilter] = useState("todos");

  // Mock data para demonstração
  const afiliados: Afiliado[] = [
    {
      id: "1",
      nome: "João Silva",
      email: "joao.silva@email.com",
      cpf: "123.456.789-00",
      nivel: 1,
      status: "Ativo",
      comissoes: 1250.75,
      indicados: 8,
      dataRegistro: "15/03/2023",
      qualificacao: "Ouro",
    },
    {
      id: "2",
      nome: "Maria Oliveira",
      email: "maria.oliveira@email.com",
      cpf: "987.654.321-00",
      nivel: 2,
      status: "Ativo",
      comissoes: 3450.25,
      indicados: 15,
      dataRegistro: "10/01/2023",
      qualificacao: "Diamante",
    },
    {
      id: "3",
      nome: "Pedro Santos",
      email: "pedro.santos@email.com",
      cpf: "456.789.123-00",
      nivel: 1,
      status: "Pendente",
      comissoes: 0,
      indicados: 0,
      dataRegistro: "05/05/2023",
      qualificacao: "Bronze",
    },
    {
      id: "4",
      nome: "Ana Costa",
      email: "ana.costa@email.com",
      cpf: "789.123.456-00",
      nivel: 1,
      status: "Bloqueado",
      comissoes: 750.5,
      indicados: 3,
      dataRegistro: "20/02/2023",
      qualificacao: "Prata",
    },
    {
      id: "5",
      nome: "Carlos Ferreira",
      email: "carlos.ferreira@email.com",
      cpf: "321.654.987-00",
      nivel: 2,
      status: "Ativo",
      comissoes: 5200.8,
      indicados: 22,
      dataRegistro: "08/12/2022",
      qualificacao: "Platina",
    },
  ];

  // Filtrar afiliados com base nos filtros aplicados
  const filteredAfiliados = afiliados.filter((afiliado) => {
    // Filtro de busca
    const matchesSearch =
      afiliado.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      afiliado.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      afiliado.cpf.includes(searchTerm);

    // Filtro de status
    const matchesStatus =
      statusFilter === "todos" || afiliado.status === statusFilter;

    // Filtro de nível
    const matchesNivel =
      nivelFilter === "todos" || afiliado.nivel === parseInt(nivelFilter, 10);

    // Filtro de qualificação
    const matchesQualificacao =
      qualificacaoFilter === "todos" ||
      afiliado.qualificacao === qualificacaoFilter;

    return (
      matchesSearch && matchesStatus && matchesNivel && matchesQualificacao
    );
  });

  // Função para formatar valor monetário
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Função para obter a cor da qualificação
  const getQualificacaoColor = (qualificacao: string) => {
    switch (qualificacao) {
      case "Bronze":
        return "bg-amber-100 text-amber-800";
      case "Prata":
        return "bg-gray-100 text-gray-800";
      case "Ouro":
        return "bg-yellow-100 text-yellow-800";
      case "Diamante":
        return "bg-blue-100 text-blue-800";
      case "Platina":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Gestão de Afiliados
        </h1>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
          <UserPlus className="h-4 w-4 mr-2" />
          Adicionar Afiliado
        </Button>
      </div>

      <Card className="bg-white border-0 shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-blue-800 flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Afiliados
            </CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Buscar afiliados..."
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
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Bloqueado">Bloqueado</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={nivelFilter}
                onValueChange={(value) => setNivelFilter(value)}
              >
                <SelectTrigger className="w-[150px] border-blue-200 bg-white">
                  <SelectValue placeholder="Nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="1">Nível 1</SelectItem>
                  <SelectItem value="2">Nível 2</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={qualificacaoFilter}
                onValueChange={(value) => setQualificacaoFilter(value)}
              >
                <SelectTrigger className="w-[150px] border-blue-200 bg-white">
                  <SelectValue placeholder="Qualificação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas</SelectItem>
                  <SelectItem value="Bronze">Bronze</SelectItem>
                  <SelectItem value="Prata">Prata</SelectItem>
                  <SelectItem value="Ouro">Ouro</SelectItem>
                  <SelectItem value="Diamante">Diamante</SelectItem>
                  <SelectItem value="Platina">Platina</SelectItem>
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
                  <TableHead className="font-medium text-gray-600">
                    Nome
                  </TableHead>
                  <TableHead className="font-medium text-gray-600">
                    Email
                  </TableHead>
                  <TableHead className="font-medium text-gray-600">
                    CPF
                  </TableHead>
                  <TableHead className="font-medium text-gray-600">
                    Nível
                  </TableHead>
                  <TableHead className="font-medium text-gray-600">
                    Qualificação
                  </TableHead>
                  <TableHead className="font-medium text-gray-600">
                    Status
                  </TableHead>
                  <TableHead className="font-medium text-gray-600">
                    Comissões
                  </TableHead>
                  <TableHead className="font-medium text-gray-600">
                    Indicados
                  </TableHead>
                  <TableHead className="font-medium text-gray-600">
                    Data Registro
                  </TableHead>
                  <TableHead className="w-[80px] font-medium text-gray-600">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAfiliados.length > 0 ? (
                  filteredAfiliados.map((afiliado) => (
                    <TableRow
                      key={afiliado.id}
                      className="hover:bg-blue-50/50 transition-colors"
                    >
                      <TableCell className="font-medium">
                        {afiliado.nome}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {afiliado.email}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {afiliado.cpf}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${afiliado.nivel === 1 ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}`}
                        >
                          Nível {afiliado.nivel}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getQualificacaoColor(afiliado.qualificacao)}`}
                        >
                          {afiliado.qualificacao}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            afiliado.status === "Ativo"
                              ? "bg-green-100 text-green-800"
                              : afiliado.status === "Pendente"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {afiliado.status}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium text-gray-700">
                        {formatCurrency(afiliado.comissoes)}
                      </TableCell>
                      <TableCell className="text-center font-medium text-gray-700">
                        {afiliado.indicados}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {afiliado.dataRegistro}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0 hover:bg-blue-100"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                              className="cursor-pointer"
                              asChild
                            >
                              <a
                                href="/admin/afiliados/detalhes"
                                className="w-full"
                              >
                                <div className="flex items-center w-full text-blue-600">
                                  <Eye className="h-4 w-4 mr-2" /> Ver Detalhes
                                </div>
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <div className="flex items-center w-full text-purple-600">
                                <Edit className="h-4 w-4 mr-2" /> Editar
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <div className="flex items-center w-full text-green-600">
                                <Users className="h-4 w-4 mr-2" /> Ver Indicados
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <div className="flex items-center w-full text-red-600">
                                <Ban className="h-4 w-4 mr-2" />
                                {afiliado.status === "Bloqueado"
                                  ? "Desbloquear"
                                  : "Bloquear"}
                              </div>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={10}
                      className="h-24 text-center text-gray-500"
                    >
                      Nenhum afiliado encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
