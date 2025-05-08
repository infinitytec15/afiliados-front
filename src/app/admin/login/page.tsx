"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Layers, Lock, QrCode } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminLoginPage() {
  const [showQrCode, setShowQrCode] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <Card className="w-full max-w-md bg-white shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-6">
          <div className="flex justify-center mb-2">
            <Layers className="h-12 w-12 text-white opacity-90" />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Panel</CardTitle>
          <p className="text-blue-100 mt-1">Acesso Administrativo</p>
        </CardHeader>

        <CardContent className="p-6">
          {showQrCode ? (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-lg font-medium mb-2">
                  Autenticação em Duas Etapas
                </h2>
                <p className="text-sm text-gray-500">
                  Escaneie o QR Code com seu aplicativo autenticador
                </p>
              </div>

              <div className="flex justify-center py-4">
                <div className="border-4 border-gray-200 rounded-lg p-2 bg-white">
                  <QrCode className="h-48 w-48 text-gray-800" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="codigo">Código de Verificação</Label>
                <Input
                  id="codigo"
                  placeholder="Digite o código de 6 dígitos"
                  className="text-center text-lg tracking-widest"
                  maxLength={6}
                />
              </div>

              <div className="flex justify-between pt-2">
                <Button variant="outline" onClick={() => setShowQrCode(false)}>
                  Voltar
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Verificar
                </Button>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid grid-cols-2 w-full mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="acesso-rapido">Acesso Rápido</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@exemplo.com"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="senha">Senha</Label>
                    <a
                      href="#"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Esqueceu a senha?
                    </a>
                  </div>
                  <Input id="senha" type="password" placeholder="********" />
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 mt-2"
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
                  <Label htmlFor="token">Token de Acesso</Label>
                  <Input
                    id="token"
                    placeholder="Digite o token de acesso"
                    className="text-center"
                  />
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-2">
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
