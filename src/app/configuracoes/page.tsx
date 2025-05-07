"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";

export default function ConfiguracoesPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("perfil");

  return (
    <div className="flex flex-col gap-6 p-6 bg-background">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
      </div>

      <Tabs defaultValue="perfil" className="w-full">
        <TabsList>
          <TabsTrigger value="perfil">Perfil</TabsTrigger>
          <TabsTrigger value="conta">Conta</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
        </TabsList>

        <TabsContent value="perfil" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    defaultValue={user?.name || ""}
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user?.email || ""}
                    placeholder="seu@email.com"
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">
                    O email não pode ser alterado
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    placeholder="(00) 00000-0000"
                    defaultValue="(11) 98765-4321"
                  />
                </div>

                <div className="pt-2">
                  <Button>Salvar Alterações</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conta" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Alterar Senha</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="senha-atual">Senha Atual</Label>
                  <Input
                    id="senha-atual"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nova-senha">Nova Senha</Label>
                  <Input
                    id="nova-senha"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                  <Input
                    id="confirmar-senha"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>

                <div className="pt-2">
                  <Button>Alterar Senha</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dados Bancários</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="banco">Banco</Label>
                  <Input id="banco" defaultValue="Banco do Brasil" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="agencia">Agência</Label>
                    <Input id="agencia" defaultValue="1234" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="conta">Conta</Label>
                    <Input id="conta" defaultValue="12345-6" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipo-conta">Tipo de Conta</Label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="tipo-conta"
                        value="corrente"
                        defaultChecked
                        className="h-4 w-4"
                      />
                      <span>Corrente</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="tipo-conta"
                        value="poupanca"
                        className="h-4 w-4"
                      />
                      <span>Poupança</span>
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <Button>Salvar Dados Bancários</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificacoes" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Novas Vendas</p>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações quando houver uma nova venda
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Novos Indicados</p>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações quando alguém se cadastrar usando seu
                      link
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Pagamentos</p>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações sobre pagamentos e saques
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Atualizações do Sistema</p>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações sobre novidades e atualizações
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Newsletter</p>
                    <p className="text-sm text-muted-foreground">
                      Receba dicas e estratégias para aumentar suas vendas
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="pt-6">
                <Button>Salvar Preferências</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
