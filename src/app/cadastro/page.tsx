"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/layout/header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { validateCPF, validateCNPJ } from "@/lib/validate-document";

// Definindo o schema de validação para o passo 1
const step1Schema = z
  .object({
    email: z.string().email({ message: "Email inválido" }),
    senha: z
      .string()
      .min(8, { message: "Senha deve ter pelo menos 8 caracteres" })
      .regex(/[A-Z]/, {
        message: "Senha deve conter pelo menos uma letra maiúscula",
      })
      .regex(/[a-z]/, {
        message: "Senha deve conter pelo menos uma letra minúscula",
      })
      .regex(/[0-9]/, { message: "Senha deve conter pelo menos um número" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Senha deve conter pelo menos um caractere especial",
      }),
    confirmarSenha: z.string().min(8, { message: "Confirme sua senha" }),
    termos: z.literal(true, {
      errorMap: () => ({
        message: "Você precisa aceitar os termos e condições",
      }),
    }),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });

// Definindo o schema de validação para o passo 2
const step2Schema = z.object({
  nome: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  sobrenome: z
    .string()
    .min(2, { message: "Sobrenome deve ter pelo menos 2 caracteres" }),
  ddi: z.string().min(1, { message: "DDI é obrigatório" }),
  telefone: z.string().min(10, { message: "Telefone inválido" }),
  tipoDocumento: z.enum(["cpf", "cnpj"]),
  documento: z.string().refine(
    (val) => {
      const cleanVal = val.replace(/\D/g, "");
      if (cleanVal.length === 11) {
        return validateCPF(cleanVal);
      } else if (cleanVal.length === 14) {
        return validateCNPJ(cleanVal);
      }
      return false;
    },
    { message: "Documento inválido" },
  ),
  afiliado_id: z.string().optional(),
});

// Lista de DDIs populares
const ddiOptions = [
  { value: "55", label: "Brasil (+55)" },
  { value: "1", label: "EUA/Canadá (+1)" },
  { value: "351", label: "Portugal (+351)" },
  { value: "34", label: "Espanha (+34)" },
  { value: "44", label: "Reino Unido (+44)" },
  { value: "49", label: "Alemanha (+49)" },
  { value: "33", label: "França (+33)" },
  { value: "39", label: "Itália (+39)" },
  { value: "81", label: "Japão (+81)" },
  { value: "86", label: "China (+86)" },
];

// Lista de afiliados mock
const afiliados = [
  {
    id: "1",
    nome: "João Silva",
    email: "joao@exemplo.com",
    foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=joao",
    tipo: "Influencer",
  },
  {
    id: "2",
    nome: "Maria Souza",
    email: "maria@exemplo.com",
    foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
    tipo: "Gestor de Tráfego",
  },
  {
    id: "3",
    nome: "Carlos Oliveira",
    email: "carlos@exemplo.com",
    foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos",
    tipo: "Gestor de Influencers",
  },
  {
    id: "4",
    nome: "Ana Pereira",
    email: "ana@exemplo.com",
    foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=ana",
    tipo: "Afiliado",
  },
];

