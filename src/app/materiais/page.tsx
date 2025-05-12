"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileTextIcon, DownloadIcon, LinkIcon, CopyIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import UserPanelHeader from "@/components/UserPanelHeader";

export default function MateriaisPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Aqui você poderia adicionar uma notificação de sucesso
  };

  return (
    <>
      <UserPanelHeader />
      <div className="flex flex-col gap-6 p-6 bg-background">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Materiais</h1>
        </div>

        <Tabs defaultValue="marketing" className="w-full">
          <TabsList>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="links">Links de Afiliado</TabsTrigger>
            <TabsTrigger value="banners">Banners</TabsTrigger>
          </TabsList>

          <TabsContent value="marketing" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileTextIcon className="h-5 w-5" />
                    Guia de Início Rápido
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground mb-4">
                    Aprenda os primeiros passos para ter sucesso como afiliado.
                  </p>
                  <Button variant="outline" className="w-full">
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Baixar PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileTextIcon className="h-5 w-5" />
                    Estratégias de Vendas
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground mb-4">
                    Técnicas comprovadas para aumentar suas conversões.
                  </p>
                  <Button variant="outline" className="w-full">
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Baixar PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileTextIcon className="h-5 w-5" />
                    Perguntas Frequentes
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground mb-4">
                    Respostas para as dúvidas mais comuns dos seus clientes.
                  </p>
                  <Button variant="outline" className="w-full">
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Baixar PDF
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="links" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Seus Links de Afiliado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Link Principal</p>
                  <div className="flex">
                    <Input
                      value="https://exemplo.com/afiliado?ref=seu-codigo"
                      readOnly
                      className="rounded-r-none"
                    />
                    <Button
                      variant="secondary"
                      className="rounded-l-none"
                      onClick={() =>
                        copyToClipboard(
                          "https://exemplo.com/afiliado?ref=seu-codigo",
                        )
                      }
                    >
                      <CopyIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    Link para Produto Premium
                  </p>
                  <div className="flex">
                    <Input
                      value="https://exemplo.com/produto-premium?ref=seu-codigo"
                      readOnly
                      className="rounded-r-none"
                    />
                    <Button
                      variant="secondary"
                      className="rounded-l-none"
                      onClick={() =>
                        copyToClipboard(
                          "https://exemplo.com/produto-premium?ref=seu-codigo",
                        )
                      }
                    >
                      <CopyIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    Link para Pacote Completo
                  </p>
                  <div className="flex">
                    <Input
                      value="https://exemplo.com/pacote-completo?ref=seu-codigo"
                      readOnly
                      className="rounded-r-none"
                    />
                    <Button
                      variant="secondary"
                      className="rounded-l-none"
                      onClick={() =>
                        copyToClipboard(
                          "https://exemplo.com/pacote-completo?ref=seu-codigo",
                        )
                      }
                    >
                      <CopyIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="banners" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Banner Principal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Prévia do Banner</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <DownloadIcon className="mr-2 h-4 w-4" />
                      Baixar
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <CopyIcon className="mr-2 h-4 w-4" />
                      Copiar HTML
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Banner Lateral</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-[3/4] bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Prévia do Banner</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <DownloadIcon className="mr-2 h-4 w-4" />
                      Baixar
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <CopyIcon className="mr-2 h-4 w-4" />
                      Copiar HTML
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
