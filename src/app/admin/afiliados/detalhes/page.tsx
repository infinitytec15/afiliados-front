"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  User,
  FileText,
  DollarSign,
  Users,
  BarChart3,
  Calendar,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Building,
  FileCheck,
} from "lucide-react";

export default function DetalhesAfiliadoPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("perfil");

  // Mock data para demonstração
  const afiliado = {
    id: "1",
    nome: "João Silva",
    email: "joao.silva@email.com",
    cpf: "123.456.789-00",
    telefone: "(11) 98765-4321",
    endereco: "Av. Paulista, 1000, São Paulo - SP",
    nivel: 1,
    status: "Ativo",
    comissoes: 1250.75,
    indicados: 8,
    dataRegistro: "15/03/2023",
    qualificacao: "Ouro",
    banco: "Banco do Brasil",
    agencia: "1234",
    conta: "12345-6",
    pix: "joao.silva@email.com",
    documentosVerificados: true,
    contratoAssinado: true,
  };

  // Mock data para histórico de comissões
  const historicoComissoes = [
    {
      id: "COM001",
      valor: 350.25,
      data: "10/05/2023",
      status: "Pago",
      origem: "Venda direta - Cliente A",
    },
    {
      id: "COM002",
      valor: 125.5,
      data: "05/05/2023",
      status: "Pago",
      origem: "Comissão nível 2 - Afiliado B",
    },
    {
      id: "COM003",
      valor: 275.0,
      data: "28/04/2023",
      status: "Pago",
      origem: "Venda direta - Cliente C",
    },
    {
      id: "COM004",
      valor: 500.0,
      data: "15/04/2023",
      status: "Pago",
      origem: "Venda direta - Cliente D",
    },
  ];

  // Mock data para indicados
  const indicados = [
    {
      id: "IND001",
      nome: "Ana Souza",
      email: "ana.souza@email.com",
      dataRegistro: "20/03/2023",
      status: "Ativo",
      comissoesGeradas: 450.75,
    },
    {
      id: "IND002",
      nome: "Carlos Oliveira",
      email: "carlos.oliveira@email.com",
      dataRegistro: "25/03/2023",
      status: "Ativo",
      comissoesGeradas: 325.5,
    },
    {
      id: "IND003",
      nome: "Mariana Costa",
      email: "mariana.costa@email.com",
      dataRegistro: "02/04/2023",
      status: "Pendente",
      comissoesGeradas: 0,
    },
  ];

  // Função para formatar valor monetário
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Detalhes do Afiliado
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-4 bg-white border-0 shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b pb-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                {afiliado.nome.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold">{afiliado.nome}</h2>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  {afiliado.email}
                </div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${afiliado.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {afiliado.status}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800`}
                >
                  Nível {afiliado.nivel}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800`}
                >
                  {afiliado.qualificacao}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="perfil" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Perfil
                </TabsTrigger>
                <TabsTrigger
                  value="financeiro"
                  className="flex items-center gap-2"
                >
                  <DollarSign className="h-4 w-4" />
                  Financeiro
                </TabsTrigger>
                <TabsTrigger
                  value="indicados"
                  className="flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  Indicados
                </TabsTrigger>
              </TabsList>

              <TabsContent value="perfil" className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <User className="h-5 w-5 text-blue-600" />
                        Dados Pessoais
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Nome Completo</p>
                          <p className="font-medium">{afiliado.nome}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">CPF</p>
                          <p className="font-medium">{afiliado.cpf}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{afiliado.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Telefone</p>
                          <p className="font-medium">{afiliado.telefone}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-gray-500">Endereço</p>
                          <p className="font-medium">{afiliado.endereco}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Building className="h-5 w-5 text-blue-600" />
                        Dados Bancários
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Banco</p>
                          <p className="font-medium">{afiliado.banco}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Agência</p>
                          <p className="font-medium">{afiliado.agencia}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Conta</p>
                          <p className="font-medium">{afiliado.conta}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Chave PIX</p>
                          <p className="font-medium">{afiliado.pix}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        Datas Importantes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            Data de Registro
                          </p>
                          <p className="font-medium">{afiliado.dataRegistro}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Última Atualização
                          </p>
                          <p className="font-medium">20/04/2023</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Último Pagamento
                          </p>
                          <p className="font-medium">10/05/2023</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Próximo Pagamento
                          </p>
                          <p className="font-medium">10/06/2023</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileCheck className="h-5 w-5 text-blue-600" />
                        Documentação
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">
                              Documentos Verificados
                            </p>
                            <p className="text-sm text-gray-500">
                              CPF, RG e Comprovante de Residência
                            </p>
                          </div>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${afiliado.documentosVerificados ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                          >
                            {afiliado.documentosVerificados
                              ? "Verificado"
                              : "Pendente"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Contrato Assinado</p>
                            <p className="text-sm text-gray-500">
                              Termos e condições do programa de afiliados
                            </p>
                          </div>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${afiliado.contratoAssinado ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                          >
                            {afiliado.contratoAssinado
                              ? "Assinado"
                              : "Pendente"}
                          </span>
                        </div>
                        <div className="pt-2">
                          <Button variant="outline" className="w-full">
                            <FileText className="h-4 w-4 mr-2" />
                            Ver Documentos
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="financeiro" className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-800">
                            Total de Comissões
                          </p>
                          <p className="text-2xl font-bold text-blue-900">
                            {formatCurrency(afiliado.comissoes)}
                          </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-blue-200 flex items-center justify-center">
                          <DollarSign className="h-6 w-6 text-blue-700" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-green-50 to-green-100">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-800">
                            Disponível para Saque
                          </p>
                          <p className="text-2xl font-bold text-green-900">
                            {formatCurrency(750.25)}
                          </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-green-200 flex items-center justify-center">
                          <CreditCard className="h-6 w-6 text-green-700" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-purple-800">
                            Comissões Pendentes
                          </p>
                          <p className="text-2xl font-bold text-purple-900">
                            {formatCurrency(325.5)}
                          </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-purple-200 flex items-center justify-center">
                          <BarChart3 className="h-6 w-6 text-purple-700" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                      Histórico de Comissões
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium text-gray-600">
                              ID
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">
                              Valor
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">
                              Data
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">
                              Status
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">
                              Origem
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {historicoComissoes.map((comissao) => (
                            <tr
                              key={comissao.id}
                              className="border-b hover:bg-gray-50"
                            >
                              <td className="py-3 px-4">{comissao.id}</td>
                              <td className="py-3 px-4 font-medium">
                                {formatCurrency(comissao.valor)}
                              </td>
                              <td className="py-3 px-4">{comissao.data}</td>
                              <td className="py-3 px-4">
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${comissao.status === "Pago" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                                >
                                  {comissao.status}
                                </span>
                              </td>
                              <td className="py-3 px-4">{comissao.origem}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="indicados" className="p-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      Afiliados Indicados
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium text-gray-600">
                              ID
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">
                              Nome
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">
                              Email
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">
                              Data de Registro
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">
                              Status
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">
                              Comissões Geradas
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {indicados.map((indicado) => (
                            <tr
                              key={indicado.id}
                              className="border-b hover:bg-gray-50"
                            >
                              <td className="py-3 px-4">{indicado.id}</td>
                              <td className="py-3 px-4 font-medium">
                                {indicado.nome}
                              </td>
                              <td className="py-3 px-4">{indicado.email}</td>
                              <td className="py-3 px-4">
                                {indicado.dataRegistro}
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${indicado.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                                >
                                  {indicado.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 font-medium">
                                {formatCurrency(indicado.comissoesGeradas)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
