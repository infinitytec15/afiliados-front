"use client";

import React, { useState } from "react";
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
import {
  QrCode,
  Lock,
  Settings,
  Users,
  Award,
  Trash2,
  Plus,
  Search,
  Percent,
  UserPlus,
  History,
  FileText,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export default function ConfiguracoesPage() {
  const [niveis, setNiveis] = useState(2);
  const [qualificacoes, setQualificacoes] = useState([
    { nome: "Bronze", pontos: 500, pin: "BR123" },
    { nome: "Prata", pontos: 1000, pin: "PR456" },
    { nome: "Ouro", pontos: 2000, pin: "OU789" },
  ]);

  const [comissoesPersonalizadas, setComissoesPersonalizadas] = useState([
    {
      id: 1,
      nome: "João Silva",
      email: "joao@exemplo.com",
      nivel1: 12,
      nivel2: 6,
    },
    {
      id: 2,
      nome: "Maria Santos",
      email: "maria@exemplo.com",
      nivel1: 15,
      nivel2: 7,
    },
  ]);

  const [termoBusca, setTermoBusca] = useState("");
  const [comissaoPersonalizada, setComissaoPersonalizada] = useState({
    nivel1: 0,
    nivel2: 0,
  });

  const [detalhesComissao, setDetalhesComissao] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  const adicionarQualificacao = () => {
    setQualificacoes([
      ...qualificacoes,
      { nome: "Nova Qualificação", pontos: 0, pin: "" },
    ]);
  };

  const removerQualificacao = (index: number) => {
    const novasQualificacoes = [...qualificacoes];
    novasQualificacoes.splice(index, 1);
    setQualificacoes(novasQualificacoes);
  };

  const atualizarQualificacao = (
    index: number,
    campo: string,
    valor: string | number,
  ) => {
    const novasQualificacoes = [...qualificacoes];
    novasQualificacoes[index] = {
      ...novasQualificacoes[index],
      [campo]: valor,
    };
    setQualificacoes(novasQualificacoes);
  };

  const abrirDetalhesComissao = (
    data: string,
    nome: string,
    comissaoAnterior: string,
    comissaoAtual: string,
  ) => {
    setDetalhesComissao({
      data,
      nome,
      comissaoAnterior,
      comissaoAtual,
      detalhes: [
        {
          nivel: 1,
          anterior: comissaoAnterior.split(" / ")[0],
          atual: comissaoAtual.split(" / ")[0],
        },
        {
          nivel: 2,
          anterior: comissaoAnterior.split(" / ")[1],
          atual: comissaoAtual.split(" / ")[1],
        },
      ],
    });
    setModalAberto(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Configurações do Sistema
        </h1>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
          Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="afiliados" className="w-full">
        <TabsList className="grid grid-cols-4 md:w-[500px] bg-gradient-to-r from-blue-100 to-purple-100 p-1 rounded-xl">
          <TabsTrigger
            value="afiliados"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg"
          >
            Afiliados
          </TabsTrigger>
          <TabsTrigger
            value="comissoes"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg"
          >
            Comissões
          </TabsTrigger>
          <TabsTrigger
            value="seguranca"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg"
          >
            Segurança
          </TabsTrigger>
          <TabsTrigger
            value="geral"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg"
          >
            Geral
          </TabsTrigger>
        </TabsList>

        {/* Configurações de Afiliados */}
        <TabsContent value="afiliados" className="space-y-4 mt-4">
          <Card className="bg-white border-0 shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <CardTitle className="flex items-center text-blue-800">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Estrutura de Afiliados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
                  <Label htmlFor="niveis" className="text-blue-800 font-medium">
                    Número de Níveis
                  </Label>
                  <Select
                    value={niveis.toString()}
                    onValueChange={(value) => setNiveis(parseInt(value))}
                  >
                    <SelectTrigger className="w-[100px] border-blue-200 bg-white">
                      <SelectValue placeholder="Níveis" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="7">7</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="bg-gradient-to-r from-blue-200 to-purple-200" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-blue-800 flex items-center">
                    <Award className="h-5 w-5 mr-2 text-purple-600" />
                    Comissões por Nível
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: niveis }).map((_, index) => (
                      <div
                        key={index}
                        className="space-y-2 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100"
                      >
                        <Label
                          htmlFor={`comissao-nivel-${index + 1}`}
                          className="text-blue-800"
                        >
                          Nível {index + 1}
                        </Label>
                        <div className="flex items-center">
                          <Input
                            id={`comissao-nivel-${index + 1}`}
                            type="number"
                            defaultValue={
                              index === 0 ? "10" : index === 1 ? "5" : "3"
                            }
                            className="w-24 border-blue-200"
                          />
                          <span className="ml-2 text-blue-800">%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="bg-gradient-to-r from-blue-200 to-purple-200" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-blue-800 flex items-center">
                    <Award className="h-5 w-5 mr-2 text-purple-600" />
                    Qualificações
                  </h3>

                  <div className="space-y-4">
                    {qualificacoes.map((qualificacao, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100 relative"
                      >
                        <div className="space-y-2">
                          <Label
                            htmlFor={`qualificacao-nome-${index}`}
                            className="text-blue-800"
                          >
                            Nome
                          </Label>
                          <Input
                            id={`qualificacao-nome-${index}`}
                            value={qualificacao.nome}
                            onChange={(e) =>
                              atualizarQualificacao(
                                index,
                                "nome",
                                e.target.value,
                              )
                            }
                            className="border-blue-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor={`qualificacao-pontos-${index}`}
                            className="text-blue-800"
                          >
                            Pontos Necessários
                          </Label>
                          <Input
                            id={`qualificacao-pontos-${index}`}
                            type="number"
                            value={qualificacao.pontos}
                            onChange={(e) =>
                              atualizarQualificacao(
                                index,
                                "pontos",
                                parseInt(e.target.value),
                              )
                            }
                            className="border-blue-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor={`qualificacao-pin-${index}`}
                            className="text-blue-800"
                          >
                            PIN de Qualificação
                          </Label>
                          <Input
                            id={`qualificacao-pin-${index}`}
                            value={qualificacao.pin}
                            onChange={(e) =>
                              atualizarQualificacao(
                                index,
                                "pin",
                                e.target.value,
                              )
                            }
                            className="border-blue-200"
                          />
                        </div>

                        <div className="flex items-end">
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => removerQualificacao(index)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    <Button
                      onClick={adicionarQualificacao}
                      className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Adicionar Qualificação
                    </Button>
                  </div>
                </div>

                <Separator className="bg-gradient-to-r from-blue-200 to-purple-200" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-blue-800">
                    Qualificação com PIN
                  </h3>

                  <div className="flex items-center space-x-2 bg-blue-50 p-4 rounded-lg">
                    <Switch
                      id="pin-qualificacao"
                      defaultChecked
                      className="data-[state=checked]:bg-blue-600"
                    />
                    <Label htmlFor="pin-qualificacao" className="text-blue-800">
                      Ativar qualificação com PIN
                    </Label>
                  </div>

                  <div className="space-y-2 bg-blue-50 p-4 rounded-lg">
                    <Label
                      htmlFor="valor-qualificacao"
                      className="text-blue-800"
                    >
                      Valor mínimo para qualificação
                    </Label>
                    <div className="flex items-center">
                      <span className="mr-2 text-blue-800">R$</span>
                      <Input
                        id="valor-qualificacao"
                        type="number"
                        defaultValue="500"
                        className="w-32 border-blue-200"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <CardTitle className="text-blue-800">
                Regras de Aprovação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center space-x-2 bg-blue-50 p-4 rounded-lg">
                <Switch
                  id="aprovacao-automatica"
                  className="data-[state=checked]:bg-blue-600"
                />
                <Label htmlFor="aprovacao-automatica" className="text-blue-800">
                  Aprovar afiliados automaticamente
                </Label>
              </div>

              <div className="flex items-center space-x-2 bg-blue-50 p-4 rounded-lg">
                <Switch
                  id="exigir-documentos"
                  defaultChecked
                  className="data-[state=checked]:bg-blue-600"
                />
                <Label htmlFor="exigir-documentos" className="text-blue-800">
                  Exigir documentos para aprovação
                </Label>
              </div>

              <div className="flex items-center space-x-2 bg-blue-50 p-4 rounded-lg">
                <Switch
                  id="verificar-email"
                  defaultChecked
                  className="data-[state=checked]:bg-blue-600"
                />
                <Label htmlFor="verificar-email" className="text-blue-800">
                  Verificar email antes da aprovação
                </Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações de Comissões */}
        <TabsContent value="comissoes" className="space-y-4 mt-4">
          <Card className="bg-white border-0 shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <CardTitle className="flex items-center text-blue-800">
                <UserPlus className="h-5 w-5 mr-2 text-blue-600" />
                Comissões Personalizadas por Afiliado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 bg-blue-50 p-4 rounded-lg">
                  <Search className="h-5 w-5 text-blue-600" />
                  <Input
                    placeholder="Buscar afiliado por nome ou email..."
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                    className="border-blue-200"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                        <th className="p-3 text-left">Nome</th>
                        <th className="p-3 text-left">Email</th>
                        {Array.from({ length: niveis }).map((_, index) => (
                          <th key={index} className="p-3 text-center">
                            Nível {index + 1} (%)
                          </th>
                        ))}
                        <th className="p-3 text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comissoesPersonalizadas
                        .filter(
                          (afiliado) =>
                            afiliado.nome
                              .toLowerCase()
                              .includes(termoBusca.toLowerCase()) ||
                            afiliado.email
                              .toLowerCase()
                              .includes(termoBusca.toLowerCase()),
                        )
                        .map((afiliado, index) => (
                          <tr
                            key={afiliado.id}
                            className={
                              index % 2 === 0 ? "bg-white" : "bg-blue-50"
                            }
                          >
                            <td className="p-3">{afiliado.nome}</td>
                            <td className="p-3">{afiliado.email}</td>
                            <td className="p-3 text-center">
                              <Input
                                type="number"
                                value={afiliado.nivel1}
                                onChange={(e) => {
                                  const novasComissoes = [
                                    ...comissoesPersonalizadas,
                                  ];
                                  novasComissoes[index].nivel1 =
                                    parseInt(e.target.value) || 0;
                                  setComissoesPersonalizadas(novasComissoes);
                                }}
                                className="w-16 mx-auto border-blue-200"
                              />
                            </td>
                            {niveis > 1 && (
                              <td className="p-3 text-center">
                                <Input
                                  type="number"
                                  value={afiliado.nivel2}
                                  onChange={(e) => {
                                    const novasComissoes = [
                                      ...comissoesPersonalizadas,
                                    ];
                                    novasComissoes[index].nivel2 =
                                      parseInt(e.target.value) || 0;
                                    setComissoesPersonalizadas(novasComissoes);
                                  }}
                                  className="w-16 mx-auto border-blue-200"
                                />
                              </td>
                            )}
                            <td className="p-3 text-center">
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => {
                                  const novasComissoes =
                                    comissoesPersonalizadas.filter(
                                      (c) => c.id !== afiliado.id,
                                    );
                                  setComissoesPersonalizadas(novasComissoes);
                                }}
                                className="bg-red-500 hover:bg-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg space-y-4">
                  <h3 className="text-lg font-medium text-blue-800 flex items-center">
                    <UserPlus className="h-5 w-5 mr-2 text-purple-600" />
                    Adicionar Comissão Personalizada
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="novo-afiliado" className="text-blue-800">
                        Selecionar Afiliado
                      </Label>
                      <Select>
                        <SelectTrigger className="border-blue-200 bg-white">
                          <SelectValue placeholder="Selecione um afiliado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Ana Oliveira</SelectItem>
                          <SelectItem value="2">Carlos Mendes</SelectItem>
                          <SelectItem value="3">Juliana Costa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {Array.from({ length: niveis }).map((_, index) => (
                      <div key={index} className="space-y-2">
                        <Label
                          htmlFor={`nova-comissao-nivel-${index + 1}`}
                          className="text-blue-800"
                        >
                          Comissão Nível {index + 1}
                        </Label>
                        <div className="flex items-center">
                          <Input
                            id={`nova-comissao-nivel-${index + 1}`}
                            type="number"
                            value={
                              index === 0
                                ? comissaoPersonalizada.nivel1
                                : comissaoPersonalizada.nivel2
                            }
                            onChange={(e) => {
                              const valor = parseInt(e.target.value) || 0;
                              setComissaoPersonalizada((prev) => ({
                                ...prev,
                                [index === 0 ? "nivel1" : "nivel2"]: valor,
                              }));
                            }}
                            className="w-24 border-blue-200"
                          />
                          <span className="ml-2 text-blue-800">%</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => {
                      // Simulando adição de um novo afiliado com comissão personalizada
                      const novoAfiliado = {
                        id: comissoesPersonalizadas.length + 1,
                        nome: "Novo Afiliado",
                        email: "novo@exemplo.com",
                        nivel1: comissaoPersonalizada.nivel1,
                        nivel2: comissaoPersonalizada.nivel2,
                      };
                      setComissoesPersonalizadas([
                        ...comissoesPersonalizadas,
                        novoAfiliado,
                      ]);
                      setComissaoPersonalizada({ nivel1: 0, nivel2: 0 });
                    }}
                    className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white mt-4"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Adicionar Comissão
                    Personalizada
                  </Button>
                </div>

                <Separator className="bg-gradient-to-r from-blue-200 to-purple-200 my-6" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-blue-800 flex items-center">
                    <History className="h-5 w-5 mr-2 text-purple-600" />
                    Histórico de Alterações de Comissões
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                          <th className="p-3 text-left">Data</th>
                          <th className="p-3 text-left">Nome do Afiliado</th>
                          <th className="p-3 text-left">Comissão Anterior</th>
                          <th className="p-3 text-left">Comissão Atual</th>
                          <th className="p-3 text-center">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white">
                          <td className="p-3">15/06/2023</td>
                          <td className="p-3">João Silva</td>
                          <td className="p-3">10% / 5%</td>
                          <td className="p-3">12% / 6%</td>
                          <td className="p-3 text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue-300 hover:bg-blue-50"
                              onClick={() =>
                                abrirDetalhesComissao(
                                  "15/06/2023",
                                  "João Silva",
                                  "10% / 5%",
                                  "12% / 6%",
                                )
                              }
                            >
                              <FileText className="h-4 w-4 mr-1" /> Detalhes
                            </Button>
                          </td>
                        </tr>
                        <tr className="bg-blue-50">
                          <td className="p-3">10/06/2023</td>
                          <td className="p-3">Maria Santos</td>
                          <td className="p-3">10% / 5%</td>
                          <td className="p-3">15% / 7%</td>
                          <td className="p-3 text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue-300 hover:bg-blue-50"
                              onClick={() =>
                                abrirDetalhesComissao(
                                  "10/06/2023",
                                  "Maria Santos",
                                  "10% / 5%",
                                  "15% / 7%",
                                )
                              }
                            >
                              <FileText className="h-4 w-4 mr-1" /> Detalhes
                            </Button>
                          </td>
                        </tr>
                        <tr className="bg-white">
                          <td className="p-3">05/06/2023</td>
                          <td className="p-3">Carlos Mendes</td>
                          <td className="p-3">10% / 5%</td>
                          <td className="p-3">11% / 5%</td>
                          <td className="p-3 text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue-300 hover:bg-blue-50"
                              onClick={() =>
                                abrirDetalhesComissao(
                                  "05/06/2023",
                                  "Carlos Mendes",
                                  "10% / 5%",
                                  "11% / 5%",
                                )
                              }
                            >
                              <FileText className="h-4 w-4 mr-1" /> Detalhes
                            </Button>
                          </td>
                        </tr>
                        <tr className="bg-blue-50">
                          <td className="p-3">01/06/2023</td>
                          <td className="p-3">Ana Oliveira</td>
                          <td className="p-3">10% / 5%</td>
                          <td className="p-3">10% / 6%</td>
                          <td className="p-3 text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue-300 hover:bg-blue-50"
                              onClick={() =>
                                abrirDetalhesComissao(
                                  "01/06/2023",
                                  "Ana Oliveira",
                                  "10% / 5%",
                                  "10% / 6%",
                                )
                              }
                            >
                              <FileText className="h-4 w-4 mr-1" /> Detalhes
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações de Segurança */}
        <TabsContent value="seguranca" className="space-y-4 mt-4">
          <Card className="bg-white border-0 shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <CardTitle className="flex items-center text-blue-800">
                <Lock className="h-5 w-5 mr-2 text-blue-600" />
                Autenticação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 bg-blue-50 p-4 rounded-lg">
                  <Switch
                    id="2fa-admin"
                    defaultChecked
                    className="data-[state=checked]:bg-blue-600"
                  />
                  <Label htmlFor="2fa-admin" className="text-blue-800">
                    Exigir 2FA para usuários administrativos
                  </Label>
                </div>

                <div className="flex items-center space-x-2 bg-blue-50 p-4 rounded-lg">
                  <Switch
                    id="2fa-afiliados"
                    className="data-[state=checked]:bg-blue-600"
                  />
                  <Label htmlFor="2fa-afiliados" className="text-blue-800">
                    Permitir 2FA para afiliados
                  </Label>
                </div>

                <div className="flex items-center space-x-2 bg-blue-50 p-4 rounded-lg">
                  <QrCode className="h-5 w-5 mr-2 text-blue-600" />
                  <Label className="text-blue-800">Método de 2FA</Label>
                  <Select defaultValue="qrcode">
                    <SelectTrigger className="w-[180px] ml-2 border-blue-200 bg-white">
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

              <Separator className="bg-gradient-to-r from-blue-200 to-purple-200" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-800">
                  Políticas de Senha
                </h3>

                <div className="space-y-2 bg-blue-50 p-4 rounded-lg">
                  <Label htmlFor="tamanho-minimo" className="text-blue-800">
                    Tamanho mínimo
                  </Label>
                  <Input
                    id="tamanho-minimo"
                    type="number"
                    defaultValue="8"
                    className="w-20 border-blue-200"
                  />
                </div>

                <div className="flex items-center space-x-2 bg-blue-50 p-4 rounded-lg">
                  <Switch
                    id="exigir-maiusculas"
                    defaultChecked
                    className="data-[state=checked]:bg-blue-600"
                  />
                  <Label htmlFor="exigir-maiusculas" className="text-blue-800">
                    Exigir letras maiúsculas
                  </Label>
                </div>

                <div className="flex items-center space-x-2 bg-blue-50 p-4 rounded-lg">
                  <Switch
                    id="exigir-numeros"
                    defaultChecked
                    className="data-[state=checked]:bg-blue-600"
                  />
                  <Label htmlFor="exigir-numeros" className="text-blue-800">
                    Exigir números
                  </Label>
                </div>

                <div className="flex items-center space-x-2 bg-blue-50 p-4 rounded-lg">
                  <Switch
                    id="exigir-especiais"
                    defaultChecked
                    className="data-[state=checked]:bg-blue-600"
                  />
                  <Label htmlFor="exigir-especiais" className="text-blue-800">
                    Exigir caracteres especiais
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <CardTitle className="text-blue-800">Sessões</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="space-y-2 bg-blue-50 p-4 rounded-lg">
                <Label htmlFor="tempo-sessao" className="text-blue-800">
                  Tempo de sessão (minutos)
                </Label>
                <Input
                  id="tempo-sessao"
                  type="number"
                  defaultValue="60"
                  className="w-24 border-blue-200"
                />
              </div>

              <div className="flex items-center space-x-2 bg-blue-50 p-4 rounded-lg">
                <Switch
                  id="logout-inatividade"
                  defaultChecked
                  className="data-[state=checked]:bg-blue-600"
                />
                <Label htmlFor="logout-inatividade" className="text-blue-800">
                  Logout automático por inatividade
                </Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações Gerais */}
        <TabsContent value="geral" className="space-y-4 mt-4">
          <Card className="bg-white border-0 shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <CardTitle className="flex items-center text-blue-800">
                <Settings className="h-5 w-5 mr-2 text-blue-600" />
                Configurações Gerais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-4">
                <div className="space-y-2 bg-blue-50 p-4 rounded-lg">
                  <Label htmlFor="nome-sistema" className="text-blue-800">
                    Nome do Sistema
                  </Label>
                  <Input
                    id="nome-sistema"
                    defaultValue="Sistema de Afiliados"
                    className="border-blue-200"
                  />
                </div>

                <div className="space-y-2 bg-blue-50 p-4 rounded-lg">
                  <Label htmlFor="email-contato" className="text-blue-800">
                    Email de Contato
                  </Label>
                  <Input
                    id="email-contato"
                    type="email"
                    defaultValue="contato@sistema.com"
                    className="border-blue-200"
                  />
                </div>

                <div className="space-y-2 bg-blue-50 p-4 rounded-lg">
                  <Label htmlFor="moeda" className="text-blue-800">
                    Moeda
                  </Label>
                  <Select defaultValue="BRL">
                    <SelectTrigger className="w-[180px] border-blue-200 bg-white">
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

              <Separator className="bg-gradient-to-r from-blue-200 to-purple-200" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-800">
                  Notificações
                </h3>

                <div className="flex items-center space-x-2 bg-blue-50 p-4 rounded-lg">
                  <Switch
                    id="notificacoes-email"
                    defaultChecked
                    className="data-[state=checked]:bg-blue-600"
                  />
                  <Label htmlFor="notificacoes-email" className="text-blue-800">
                    Enviar notificações por email
                  </Label>
                </div>

                <div className="flex items-center space-x-2 bg-blue-50 p-4 rounded-lg">
                  <Switch
                    id="notificacoes-sistema"
                    defaultChecked
                    className="data-[state=checked]:bg-blue-600"
                  />
                  <Label
                    htmlFor="notificacoes-sistema"
                    className="text-blue-800"
                  >
                    Notificações no sistema
                  </Label>
                </div>
              </div>

              <Separator className="bg-gradient-to-r from-blue-200 to-purple-200" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-800">
                  Manutenção
                </h3>

                <div className="flex items-center space-x-2 bg-blue-50 p-4 rounded-lg">
                  <Switch
                    id="modo-manutencao"
                    className="data-[state=checked]:bg-blue-600"
                  />
                  <Label htmlFor="modo-manutencao" className="text-blue-800">
                    Ativar modo de manutenção
                  </Label>
                </div>

                <div className="space-y-2 bg-blue-50 p-4 rounded-lg">
                  <Label
                    htmlFor="mensagem-manutencao"
                    className="text-blue-800"
                  >
                    Mensagem de manutenção
                  </Label>
                  <Input
                    id="mensagem-manutencao"
                    defaultValue="Sistema em manutenção. Voltaremos em breve!"
                    className="border-blue-200"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de Detalhes de Comissão */}
      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent className="bg-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-blue-800 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Detalhes da Alteração de Comissão
            </DialogTitle>
            <DialogDescription className="text-blue-600">
              Informações detalhadas sobre a alteração de comissão
            </DialogDescription>
          </DialogHeader>

          {detalhesComissao && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Data da Alteração</p>
                  <p className="font-medium">{detalhesComissao.data}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Afiliado</p>
                  <p className="font-medium">{detalhesComissao.nome}</p>
                </div>
              </div>

              <Separator className="bg-gradient-to-r from-blue-200 to-purple-200" />

              <div>
                <h4 className="font-medium text-blue-800 mb-2">
                  Comissões por Nível
                </h4>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                  <table className="w-full">
                    <thead>
                      <tr className="text-blue-800">
                        <th className="text-left py-2">Nível</th>
                        <th className="text-center py-2">Anterior</th>
                        <th className="text-center py-2">Atual</th>
                        <th className="text-center py-2">Variação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detalhesComissao.detalhes.map((detalhe, index) => {
                        const anterior = parseInt(detalhe.anterior) || 0;
                        const atual = parseInt(detalhe.atual) || 0;
                        const variacao = atual - anterior;
                        const variacaoClasse =
                          variacao > 0
                            ? "text-green-600"
                            : variacao < 0
                              ? "text-red-600"
                              : "text-gray-600";

                        return (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0 ? "bg-white bg-opacity-50" : ""
                            }
                          >
                            <td className="py-2">Nível {detalhe.nivel}</td>
                            <td className="text-center py-2">
                              {detalhe.anterior}
                            </td>
                            <td className="text-center py-2">
                              {detalhe.atual}
                            </td>
                            <td
                              className={`text-center py-2 font-medium ${variacaoClasse}`}
                            >
                              {variacao > 0 ? `+${variacao}%` : `${variacao}%`}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  Esta alteração foi realizada por{" "}
                  <span className="font-medium">Admin</span> em{" "}
                  {detalhesComissao.data} às 14:30.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              onClick={() => setModalAberto(false)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
