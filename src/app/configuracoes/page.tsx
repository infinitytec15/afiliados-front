"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import UserPanelHeader from "@/components/UserPanelHeader";

export default function ConfiguracoesPage() {
  const { user, saveCustomLinkSlug, customLinkSlug } = useAuth();
  const [activeTab, setActiveTab] = useState("perfil");
  const [customLink, setCustomLink] = useState("");
  const [previewLink, setPreviewLink] = useState("");
  const [linkSaved, setLinkSaved] = useState(false);

  useEffect(() => {
    if (customLinkSlug) {
      setCustomLink(customLinkSlug);
      updatePreviewLink(customLinkSlug);
    } else if (user?.id) {
      setCustomLink(user.id);
      updatePreviewLink(user.id);
    }
  }, [customLinkSlug, user]);

  const updatePreviewLink = (slug: string) => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    setPreviewLink(`${baseUrl}/cadastro/1?ref=${slug}`);
  };

  const handleCustomLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomLink(value);
    updatePreviewLink(value);
    setLinkSaved(false);
  };

  const handleSaveCustomLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (saveCustomLinkSlug(customLink)) {
      setLinkSaved(true);
      setTimeout(() => setLinkSaved(false), 3000);
    }
  };

  return (
    <>
      <UserPanelHeader />
      <div className="flex flex-col gap-6 p-6 bg-background">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        </div>

        <Tabs defaultValue="perfil" className="w-full">
          <TabsList>
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="conta">Conta</TabsTrigger>
            <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
            <TabsTrigger value="link">Link de Afiliado</TabsTrigger>
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
                    <Label htmlFor="confirmar-senha">
                      Confirmar Nova Senha
                    </Label>
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
                        Receba notificações quando alguém se cadastrar usando
                        seu link
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

          <TabsContent value="link" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Personalização do Link de Afiliado</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="current-link">Seu Link Atual</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="current-link"
                        value={previewLink}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          navigator.clipboard.writeText(previewLink);
                        }}
                        className="shrink-0"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            width="14"
                            height="14"
                            x="8"
                            y="8"
                            rx="2"
                            ry="2"
                          />
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom-link">
                      Personalizar Final do Link
                    </Label>
                    <div className="flex items-center gap-2">
                      <div className="flex-grow bg-muted rounded-md px-3 py-2 text-sm font-mono flex items-center">
                        {typeof window !== "undefined"
                          ? window.location.origin
                          : ""}
                        /cadastro/1?ref=
                      </div>
                      <Input
                        id="custom-link"
                        placeholder="seu-nome"
                        className="max-w-[200px] font-mono"
                        value={customLink}
                        onChange={handleCustomLinkChange}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Personalize o final do seu link de afiliado para facilitar
                      o compartilhamento. Use apenas letras, números e hífens.
                      Mínimo de 3 caracteres.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Prévia do Link Personalizado</Label>
                    <div className="bg-muted rounded-md px-3 py-2 text-sm font-mono break-all">
                      {previewLink}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <Button onClick={handleSaveCustomLink}>
                      Salvar Link Personalizado
                    </Button>
                    {linkSaved && (
                      <span className="text-sm text-green-600 animate-fade-in">
                        Link salvo com sucesso!
                      </span>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compartilhar Link</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Compartilhe seu link de afiliado nas redes sociais para
                    aumentar suas indicações.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                      Facebook
                    </Button>

                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        ></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                      Instagram
                    </Button>

                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                      Twitter
                    </Button>

                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                      </svg>
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      );
    </>
  );
}