// Função para obter a cor de fundo baseada no tipo de afiliado
const getTipoColor = (tipo: string) => {
  switch (tipo) {
    case "Influencer":
      return "bg-purple-100 text-purple-800";
    case "Gestor de Tráfego":
      return "bg-blue-100 text-blue-800";
    case "Gestor de Influencers":
      return "bg-green-100 text-green-800";
    case "Afiliado":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function CadastroUnificado() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refCode = searchParams.get("ref") || "";

  const [currentStep, setCurrentStep] = useState(1);
  const [referrer, setReferrer] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [tipoDocumento, setTipoDocumento] = useState<"cpf" | "cnpj">("cpf");

  // Buscar informações do afiliado que indicou (se houver)
  useEffect(() => {
    if (refCode) {
      // Em um cenário real, isso seria uma chamada à API
      const afiliadoEncontrado = afiliados.find((a) => a.id === refCode);
      if (afiliadoEncontrado) {
        setReferrer(afiliadoEncontrado);
      }
    }
  }, [refCode]);

  // Form para o passo 1
  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    watch: watchStep1,
    setValue,
    formState: { errors: errorsStep1, isValid: isValidStep1 },
  } = useForm({
    resolver: zodResolver(step1Schema),
    mode: "onChange",
    defaultValues: {
      termos: false,
    },
  });

  // Observar o checkbox de termos para habilitar o botão
  const termosAceitos = watchStep1("termos");

  // Form para o passo 2
  const {
    register: registerStep2,
    handleSubmit: handleSubmitStep2,
    setValue: setValueStep2,
    watch,
    formState: { errors: errorsStep2, isValid: isValidStep2 },
  } = useForm({
    resolver: zodResolver(step2Schema),
    mode: "onChange",
    defaultValues: {
      afiliado_id: refCode || "",
      tipoDocumento: "cpf",
      ddi: "55",
    },
  });

  const selectedAfiliadoId = watch("afiliado_id");
  const watchedTipoDocumento = watch("tipoDocumento");

  // Atualizar o tipo de documento quando mudar no select
  useEffect(() => {
    if (watchedTipoDocumento) {
      setTipoDocumento(watchedTipoDocumento);
    }
  }, [watchedTipoDocumento]);

  // Atualizar o afiliado selecionado quando mudar no select
  useEffect(() => {
    if (selectedAfiliadoId && !refCode) {
      const afiliadoEncontrado = afiliados.find(
        (a) => a.id === selectedAfiliadoId,
      );
      if (afiliadoEncontrado) {
        setReferrer(afiliadoEncontrado);
      }
    }
  }, [selectedAfiliadoId, refCode]);

  // Função para avançar para o próximo passo
  const onSubmitStep1 = (data: any) => {
    // Não precisamos de validação adicional aqui, pois o Zod já faz isso
    setFormData({ ...formData, ...data });
    setCurrentStep(2);
  };

  // Estado para controlar o loading durante o envio do formulário
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para enviar dados para o Active Campaign
  const sendToActiveCampaign = async (userData: any) => {
    const apiUrl = process.env.NEXT_PUBLIC_ACTIVE_CAMPAIGN_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_ACTIVE_CAMPAIGN_API_KEY;

    if (!apiUrl || !apiKey) {
      console.error(
        "Variáveis de ambiente do Active Campaign não configuradas",
      );
      throw new Error("Configuração do Active Campaign incompleta");
    }

    // Criar contato no Active Campaign
    const contactData = {
      contact: {
        email: userData.email,
        firstName: userData.nome,
        lastName: userData.sobrenome,
        phone: `+${userData.ddi}${userData.telefone.replace(/\D/g, "")}`,
        fieldValues: [
          {
            field: "1", // ID do campo personalizado para documento (ajuste conforme necessário)
            value: userData.documento,
          },
          {
            field: "2", // ID do campo personalizado para tipo de documento (ajuste conforme necessário)
            value: userData.tipoDocumento,
          },
        ],
      },
    };

    try {
      const response = await fetch(`${apiUrl}/api/3/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Token": apiKey,
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ao criar contato: ${JSON.stringify(errorData)}`);
      }

      const result = await response.json();
      console.log("Contato criado com sucesso no Active Campaign:", result);

      // Adicionar contato à lista de afiliados (ajuste o ID da lista conforme necessário)
      const listId = 1; // ID da lista de afiliados no Active Campaign
      await fetch(`${apiUrl}/api/3/contactLists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Token": apiKey,
        },
        body: JSON.stringify({
          contactList: {
            list: listId,
            contact: result.contact.id,
            status: 1,
          },
        }),
      });

      // Se houver um afiliado que indicou, registrar essa relação em um campo personalizado
      if (userData.afiliado_id) {
        await fetch(`${apiUrl}/api/3/fieldValues`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Api-Token": apiKey,
          },
          body: JSON.stringify({
            fieldValue: {
              contact: result.contact.id,
              field: "3", // ID do campo personalizado para afiliado que indicou
              value: userData.afiliado_id,
            },
          }),
        });
      }

      return result.contact.id;
    } catch (error) {
      console.error("Erro na integração com Active Campaign:", error);
      throw error;
    }
  };

  // Função para finalizar o cadastro e integrar com Active Campaign
  const onSubmitStep2 = async (data: any) => {
    setIsSubmitting(true);
    const completeData = { ...formData, ...data };
    console.log("Dados do cadastro:", completeData);
    localStorage.setItem("cadastroData", JSON.stringify(completeData));

    try {
      // Enviar dados para o Active Campaign
      console.log("Enviando dados para Active Campaign...");
      await sendToActiveCampaign(completeData);
      console.log("Dados enviados com sucesso para Active Campaign");

      // Redirecionar para a página de contrato
      router.push("/contrato");
    } catch (error) {
      console.error("Erro ao enviar dados para Active Campaign:", error);
      setIsSubmitting(false);
      // Aqui você poderia mostrar uma mensagem de erro para o usuário
    }
  };

  // Função para formatar CPF enquanto digita
  const formatCPF = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, ""); // Remove tudo que não é dígito
    value = value.replace(/^(\d{3})(\d)/g, "$1.$2"); // Coloca ponto após o terceiro dígito
    value = value.replace(/(\d{3})(\d)/g, "$1.$2"); // Coloca ponto após o sexto dígito
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Coloca hífen entre o nono e o décimo dígito
    e.target.value = value;
  };

  // Função para formatar CNPJ enquanto digita
  const formatCNPJ = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, ""); // Remove tudo que não é dígito
    value = value.replace(/^(\d{2})(\d)/g, "$1.$2"); // Coloca ponto após o segundo dígito
    value = value.replace(/(\d{3})(\d)/g, "$1.$2"); // Coloca ponto após o quinto dígito
    value = value.replace(/(\d{3})(\d)/g, "$1/$2"); // Coloca barra após o oitavo dígito
    value = value.replace(/(\d{4})(\d{1,2})$/, "$1-$2"); // Coloca hífen após o décimo segundo dígito
    e.target.value = value;
  };

  // Função para formatar telefone enquanto digita
  const formatTelefone = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, ""); // Remove tudo que não é dígito
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2"); // Coloca parênteses em volta dos dois primeiros dígitos
    value = value.replace(/(\d)(\d{4})$/, "$1-$2"); // Coloca hífen entre o quinto e o sexto dígito
    e.target.value = value;
  };

  // Função para lidar com a mudança no tipo de documento
  const handleDocumentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (tipoDocumento === "cpf") {
      formatCPF(e);
    } else {
      formatCNPJ(e);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-background to-background/90">
        <div className="w-full max-w-6xl flex rounded-3xl overflow-hidden shadow-2xl">
          {/* Lado esquerdo - Design atrativo */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary to-purple-700 p-8 flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="grid"
                    width="10"
                    height="10"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 10 0 L 0 0 0 10"
                      fill="none"
                      stroke="white"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <div className="relative z-10">
              <h1 className="text-4xl font-bold text-white mb-4">
                Programa de Afiliados iLotto
              </h1>
              <p className="text-white/90 text-lg mb-6">
                Junte-se à nossa rede de afiliados e comece a ganhar comissões
                atrativas.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <p className="text-white/90">
                    Comissões atrativas em dois níveis
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m16 12-4 4-4-4M12 8v7" />
                    </svg>
                  </div>
                  <p className="text-white/90">
                    Materiais de marketing exclusivos
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z" />
                      <path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z" />
                      <path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z" />
                      <path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z" />
                    </svg>
                  </div>
                  <p className="text-white/90">
                    Dashboard completo e intuitivo
                  </p>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-auto">
              <div className="flex -space-x-4">
                {afiliados.slice(0, 4).map((afiliado) => (
                  <div
                    key={afiliado.id}
                    className="relative w-12 h-12 rounded-full border-2 border-white overflow-hidden"
                  >
                    <Image
                      src={afiliado.foto}
                      alt={afiliado.nome}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center text-white font-medium">
                  +50
                </div>
              </div>
              <p className="text-white/80 mt-3 text-sm">
                Junte-se a mais de 50 afiliados que já estão lucrando com a
                iLotto
              </p>
            </div>
          </div>

          {/* Lado direito - Formulário */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 bg-white dark:bg-background p-8"
          >
            <Card className="shadow-none border-none">
              <CardHeader className="space-y-1 px-0">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  {currentStep === 1
                    ? "Crie sua conta"
                    : "Complete seu cadastro"}
                </CardTitle>
                <CardDescription className="text-base">
                  {currentStep === 1
                    ? "Preencha os dados abaixo para começar"
                    : "Estamos quase lá! Precisamos de mais algumas informações"}
                </CardDescription>

                {currentStep === 1 && (
                  <div className="text-sm text-muted-foreground mt-2">
                    Já tem uma conta?{" "}
                    <Link
                      href="/login"
                      className="text-primary font-medium hover:underline"
                    >
                      Fazer login
                    </Link>
                  </div>
                )}
              </CardHeader>

              <AnimatePresence mode="wait">
                {currentStep === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <form
                      onSubmit={handleSubmitStep1(onSubmitStep1)}
                      noValidate
                    >
                      <CardContent className="space-y-4 px-0">
                        <div className="space-y-2">
                          <Label htmlFor="email">E-mail</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            className="border-input/60 focus:border-primary"
                            {...registerStep1("email")}
                          />
                          {errorsStep1.email && (
                            <p className="text-sm text-destructive">
                              {errorsStep1.email.message as string}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="senha">Senha</Label>
                          <Input
                            id="senha"
                            type="password"
                            placeholder="********"
                            className="border-input/60 focus:border-primary"
                            {...registerStep1("senha")}
                          />
                          {errorsStep1.senha && (
                            <p className="text-sm text-destructive">
                              {errorsStep1.senha.message as string}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            A senha deve conter pelo menos 8 caracteres,
                            incluindo letras maiúsculas, minúsculas, números e
                            caracteres especiais.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmarSenha">
                            Confirme a senha
                          </Label>
                          <Input
                            id="confirmarSenha"
                            type="password"
                            placeholder="******"
                            className="border-input/60 focus:border-primary"
                            {...registerStep1("confirmarSenha")}
                          />
                          {errorsStep1.confirmarSenha && (
                            <p className="text-sm text-destructive">
                              {errorsStep1.confirmarSenha.message as string}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="termos"
                            checked={termosAceitos}
                            onCheckedChange={(checked) => {
                              setValue("termos", checked === true);
                            }}
                          />
                          <label
                            htmlFor="termos"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Eu aceito os{" "}
                            <Link
                              href="#"
                              className="text-primary hover:underline"
                            >
                              termos e condições
                            </Link>
                          </label>
                        </div>
                        {errorsStep1.termos && (
                          <p className="text-sm text-destructive">
                            {errorsStep1.termos.message as string}
                          </p>
                        )}
                      </CardContent>

                      <CardFooter className="px-0 pt-4">
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 transition-all text-white font-medium py-6"
                          disabled={!isValidStep1}
                        >
                          Continuar
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
                            className="ml-2"
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </Button>
                      </CardFooter>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <form onSubmit={handleSubmitStep2(onSubmitStep2)}>
                      <CardContent className="space-y-4 px-0">
                        {/* Exibição do afiliado que indicou (se houver) */}
                        <AnimatePresence>
                          {referrer && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="bg-gradient-to-r from-primary/10 to-accent/20 p-5 rounded-xl flex items-center space-x-4 mb-6 shadow-sm border border-primary/20"
                            >
                              <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary shadow-md">
                                <Image
                                  src={referrer.foto}
                                  alt={referrer.nome}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg text-primary">
                                  {referrer.nome}
                                </h3>
                                <div className="flex items-center mt-1">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getTipoColor(referrer.tipo)}`}
                                  >
                                    {referrer.tipo}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {referrer.email}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="nome">Nome</Label>
                            <Input
                              id="nome"
                              placeholder="Seu nome"
                              className="border-input/60 focus:border-primary"
                              {...registerStep2("nome")}
                            />
                            {errorsStep2.nome && (
                              <p className="text-sm text-destructive">
                                {errorsStep2.nome.message as string}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="sobrenome">Sobrenome</Label>
                            <Input
                              id="sobrenome"
                              placeholder="Seu sobrenome"
                              className="border-input/60 focus:border-primary"
                              {...registerStep2("sobrenome")}
                            />
                            {errorsStep2.sobrenome && (
                              <p className="text-sm text-destructive">
                                {errorsStep2.sobrenome.message as string}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Telefone</Label>
                          <div className="flex space-x-2">
                            <div className="w-1/3">
                              <Select
                                defaultValue="55"
                                onValueChange={(value) =>
                                  setValueStep2("ddi", value)
                                }
                              >
                                <SelectTrigger className="border-input/60 focus:border-primary">
                                  <SelectValue placeholder="DDI" />
                                </SelectTrigger>
                                <SelectContent>
                                  {ddiOptions.map((option) => (
                                    <SelectItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {errorsStep2.ddi && (
                                <p className="text-sm text-destructive">
                                  {errorsStep2.ddi.message as string}
                                </p>
                              )}
                            </div>
                            <div className="w-2/3">
                              <Input
                                id="telefone"
                                placeholder="(00) 00000-0000"
                                maxLength={15}
                                className="border-input/60 focus:border-primary"
                                {...registerStep2("telefone")}
                                onChange={formatTelefone}
                              />
                              {errorsStep2.telefone && (
                                <p className="text-sm text-destructive">
                                  {errorsStep2.telefone.message as string}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Documento</Label>
                          <div className="flex space-x-2">
                            <div className="w-1/3">
                              <Select
                                defaultValue="cpf"
                                onValueChange={(value) => {
                                  setValueStep2(
                                    "tipoDocumento",
                                    value as "cpf" | "cnpj",
                                  );
                                  setValueStep2("documento", ""); // Limpa o campo ao trocar o tipo
                                }}
                              >
                                <SelectTrigger className="border-input/60 focus:border-primary">
                                  <SelectValue placeholder="Tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="cpf">CPF</SelectItem>
                                  <SelectItem value="cnpj">CNPJ</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="w-2/3">
                              <Input
                                id="documento"
                                placeholder={
                                  tipoDocumento === "cpf"
                                    ? "000.000.000-00"
                                    : "00.000.000/0000-00"
                                }
                                maxLength={tipoDocumento === "cpf" ? 14 : 18}
                                className="border-input/60 focus:border-primary"
                                {...registerStep2("documento")}
                                onChange={handleDocumentoChange}
                              />
                              {errorsStep2.documento && (
                                <p className="text-sm text-destructive">
                                  {errorsStep2.documento.message as string}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Seleção de afiliado (apenas se não veio por link de indicação) */}
                        {!refCode && (
                          <div className="space-y-4 mt-6">
                            <Label
                              htmlFor="afiliado"
                              className="text-lg font-medium"
                            >
                              Selecione um Afiliado (opcional)
                            </Label>
                            <div className="space-y-3 max-h-60 overflow-y-auto pr-2 rounded-lg border border-input/40 p-2">
                              {afiliados.map((afiliado) => (
                                <div
                                  key={afiliado.id}
                                  className={`relative p-3 rounded-lg border transition-all cursor-pointer hover:shadow-md ${selectedAfiliadoId === afiliado.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                                  onClick={() =>
                                    setValueStep2("afiliado_id", afiliado.id)
                                  }
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className="relative h-10 w-10 rounded-full overflow-hidden border border-primary/50">
                                      <Image
                                        src={afiliado.foto}
                                        alt={afiliado.nome}
                                        width={40}
                                        height={40}
                                        className="object-cover"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <h3 className="font-medium text-sm">
                                        {afiliado.nome}
                                      </h3>
                                      <span
                                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTipoColor(afiliado.tipo)}`}
                                      >
                                        {afiliado.tipo}
                                      </span>
                                    </div>
                                    {selectedAfiliadoId === afiliado.id && (
                                      <div className="bg-primary text-white rounded-full p-1">
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
                                          <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>

                      <CardFooter className="flex justify-between pt-6 px-0">
                        <Button
                          variant="outline"
                          type="button"
                          className="w-1/3"
                          onClick={() => setCurrentStep(1)}
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
                            className="mr-2"
                          >
                            <path d="m15 18-6-6 6-6" />
                          </svg>
                          Voltar
                        </Button>
                        <Button
                          type="submit"
                          className="w-2/3 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 transition-all text-white font-medium py-6"
                          disabled={isSubmitting}
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
                              Criando cadastro...
                            </>
                          ) : (
                            <>
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
                                className="mr-2"
                              >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 1 0 7.75" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                              </svg>
                              Finalizar Cadastro
                            </>
                          )}
                        </Button>
                      </CardFooter>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
