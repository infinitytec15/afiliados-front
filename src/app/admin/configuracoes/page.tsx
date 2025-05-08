"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { QrCode, Lock, Settings, Users } from "lucide-react";

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Configurações do Sistema
        </h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="afiliados" className="w-full">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="afiliados">Afiliados</TabsTrigger>
          <TabsTrigger value="seguranca">Segurança</TabsTrigger>
          <TabsTrigger value="geral">Geral</TabsTrigger>
        </TabsList>

        {/* Configurações de Afiliados */}
        <TabsContent value="afiliados" className="space-y-4 mt-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Estrutura de Afiliados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="niveis">Número de Níveis</Label>
                  <Select defaultValue="2">
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Níveis" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Comissões por Nível</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="comissao-nivel-1">Nível 1</Label>
                      <div className="flex items-center">
                        <Input
                          id="comissao-nivel-1"
                          type="number"
                          defaultValue="10"
                          className="w-24"
                        />
                        <span className="ml-2">%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="comissao-nivel-2">Nível 2</Label>
                      <div className="flex items-center">
                        <Input
                          id="comissao-nivel-2"
                          type="number"
                          defaultValue="5"
                          className="w-24"
                        />
                        <span className="ml-2">%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Qualificação com PIN</h3>

                  <div className="flex items-center space-x-2">
                    <Switch id="pin-qualificacao" defaultChecked />
                    <Label htmlFor="pin-qualificacao">
                      Ativar qualificação com PIN
                    </Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="valor-qualificacao">
                      Valor mínimo para qualificação
                    </Label>
                    <div className="flex items-center">
                      <span className="mr-2">R$</span>
                      <Input
                        id="valor-qualificacao"
                        type="number"
                        defaultValue="500"
                        className="w-32"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Regras de Aprovação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="aprovacao-automatica" />
                <Label htmlFor="aprovacao-automatica">
                  Aprovar afiliados automaticamente
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="exigir-documentos" defaultChecked />
                <Label htmlFor="exigir-documentos">
                  Exigir documentos para aprovação
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="verificar-email" defaultChecked />
                <Label htmlFor="verificar-email">
                  Verificar email antes da aprovação
                </Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações de Segurança */}
        <TabsContent value="seguranca" className="space-y-4 mt-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                Autenticação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="2fa-admin" defaultChecked />
                  <Label htmlFor="2fa-admin">
                    Exigir 2FA para usuários administrativos
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="2fa-afiliados" />
                  <Label htmlFor="2fa-afiliados">
                    Permitir 2FA para afiliados
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <QrCode className="h-5 w-5 mr-2 text-gray-500" />
                  <Label>Método de 2FA</Label>
                  <Select defaultValue="qrcode">
                    <SelectTrigger className="w-[180px] ml-2">
                      <SelectValue placeholder="Selecione o método" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="qrcode">QR Code</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Políticas de Senha</h3>

                <div className="space-y-2">
                  <Label htmlFor="tamanho-minimo">Tamanho mínimo</Label>
                  <Input
                    id="tamanho-minimo"
                    type="number"
                    defaultValue="8"
                    className="w-20"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="exigir-maiusculas" defaultChecked />
                  <Label htmlFor="exigir-maiusculas">
                    Exigir letras maiúsculas
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="exigir-numeros" defaultChecked />
                  <Label htmlFor="exigir-numeros">Exigir números</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="exigir-especiais" defaultChecked />
                  <Label htmlFor="exigir-especiais">
                    Exigir caracteres especiais
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Sessões</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tempo-sessao">Tempo de sessão (minutos)</Label>
                <Input
                  id="tempo-sessao"
                  type="number"
                  defaultValue="60"
                  className="w-24"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="logout-inatividade" defaultChecked />
                <Label htmlFor="logout-inatividade">
                  Logout automático por inatividade
                </Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações Gerais */}
        <TabsContent value="geral" className="space-y-4 mt-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Configurações Gerais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome-sistema">Nome do Sistema</Label>
                  <Input
                    id="nome-sistema"
                    defaultValue="Sistema de Afiliados"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-contato">Email de Contato</Label>
                  <Input
                    id="email-contato"
                    type="email"
                    defaultValue="contato@sistema.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="moeda">Moeda</Label>
                  <Select defaultValue="BRL">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione a moeda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BRL">Real (BRL)</SelectItem>
                      <SelectItem value="USD">Dólar (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notificações</h3>

                <div className="flex items-center space-x-2">
                  <Switch id="notificacoes-email" defaultChecked />
                  <Label htmlFor="notificacoes-email">
                    Enviar notificações por email
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="notificacoes-sistema" defaultChecked />
                  <Label htmlFor="notificacoes-sistema">
                    Notificações no sistema
                  </Label>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Manutenção</h3>

                <div className="flex items-center space-x-2">
                  <Switch id="modo-manutencao" />
                  <Label htmlFor="modo-manutencao">
                    Ativar modo de manutenção
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensagem-manutencao">
                    Mensagem de manutenção
                  </Label>
                  <Input
                    id="mensagem-manutencao"
                    defaultValue="Sistema em manutenção. Voltaremos em breve!"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
