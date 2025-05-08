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
import { Search, MoreHorizontal, Download, Filter } from "lucide-react";

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
}

export default function AfiliadosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [nivelFilter, setNivelFilter] = useState("todos");

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

    return matchesSearch && matchesStatus && matchesNivel;
  });

  // Função para formatar valor monetário
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Gestão de Afiliados
        </h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Adicionar Afiliado
        </Button>
      </div>

      <Card className="bg-white">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Afiliados</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Buscar afiliados..."
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
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Bloqueado">Bloqueado</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={nivelFilter}
                onValueChange={(value) => setNivelFilter(value)}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="1">Nível 1</SelectItem>
                  <SelectItem value="2">Nível 2</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>Nível</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Comissões</TableHead>
                  <TableHead>Indicados</TableHead>
                  <TableHead>Data Registro</TableHead>
                  <TableHead className="w-[80px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAfiliados.length > 0 ? (
                  filteredAfiliados.map((afiliado) => (
                    <TableRow key={afiliado.id}>
                      <TableCell className="font-medium">
                        {afiliado.nome}
                      </TableCell>
                      <TableCell>{afiliado.email}</TableCell>
                      <TableCell>{afiliado.cpf}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${afiliado.nivel === 1 ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}`}
                        >
                          Nível {afiliado.nivel}
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
                      <TableCell>
                        {formatCurrency(afiliado.comissoes)}
                      </TableCell>
                      <TableCell>{afiliado.indicados}</TableCell>
                      <TableCell>{afiliado.dataRegistro}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Ver Indicados</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              {afiliado.status === "Bloqueado"
                                ? "Desbloquear"
                                : "Bloquear"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={9}
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
