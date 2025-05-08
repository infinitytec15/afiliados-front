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
import { Search, MoreHorizontal, Download } from "lucide-react";

interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo: string;
  status: string;
  ultimoAcesso: string;
}

export default function UsuariosPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data para demonstração
  const usuarios: Usuario[] = [
    {
      id: "1",
      nome: "Admin Principal",
      email: "admin@exemplo.com",
      tipo: "Super Admin",
      status: "Ativo",
      ultimoAcesso: "Hoje, 10:45",
    },
    {
      id: "2",
      nome: "Maria Gerente",
      email: "maria@exemplo.com",
      tipo: "Gerente",
      status: "Ativo",
      ultimoAcesso: "Ontem, 15:30",
    },
    {
      id: "3",
      nome: "João Suporte",
      email: "joao@exemplo.com",
      tipo: "Suporte",
      status: "Ativo",
      ultimoAcesso: "Hoje, 09:15",
    },
    {
      id: "4",
      nome: "Ana Financeiro",
      email: "ana@exemplo.com",
      tipo: "Financeiro",
      status: "Inativo",
      ultimoAcesso: "15/05/2023, 14:20",
    },
    {
      id: "5",
      nome: "Carlos Marketing",
      email: "carlos@exemplo.com",
      tipo: "Marketing",
      status: "Ativo",
      ultimoAcesso: "Hoje, 08:30",
    },
  ];

  // Filtrar usuários com base no termo de busca
  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.tipo.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Gestão de Usuários
        </h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Adicionar Usuário
        </Button>
      </div>

      <Card className="bg-white">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Usuários do Sistema</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Buscar usuários..."
                  className="pl-8 w-full md:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
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
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Último Acesso</TableHead>
                  <TableHead className="w-[80px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsuarios.length > 0 ? (
                  filteredUsuarios.map((usuario) => (
                    <TableRow key={usuario.id}>
                      <TableCell className="font-medium">
                        {usuario.nome}
                      </TableCell>
                      <TableCell>{usuario.email}</TableCell>
                      <TableCell>{usuario.tipo}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${usuario.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {usuario.status}
                        </span>
                      </TableCell>
                      <TableCell>{usuario.ultimoAcesso}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Alterar Senha</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              {usuario.status === "Ativo"
                                ? "Desativar"
                                : "Ativar"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-gray-500"
                    >
                      Nenhum usuário encontrado.
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
