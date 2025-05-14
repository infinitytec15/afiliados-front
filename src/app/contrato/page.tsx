"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileTextIcon, CheckCircleIcon } from "lucide-react";
import Header from "@/components/layout/header";
import { useToast } from "@/components/ui/use-toast";
import DocumentValidator from "@/components/cadastro/DocumentValidator";
import AddressForm from "@/components/cadastro/AddressForm";

export default function ContratoPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [concordaTermos, setConcordaTermos] = useState(false);
  const [assinatura, setAssinatura] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [documento, setDocumento] = useState("");
  const [documentoError, setDocumentoError] = useState("");
  const [isDocumentValid, setIsDocumentValid] = useState(false);

  const handleDocumentChange = (value: string) => {
    setDocumento(value);
    setDocumentoError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!concordaTermos) {
      toast({
        title: "Termos não aceitos",
        description:
          "Você precisa concordar com os termos do contrato para continuar.",
        variant: "destructive",
      });
      hasError = true;
    }

    if (!assinatura) {
      toast({
        title: "Assinatura necessária",
        description:
          "Por favor, forneça sua assinatura digital para continuar.",
        variant: "destructive",
      });
      hasError = true;
    }

    if (!documento) {
      setDocumentoError("CPF/CNPJ é obrigatório");
      toast({
        title: "Documento obrigatório",
        description: "Por favor, forneça um CPF ou CNPJ válido.",
        variant: "destructive",
      });
      hasError = true;
    }

    if (hasError) return;

    try {
      setIsSubmitting(true);

      // Simular envio do contrato para o servidor
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setEnviado(true);
      toast({
        title: "Contrato assinado com sucesso!",
        description:
          "Sua conta de afiliado foi ativada. Você será redirecionado para o dashboard em instantes.",
        variant: "success",
      });

      // Redirecionar para o dashboard após um breve delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Erro ao processar contrato:", error);
      toast({
        title: "Erro ao processar contrato",
        description:
          "Ocorreu um erro ao processar seu contrato. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container max-w-4xl py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-b pb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <FileTextIcon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">
                    Contrato de Afiliado
                  </CardTitle>
                  <p className="text-muted-foreground mt-1">
                    Por favor, leia atentamente e assine o contrato abaixo para
                    ativar sua conta de afiliado.
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              {!enviado ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-4">
                    <DocumentValidator
                      value={documento}
                      onChange={handleDocumentChange}
                      error={documentoError}
                    />

                    <AddressForm />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Termos do Contrato
                    </h3>
                    <div className="bg-muted p-4 rounded-md h-64 overflow-y-auto text-sm">
                      <h4 className="font-semibold mb-2">1. PARTES</h4>
                      <p className="mb-4">
                        Este Contrato de Afiliado é celebrado entre a EMPRESA
                        XYZ LTDA, inscrita no CNPJ sob o nº 00.000.000/0001-00,
                        com sede na Rua Exemplo, nº 123, Cidade, Estado,
                        doravante denominada CONTRATANTE, e o AFILIADO, pessoa
                        física ou jurídica devidamente cadastrada no sistema de
                        afiliados da CONTRATANTE.
                      </p>

                      <h4 className="font-semibold mb-2">2. OBJETO</h4>
                      <p className="mb-4">
                        O presente contrato tem por objeto estabelecer as
                        condições para que o AFILIADO divulgue os produtos e
                        serviços da CONTRATANTE, mediante comissionamento sobre
                        as vendas realizadas por meio de sua indicação.
                      </p>

                      <h4 className="font-semibold mb-2">3. COMISSÕES</h4>
                      <p className="mb-4">
                        3.1. O AFILIADO receberá comissão de 10% (dez por cento)
                        sobre o valor líquido das vendas realizadas por meio de
                        sua indicação direta (Nível 1).
                        <br />
                        3.2. O AFILIADO receberá comissão de 3% (três por cento)
                        sobre o valor líquido das vendas realizadas por
                        afiliados por ele indicados (Nível 2).
                        <br />
                        3.3. As comissões serão calculadas mensalmente e pagas
                        até o dia 10 do mês subsequente, mediante emissão de
                        nota fiscal pelo AFILIADO.
                      </p>

                      <h4 className="font-semibold mb-2">4. OBRIGAÇÕES</h4>
                      <p className="mb-4">
                        4.1. O AFILIADO se compromete a divulgar os produtos e
                        serviços da CONTRATANTE de forma ética e legal, sem
                        utilizar práticas enganosas ou abusivas.
                        <br />
                        4.2. O AFILIADO não poderá utilizar spam, compra de
                        tráfego ilegal ou qualquer outra prática que viole as
                        políticas da CONTRATANTE.
                        <br />
                        4.3. A CONTRATANTE se compromete a fornecer materiais de
                        divulgação, links de afiliado e suporte necessário para
                        o trabalho do AFILIADO.
                      </p>

                      <h4 className="font-semibold mb-2">5. VIGÊNCIA</h4>
                      <p className="mb-4">
                        5.1. Este contrato tem vigência de 12 (doze) meses a
                        partir da data de sua assinatura, renovando-se
                        automaticamente por iguais períodos, caso não haja
                        manifestação contrária de qualquer das partes.
                        <br />
                        5.2. Qualquer das partes poderá rescindir o contrato
                        mediante notificação prévia de 30 (trinta) dias.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="termos"
                        checked={concordaTermos}
                        onCheckedChange={(checked) =>
                          setConcordaTermos(checked as boolean)
                        }
                      />
                      <Label
                        htmlFor="termos"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Li e concordo com os termos do contrato de afiliado
                      </Label>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="assinatura">Assinatura Digital</Label>
                      <Input
                        id="assinatura"
                        placeholder="Digite seu nome completo como assinatura"
                        value={assinatura}
                        onChange={(e) => setAssinatura(e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Ao digitar seu nome completo acima, você concorda que
                        esta é sua assinatura digital válida para este contrato.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 transition-all"
                      disabled={!concordaTermos || !assinatura || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processando...
                        </>
                      ) : (
                        "Assinar e Ativar Conta"
                      )}
                    </Button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10"
                >
                  <div className="rounded-full bg-green-100 p-3 mb-4">
                    <CheckCircleIcon className="h-12 w-12 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Contrato Assinado com Sucesso!
                  </h3>
                  <p className="text-center text-muted-foreground mb-6">
                    Sua conta de afiliado foi ativada. Você será redirecionado
                    para o dashboard em instantes.
                  </p>
                  <div className="w-full max-w-md h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2 }}
                    />
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
