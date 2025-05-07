"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircleIcon, MessageSquareIcon, PhoneIcon } from "lucide-react";

export default function SuportePage() {
  const [activeTab, setActiveTab] = useState("faq");

  return (
    <div className="flex flex-col gap-6 p-6 bg-background">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Suporte</h1>
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contato">Contato</TabsTrigger>
          <TabsTrigger value="tickets">Meus Tickets</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-medium text-lg mb-2 flex items-center">
                    <HelpCircleIcon className="h-5 w-5 mr-2 text-primary" />
                    Como funciona o programa de afiliados?
                  </h3>
                  <p className="text-muted-foreground">
                    Nosso programa de afiliados funciona em dois níveis. Você
                    ganha comissões pelas vendas diretas que fizer (nível 1) e
                    também pelas vendas feitas por afiliados que você indicou
                    (nível 2). As comissões são de 10% para vendas diretas e 3%
                    para vendas de seus indicados.
                  </p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-medium text-lg mb-2 flex items-center">
                    <HelpCircleIcon className="h-5 w-5 mr-2 text-primary" />
                    Quando recebo minhas comissões?
                  </h3>
                  <p className="text-muted-foreground">
                    As comissões são calculadas mensalmente e ficam disponíveis
                    para saque até o dia 10 do mês seguinte. O valor mínimo para
                    saque é de R$ 100,00.
                  </p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-medium text-lg mb-2 flex items-center">
                    <HelpCircleIcon className="h-5 w-5 mr-2 text-primary" />
                    Como faço para indicar novos afiliados?
                  </h3>
                  <p className="text-muted-foreground">
                    Você pode compartilhar seu link de afiliado personalizado
                    que está disponível na seção "Materiais". Quando alguém se
                    cadastrar através desse link, será automaticamente vinculado
                    à sua rede.
                  </p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-medium text-lg mb-2 flex items-center">
                    <HelpCircleIcon className="h-5 w-5 mr-2 text-primary" />
                    Quais materiais de marketing estão disponíveis?
                  </h3>
                  <p className="text-muted-foreground">
                    Oferecemos diversos materiais como banners, textos prontos,
                    e-books, vídeos explicativos e links personalizados. Todos
                    esses materiais estão disponíveis na seção "Materiais".
                  </p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-medium text-lg mb-2 flex items-center">
                    <HelpCircleIcon className="h-5 w-5 mr-2 text-primary" />
                    Como acompanho o desempenho das minhas indicações?
                  </h3>
                  <p className="text-muted-foreground">
                    No Dashboard você encontra todas as métricas de desempenho,
                    incluindo número de cliques, conversões, vendas e comissões.
                    Na seção "Indicados" você pode ver detalhes específicos de
                    cada cliente ou afiliado que você indicou.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contato" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Entre em Contato</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="assunto">Assunto</Label>
                  <Input id="assunto" placeholder="Digite o assunto" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensagem">Mensagem</Label>
                  <Textarea
                    id="mensagem"
                    placeholder="Descreva sua dúvida ou problema em detalhes"
                    rows={5}
                  />
                </div>

                <div className="pt-2">
                  <Button className="w-full">
                    <MessageSquareIcon className="mr-2 h-4 w-4" />
                    Enviar Mensagem
                  </Button>
                </div>
              </form>

              <div className="mt-8 pt-6 border-t">
                <h3 className="font-medium mb-4">Outras formas de contato</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <PhoneIcon className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Telefone</p>
                      <p className="text-sm text-muted-foreground">
                        (11) 3456-7890
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MessageSquareIcon className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">
                        suporte@programaafiliados.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Meus Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">
                      #12345 - Problema com pagamento
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Aberto em 10/05/2023
                    </p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Em andamento
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">
                      #12340 - Dúvida sobre comissões
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Aberto em 05/05/2023
                    </p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Resolvido
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">
                      #12335 - Solicitação de material
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Aberto em 28/04/2023
                    </p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Resolvido
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button>
                  <MessageSquareIcon className="mr-2 h-4 w-4" />
                  Novo Ticket
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
