"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Layers, Lock, QrCode, Mail, KeyRound } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminLoginPage() {
  const [showQrCode, setShowQrCode] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="absolute inset-0 bg-grid-blue-500/[0.05] -z-10" />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none -z-10">
        <div className="w-full h-full max-w-6xl max-h-[600px] bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl rounded-full" />
      </div>

      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-8">
          <div className="flex justify-center mb-3">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm shadow-inner">
              <Layers className="h-12 w-12 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Admin Panel</CardTitle>
          <p className="text-blue-100 mt-1">Acesso Administrativo</p>
        </CardHeader>

        <CardContent className="p-6">
          {showQrCode ? (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-lg font-medium mb-2 text-blue-800">
                  Autenticação em Duas Etapas
                </h2>
                <p className="text-sm text-gray-500">
                  Escaneie o QR Code com seu aplicativo autenticador
                </p>
              </div>

              <div className="flex justify-center py-4">
                <div className="border-4 border-blue-100 rounded-lg p-2 bg-white shadow-inner">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-1 rounded-md">
                    <QrCode className="h-48 w-48 text-white" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="codigo" className="text-blue-800">
                  Código de Verificação
                </Label>
                <Input
                  id="codigo"
                  placeholder="Digite o código de 6 dígitos"
                  className="text-center text-lg tracking-widest border-blue-200"
                  maxLength={6}
                />
              </div>

              <div className="flex justify-between pt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowQrCode(false)}
                  className="border-blue-200 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  Voltar
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md">
                  Verificar
                </Button>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid grid-cols-2 w-full mb-6 bg-blue-50 p-1 rounded-lg">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-md"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="acesso-rapido"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-md"
                >
                  Acesso Rápido
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-blue-800">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@exemplo.com"
                      className="pl-10 border-blue-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="senha" className="text-blue-800">
                      Senha
                    </Label>
                    <a
                      href="#"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Esqueceu a senha?
                    </a>
                  </div>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="senha"
                      type="password"
                      placeholder="********"
                      className="pl-10 border-blue-200"
                    />
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md mt-2"
                  onClick={() => setShowQrCode(true)}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Entrar
                </Button>
              </TabsContent>

              <TabsContent value="acesso-rapido" className="space-y-4">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-500">
                    Acesse rapidamente sem credenciais
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="token" className="text-blue-800">
                    Token de Acesso
                  </Label>
                  <Input
                    id="token"
                    placeholder="Digite o token de acesso"
                    className="text-center border-blue-200"
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md mt-2">
                  <Lock className="h-4 w-4 mr-2" />
                  Acessar
                </Button>

                <div className="text-center mt-4">
                  <p className="text-xs text-gray-500">
                    O token de acesso é fornecido apenas para usuários
                    autorizados
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
