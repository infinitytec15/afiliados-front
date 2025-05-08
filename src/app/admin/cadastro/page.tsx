"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function CadastroAdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Cadastro de Usuário Administrativo
        </h1>
      </div>

      <Card className="bg-white max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Novo Usuário</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input id="nome" placeholder="Nome do usuário" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <Input id="senha" type="password" placeholder="********" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
                <Input
                  id="confirmarSenha"
                  type="password"
                  placeholder="********"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Usuário</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="gerente">Gerente</SelectItem>
                    <SelectItem value="suporte">Suporte</SelectItem>
                    <SelectItem value="financeiro">Financeiro</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" placeholder="(00) 00000-0000" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Permissões</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: "dashboard", label: "Dashboard" },
                  { id: "usuarios", label: "Gestão de Usuários" },
                  { id: "afiliados", label: "Gestão de Afiliados" },
                  { id: "financeiro", label: "Financeiro" },
                  { id: "configuracoes", label: "Configurações" },
                  { id: "relatorios", label: "Relatórios" },
                ].map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox id={permission.id} />
                    <Label
                      htmlFor={permission.id}
                      className="text-sm font-normal"
                    >
                      {permission.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="ativo" defaultChecked />
              <Label htmlFor="ativo" className="text-sm font-normal">
                Usuário ativo
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="2fa" />
              <Label htmlFor="2fa" className="text-sm font-normal">
                Exigir autenticação 2FA
              </Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancelar</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Salvar Usuário
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
