"use client";

import React, { useState, useEffect, useMemo } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Search } from "lucide-react";

interface Cliente {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  compras: number;
  nivel: number;
}

interface ClientesTableProps {
  clientes?: Cliente[];
}

export default function ClientesTable({ clientes = [] }: ClientesTableProps) {
  // Mock data para demonstração quando não houver clientes passados como prop
  const mockClientes: Cliente[] = [
    {
      id: "1",
      nome: "João Silva",
      email: "joao.silva@email.com",
      cpf: "123.456.789-00",
      telefone: "(11) 98765-4321",
      compras: 5,
      nivel: 1,
    },
    {
      id: "2",
      nome: "Maria Oliveira",
      email: "maria.oliveira@email.com",
      cpf: "987.654.321-00",
      telefone: "(11) 91234-5678",
      compras: 3,
      nivel: 1,
    },
    {
      id: "3",
      nome: "Pedro Santos",
      email: "pedro.santos@email.com",
      cpf: "456.789.123-00",
      telefone: "(11) 92345-6789",
      compras: 8,
      nivel: 2,
    },
    {
      id: "4",
      nome: "Ana Costa",
      email: "ana.costa@email.com",
      cpf: "789.123.456-00",
      telefone: "(11) 93456-7890",
      compras: 2,
      nivel: 2,
    },
    {
      id: "5",
      nome: "Carlos Ferreira",
      email: "carlos.ferreira@email.com",
      cpf: "321.654.987-00",
      telefone: "(11) 94567-8901",
      compras: 6,
      nivel: 1,
    },
  ];

  // Usar os clientes mockados se não houver clientes passados como prop
  const displayClientes = useMemo(() => {
    return clientes.length > 0 ? clientes : mockClientes;
  }, [clientes, mockClientes]);

  const [searchTerm, setSearchTerm] = useState("");
  const [nivelFilter, setNivelFilter] = useState<string>("todos");

  // Filtrar clientes usando useMemo para evitar recálculos desnecessários
  const filteredClientes = useMemo(() => {
    let filtered = displayClientes;

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(
        (cliente) =>
          cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cliente.cpf.includes(searchTerm),
      );
    }

    // Filtrar por nível
    if (nivelFilter !== "todos") {
      filtered = filtered.filter(
        (cliente) => cliente.nivel === parseInt(nivelFilter),
      );
    }

    return filtered;
  }, [displayClientes, searchTerm, nivelFilter]);

  // Função para exportar para CSV
  const exportToCSV = () => {
    const headers = ["Nome", "Email", "CPF", "Telefone", "Compras", "Nível"];
    const data = filteredClientes.map((cliente) => [
      cliente.nome,
      cliente.email,
      cliente.cpf,
      cliente.telefone,
      cliente.compras.toString(),
      cliente.nivel.toString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...data.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "clientes.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Clientes Indicados</CardTitle>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, email ou CPF"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select
              value={nivelFilter}
              onValueChange={(value) => setNivelFilter(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os níveis</SelectItem>
                <SelectItem value="1">Nível 1</SelectItem>
                <SelectItem value="2">Nível 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={exportToCSV} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
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
                <TableHead>Telefone</TableHead>
                <TableHead className="text-center">Nº de Compras</TableHead>
                <TableHead className="text-center">Nível</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClientes.length > 0 ? (
                filteredClientes.map((cliente) => (
                  <TableRow key={cliente.id}>
                    <TableCell className="font-medium">
                      {cliente.nome}
                    </TableCell>
                    <TableCell>{cliente.email}</TableCell>
                    <TableCell>{cliente.cpf}</TableCell>
                    <TableCell>{cliente.telefone}</TableCell>
                    <TableCell className="text-center">
                      {cliente.compras}
                    </TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cliente.nivel === 1 ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}
                      >
                        Nível {cliente.nivel}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-10 text-muted-foreground"
                  >
                    Nenhum cliente encontrado com os filtros aplicados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
