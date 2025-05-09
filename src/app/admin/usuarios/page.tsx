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
  Search,
  MoreHorizontal,
  Download,
  UserPlus,
  Filter,
  SlidersHorizontal,
  Users,
  Edit,
  Key,
  UserX,
  UserCheck,
} from "lucide-react";

interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo: string;
  status: string;
  ultimoAcesso: string;
  avatar: string;
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
      avatar: "A",
    },
    {
      id: "2",
      nome: "Maria Gerente",
      email: "maria@exemplo.com",
      tipo: "Gerente",
      status: "Ativo",
      ultimoAcesso: "Ontem, 15:30",
      avatar: "M",
    },
    {
      id: "3",
      nome: "João Suporte",
      email: "joao@exemplo.com",
      tipo: "Suporte",
      status: "Ativo",
      ultimoAcesso: "Hoje, 09:15",
      avatar: "J",
    },
    {
      id: "4",
      nome: "Ana Financeiro",
      email: "ana@exemplo.com",
      tipo: "Financeiro",
      status: "Inativo",
      ultimoAcesso: "15/05/2023, 14:20",
      avatar: "A",
    },
    {
      id: "5",
      nome: "Carlos Marketing",
      email: "carlos@exemplo.com",
      tipo: "Marketing",
      status: "Ativo",
      ultimoAcesso: "Hoje, 08:30",
      avatar: "C",
    },
  ];

  // Filtrar usuários com base no termo de busca
  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.tipo.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Função para obter a cor de fundo do avatar com base no tipo de usuário
  const getAvatarColor = (tipo: string) => {
    switch (tipo) {
      case "Super Admin":
        return "bg-gradient-to-r from-purple-500 to-indigo-500";
      case "Gerente":
        return "bg-gradient-to-r from-blue-500 to-cyan-500";
      case "Suporte":
        return "bg-gradient-to-r from-green-500 to-teal-500";
      case "Financeiro":
        return "bg-gradient-to-r from-amber-500 to-orange-500";
      case "Marketing":
        return "bg-gradient-to-r from-pink-500 to-rose-500";
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Gestão de Usuários
        </h1>
        <Button
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
          asChild
        >
          <a href="/admin/usuarios/adicionar">
            <UserPlus className="h-4 w-4 mr-2" />
            Adicionar Usuário
          </a>
        </Button>
      </div>

      <Card className="bg-white border-0 shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-blue-800 flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Usuários do Sistema
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Buscar usuários..."
                  className="pl-8 w-full md:w-[250px] border-blue-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
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
                    Usuário
                  </TableHead>
                  <TableHead className="font-medium text-gray-600">
                    Email
                  </TableHead>
                  <TableHead className="font-medium text-gray-600">
                    Tipo
                  </TableHead>
                  <TableHead className="font-medium text-gray-600">
                    Status
                  </TableHead>
                  <TableHead className="font-medium text-gray-600">
                    Último Acesso
                  </TableHead>
                  <TableHead className="w-[80px] font-medium text-gray-600">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsuarios.length > 0 ? (
                  filteredUsuarios.map((usuario) => (
                    <TableRow
                      key={usuario.id}
                      className="hover:bg-blue-50/50 transition-colors"
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div
                            className={`h-8 w-8 rounded-full ${getAvatarColor(usuario.tipo)} flex items-center justify-center text-white font-medium mr-3 shadow-sm`}
                          >
                            {usuario.avatar}
                          </div>
                          {usuario.nome}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {usuario.email}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${usuario.tipo === "Super Admin" ? "bg-purple-100 text-purple-800" : usuario.tipo === "Gerente" ? "bg-blue-100 text-blue-800" : usuario.tipo === "Suporte" ? "bg-green-100 text-green-800" : usuario.tipo === "Financeiro" ? "bg-amber-100 text-amber-800" : "bg-pink-100 text-pink-800"}`}
                        >
                          {usuario.tipo}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${usuario.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {usuario.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {usuario.ultimoAcesso}
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
                            <DropdownMenuItem className="cursor-pointer">
                              <div className="flex items-center w-full text-blue-600">
                                <Edit className="h-4 w-4 mr-2" /> Editar
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <div className="flex items-center w-full text-purple-600">
                                <Key className="h-4 w-4 mr-2" /> Alterar Senha
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <div className="flex items-center w-full text-red-600">
                                {usuario.status === "Ativo" ? (
                                  <>
                                    <UserX className="h-4 w-4 mr-2" /> Desativar
                                  </>
                                ) : (
                                  <>
                                    <UserCheck className="h-4 w-4 mr-2" />{" "}
                                    Ativar
                                  </>
                                )}
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
