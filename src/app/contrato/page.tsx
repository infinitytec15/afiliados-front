"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ViaCEPInput } from "@/components/ui/via-cep-input";
import {
  validateDocument,
  formatCPF,
  formatCNPJ,
} from "@/lib/validate-document";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/layout/header";
import { AlertCircle, CheckCircle } from "lucide-react";

// Definindo os schemas de validação para cada etapa
const pessoalSchema = z
  .object({
    nome: z
      .string()
      .min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
    documento: z.string().min(11, { message: "Documento inválido" }),
    tipoDocumento: z.enum(["cpf", "cnpj"]),
  })
  .refine(
    (data) => {
      // Validação personalizada para CPF/CNPJ
      const doc = data.documento.replace(/\D/g, "");
      if (data.tipoDocumento === "cpf") {
        return doc.length === 11;
      } else {
        return doc.length === 14;
      }
    },
    {
      message: "Documento com número de dígitos inválido",
      path: ["documento"],
    },
  );

const enderecoSchema = z.object({
  cep: z.string().min(8, { message: "CEP deve ter 8 dígitos" }).max(9),
  logradouro: z.string().min(3, { message: "Logradouro é obrigatório" }),
  numero: z.string().min(1, { message: "Número é obrigatório" }),
  complemento: z.string().optional(),
  bairro: z.string().min(2, { message: "Bairro é obrigatório" }),
  cidade: z.string().min(2, { message: "Cidade é obrigatória" }),
  estado: z.string().length(2, { message: "Estado deve ter 2 caracteres" }),
});

const bancarioSchema = z.object({
  banco: z.string().min(1, { message: "Banco é obrigatório" }),
  tipoConta: z.enum(["corrente", "poupanca"]),
  agencia: z.string().min(1, { message: "Agência é obrigatória" }),
  conta: z.string().min(1, { message: "Conta é obrigatória" }),
  chavePix: z.string().min(1, { message: "Chave PIX é obrigatória" }),
  tipoChavePix: z.enum(["cpf", "cnpj", "email", "telefone", "aleatoria"]),
});

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];

const documentosSchema = z.object({
  documentoFrente: z
    .any()
    .refine((file) => file instanceof File, "Arquivo é obrigatório")
    .refine(
      (file) => file instanceof File && file.size <= MAX_FILE_SIZE,
      "Tamanho máximo do arquivo é 5MB",
    )
    .refine(
      (file) => file instanceof File && ACCEPTED_FILE_TYPES.includes(file.type),
      "Formato de arquivo inválido. Use JPG, PNG ou PDF",
    ),
  documentoVerso: z
    .any()
    .refine((file) => file instanceof File, "Arquivo é obrigatório")
    .refine(
      (file) => file instanceof File && file.size <= MAX_FILE_SIZE,
      "Tamanho máximo do arquivo é 5MB",
    )
    .refine(
      (file) => file instanceof File && ACCEPTED_FILE_TYPES.includes(file.type),
      "Formato de arquivo inválido. Use JPG, PNG ou PDF",
    ),
});

export default function ContratoPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    pessoal: {
      nome: "",
      documento: "",
      tipoDocumento: "cpf",
    },
    endereco: {
      cep: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
    bancario: {
      banco: "",
      tipoConta: "corrente",
      agencia: "",
      conta: "",
      chavePix: "",
      tipoChavePix: "cpf",
    },
    documentos: {
      documentoFrente: null,
      documentoVerso: null,
    },
  });

  const [isDocumentoValid, setIsDocumentoValid] = useState<boolean | null>(
    null,
  );

  // Formulário para dados pessoais (Step 1)
  const {
    register: registerPessoal,
    handleSubmit: handleSubmitPessoal,
    formState: { errors: errorsPessoal },
    watch: watchPessoal,
  } = useForm({
    resolver: zodResolver(pessoalSchema),
    mode: "onChange",
    defaultValues: formData.pessoal,
  });

  // Formulário para dados de endereço (Step 2)
  const {
    register: registerEndereco,
    handleSubmit: handleSubmitEndereco,
    formState: { errors: errorsEndereco },
    setValue,
    trigger,
    setError,
    getValues,
  } = useForm({
    resolver: zodResolver(enderecoSchema),
    mode: "onChange",
    defaultValues: formData.endereco,
  });

  // Formulário para dados bancários (Step 3)
  const {
    register: registerBancario,
    handleSubmit: handleSubmitBancario,
    formState: { errors: errorsBancario },
  } = useForm({
    resolver: zodResolver(bancarioSchema),
    mode: "onChange",
    defaultValues: formData.bancario,
  });

  const tipoDocumento = watchPessoal("tipoDocumento");

  // Função para formatar CPF/CNPJ enquanto digita
  const formatDocumento = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ""); // Remove tudo que não é dígito

    // Usar as funções de formatação do lib/validate-document.ts
    if (tipoDocumento === "cpf") {
      input.value = formatCPF(value);
    } else {
      input.value = formatCNPJ(value);
    }
  };

  // Separar a validação do documento da formatação
  const validateDocumentoInput = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    if (
      (tipoDocumento === "cpf" && cleanValue.length === 11) ||
      (tipoDocumento === "cnpj" && cleanValue.length === 14)
    ) {
      const isValid = validateDocument(cleanValue, tipoDocumento);
      if (isDocumentoValid !== isValid) {
        setIsDocumentoValid(isValid);
      }
    } else if (isDocumentoValid !== null) {
      setIsDocumentoValid(null);
    }
  };

  // Reset document validation when document type changes
  useEffect(() => {
    if (isDocumentoValid !== null) {
      setIsDocumentoValid(null);
    }
  }, [tipoDocumento]);

  const onSubmitPessoal = (data: any) => {
    // Simular um breve carregamento para melhor UX
    setIsSubmitting(true);
    setTimeout(() => {
      setFormData({ ...formData, pessoal: data });
      setStep(2);
      setIsSubmitting(false);
    }, 500);
  };

  // Animações para os elementos
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const iconAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring" } },
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

            <motion.div
              className="relative z-10"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1
                className="text-4xl font-bold text-white mb-4"
                variants={fadeIn}
              >
                Contrato de Afiliado
              </motion.h1>
              <motion.p
                className="text-white/90 text-lg mb-6"
                variants={fadeIn}
              >
                Complete seu cadastro para começar a ganhar comissões como
                afiliado iLotto.
              </motion.p>

              <div className="space-y-6">
                <motion.div
                  className="flex items-center space-x-3"
                  variants={fadeIn}
                >
                  <motion.div
                    className="bg-white/20 p-2 rounded-full"
                    variants={iconAnimation}
                  >
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
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                    </svg>
                  </motion.div>
                  <p className="text-white/90">Dados pessoais e documentos</p>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-3"
                  variants={fadeIn}
                >
                  <motion.div
                    className="bg-white/20 p-2 rounded-full"
                    variants={iconAnimation}
                  >
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
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </motion.div>
                  <p className="text-white/90">Endereço completo</p>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-3"
                  variants={fadeIn}
                >
                  <motion.div
                    className="bg-white/20 p-2 rounded-full"
                    variants={iconAnimation}
                  >
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
                  </motion.div>
                  <p className="text-white/90">
                    Dados bancários para pagamentos
                  </p>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-3"
                  variants={fadeIn}
                >
                  <motion.div
                    className="bg-white/20 p-2 rounded-full"
                    variants={iconAnimation}
                  >
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
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M7 7h.01" />
                      <path d="M17 7h.01" />
                      <path d="M7 17h.01" />
                      <path d="M17 17h.01" />
                    </svg>
                  </motion.div>
                  <p className="text-white/90">Documentos de identificação</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="relative z-10 mt-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                <h3 className="text-white font-medium mb-2">
                  Etapa {step} de 4
                </h3>
                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white"
                    initial={{ width: "25%" }}
                    animate={{ width: `${step * 25}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-white/80 mt-2 text-sm">
                  {step === 1
                    ? "Dados Pessoais"
                    : step === 2
                      ? "Endereço"
                      : step === 3
                        ? "Dados Bancários"
                        : "Documentos"}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Lado direito - Formulário */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 bg-white dark:bg-background p-8"
          >
            <Card className="shadow-none border-none">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Dados para Contrato
                </CardTitle>
                <CardDescription>
                  <div className="flex items-center mt-2 space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center">
                        <div
                          className={`rounded-full h-8 w-8 flex items-center justify-center ${i === step ? "bg-primary text-white" : i < step ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"}`}
                        >
                          {i < step ? (
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
                          ) : (
                            i
                          )}
                        </div>
                        {i < 4 && (
                          <div
                            className={`h-1 w-6 ${i < step ? "bg-green-500" : "bg-muted"}`}
                          ></div>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="mt-2">
                    {step === 1
                      ? "Dados Pessoais"
                      : step === 2
                        ? "Endereço"
                        : step === 3
                          ? "Dados Bancários"
                          : "Documentos"}
                  </p>
                </CardDescription>
              </CardHeader>

              {step === 1 && (
                <form onSubmit={handleSubmitPessoal(onSubmitPessoal)}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input
                        id="nome"
                        placeholder="Digite seu nome completo"
                        {...registerPessoal("nome")}
                      />
                      {errorsPessoal.nome && (
                        <p className="text-sm text-destructive">
                          {errorsPessoal.nome.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tipoDocumento">Tipo de Documento</Label>
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="cpf"
                            {...registerPessoal("tipoDocumento")}
                            defaultChecked
                            className="h-4 w-4"
                          />
                          <span>CPF</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="cnpj"
                            {...registerPessoal("tipoDocumento")}
                            className="h-4 w-4"
                          />
                          <span>CNPJ</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="documento">
                        {tipoDocumento === "cpf" ? "CPF" : "CNPJ"}
                      </Label>
                      <div className="relative">
                        <Input
                          id="documento"
                          placeholder={
                            tipoDocumento === "cpf"
                              ? "000.000.000-00"
                              : "00.000.000/0000-00"
                          }
                          maxLength={tipoDocumento === "cpf" ? 14 : 18}
                          {...registerPessoal("documento")}
                          onKeyUp={formatDocumento}
                          onChange={(e) => {
                            registerPessoal("documento").onChange(e);
                            // Validar o documento após a mudança do valor
                            validateDocumentoInput(e.target.value);
                          }}
                          className={
                            isDocumentoValid !== null
                              ? isDocumentoValid
                                ? "pr-10 border-green-500"
                                : "pr-10 border-red-500"
                              : ""
                          }
                        />
                        {isDocumentoValid !== null && (
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            {isDocumentoValid ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                      {errorsPessoal.documento && (
                        <p className="text-sm text-destructive">
                          {errorsPessoal.documento.message}
                        </p>
                      )}
                      {!isDocumentoValid && isDocumentoValid !== null && (
                        <p className="text-sm text-destructive">
                          {tipoDocumento === "cpf"
                            ? "CPF inválido"
                            : "CNPJ inválido"}
                        </p>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => router.back()}
                      disabled={isSubmitting}
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
                      className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 transition-all"
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
                          Processando...
                        </>
                      ) : (
                        <>
                          Próximo
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
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              )}

              {step === 2 && (
                <form
                  onSubmit={handleSubmitEndereco((data) => {
                    setFormData({ ...formData, endereco: data });
                    setStep(3);
                  })}
                >
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cep">CEP</Label>
                      <div className="relative">
                        <ViaCEPInput
                          id="cep"
                          placeholder="00000-000"
                          {...registerEndereco("cep", {
                            required: "CEP é obrigatório",
                          })}
                          onAddressFound={(data) => {
                            if (!data) return;

                            // Batch all updates together
                            const addressData = {
                              logradouro: data.logradouro || "",
                              bairro: data.bairro || "",
                              cidade: data.localidade || "",
                              estado: data.uf || "",
                            };

                            // Store the current values to compare and prevent unnecessary updates
                            const currentValues = {
                              logradouro: getValues("logradouro"),
                              bairro: getValues("bairro"),
                              cidade: getValues("cidade"),
                              estado: getValues("estado"),
                            };

                            // Check if any values would actually change to prevent unnecessary updates
                            const hasChanges = Object.entries(addressData).some(
                              ([field, value]) =>
                                currentValues[
                                  field as keyof typeof currentValues
                                ] !== value,
                            );

                            // Only update if there are actual changes
                            if (hasChanges) {
                              // Update all fields at once without triggering validation
                              Object.entries(addressData).forEach(
                                ([field, value]) => {
                                  setValue(field as any, value, {
                                    shouldValidate: false,
                                    shouldDirty: true,
                                  });
                                },
                              );

                              // Use requestAnimationFrame to ensure DOM updates have completed
                              // before triggering validation
                              requestAnimationFrame(() => {
                                trigger([
                                  "logradouro",
                                  "bairro",
                                  "cidade",
                                  "estado",
                                ]);
                              });
                            }
                          }}
                          onError={(error) => {
                            setError("cep", {
                              type: "manual",
                              message: error,
                            });
                          }}
                        />
                        {errorsEndereco.cep && (
                          <p className="text-sm text-destructive mt-1">
                            {errorsEndereco.cep.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="logradouro">Logradouro</Label>
                      <Input
                        id="logradouro"
                        placeholder="Rua, Avenida, etc"
                        {...registerEndereco("logradouro", {
                          required: "Logradouro é obrigatório",
                        })}
                      />
                      {errorsEndereco.logradouro && (
                        <p className="text-sm text-destructive">
                          {errorsEndereco.logradouro.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="numero">Número</Label>
                        <Input
                          id="numero"
                          placeholder="123"
                          {...registerEndereco("numero", {
                            required: "Número é obrigatório",
                          })}
                        />
                        {errorsEndereco.numero && (
                          <p className="text-sm text-destructive">
                            {errorsEndereco.numero.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="complemento">Complemento</Label>
                        <Input
                          id="complemento"
                          placeholder="Apto, Bloco, etc"
                          {...registerEndereco("complemento")}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bairro">Bairro</Label>
                      <Input
                        id="bairro"
                        placeholder="Bairro"
                        {...registerEndereco("bairro", {
                          required: "Bairro é obrigatório",
                        })}
                      />
                      {errorsEndereco.bairro && (
                        <p className="text-sm text-destructive">
                          {errorsEndereco.bairro.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cidade">Cidade</Label>
                        <Input
                          id="cidade"
                          placeholder="Cidade"
                          {...registerEndereco("cidade", {
                            required: "Cidade é obrigatória",
                          })}
                        />
                        {errorsEndereco.cidade && (
                          <p className="text-sm text-destructive">
                            {errorsEndereco.cidade.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="estado">Estado</Label>
                        <Input
                          id="estado"
                          placeholder="UF"
                          maxLength={2}
                          {...registerEndereco("estado", {
                            required: "Estado é obrigatório",
                            maxLength: {
                              value: 2,
                              message: "Estado deve ter 2 caracteres",
                            },
                            minLength: {
                              value: 2,
                              message: "Estado deve ter 2 caracteres",
                            },
                          })}
                        />
                        {errorsEndereco.estado && (
                          <p className="text-sm text-destructive">
                            {errorsEndereco.estado.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => setStep(1)}
                      disabled={isSubmitting}
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
                      className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 transition-all"
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
                          Processando...
                        </>
                      ) : (
                        <>
                          Próximo
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
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              )}

              {step === 3 && (
                <form
                  onSubmit={handleSubmitBancario((data) => {
                    setFormData({ ...formData, bancario: data });
                    setStep(4);
                  })}
                >
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="banco">Banco</Label>
                      <Input
                        id="banco"
                        placeholder="Nome do banco"
                        {...registerBancario("banco", {
                          required: "Banco é obrigatório",
                        })}
                      />
                      {errorsBancario.banco && (
                        <p className="text-sm text-destructive">
                          {errorsBancario.banco.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tipoConta">Tipo de Conta</Label>
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="corrente"
                            {...registerBancario("tipoConta")}
                            defaultChecked
                            className="h-4 w-4"
                          />
                          <span>Corrente</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="poupanca"
                            {...registerBancario("tipoConta")}
                            className="h-4 w-4"
                          />
                          <span>Poupança</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="agencia">Agência</Label>
                        <Input
                          id="agencia"
                          placeholder="Sem dígito"
                          {...registerBancario("agencia", {
                            required: "Agência é obrigatória",
                          })}
                        />
                        {errorsBancario.agencia && (
                          <p className="text-sm text-destructive">
                            {errorsBancario.agencia.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="conta">Conta</Label>
                        <Input
                          id="conta"
                          placeholder="Com dígito"
                          {...registerBancario("conta", {
                            required: "Conta é obrigatória",
                          })}
                        />
                        {errorsBancario.conta && (
                          <p className="text-sm text-destructive">
                            {errorsBancario.conta.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tipoChavePix">Tipo de Chave PIX</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="cpf"
                            {...registerBancario("tipoChavePix")}
                            defaultChecked
                            className="h-4 w-4"
                          />
                          <span>CPF</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="cnpj"
                            {...registerBancario("tipoChavePix")}
                            className="h-4 w-4"
                          />
                          <span>CNPJ</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="email"
                            {...registerBancario("tipoChavePix")}
                            className="h-4 w-4"
                          />
                          <span>Email</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="telefone"
                            {...registerBancario("tipoChavePix")}
                            className="h-4 w-4"
                          />
                          <span>Telefone</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="aleatoria"
                            {...registerBancario("tipoChavePix")}
                            className="h-4 w-4"
                          />
                          <span>Aleatória</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="chavePix">Chave PIX</Label>
                      <Input
                        id="chavePix"
                        placeholder="Digite sua chave PIX"
                        {...registerBancario("chavePix", {
                          required: "Chave PIX é obrigatória",
                        })}
                      />
                      {errorsBancario.chavePix && (
                        <p className="text-sm text-destructive">
                          {errorsBancario.chavePix.message}
                        </p>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={isSubmitting}
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
                      className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 transition-all"
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
                          Processando...
                        </>
                      ) : (
                        <>
                          Próximo
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
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              )}

              {step === 4 && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    // Validar se os arquivos foram selecionados
                    if (
                      !formData.documentos.documentoFrente ||
                      !formData.documentos.documentoVerso
                    ) {
                      alert("Por favor, envie os documentos frente e verso.");
                      return;
                    }

                    // Mostrar animação de carregamento
                    setIsSubmitting(true);

                    // Simular envio de dados
                    await new Promise((resolve) => setTimeout(resolve, 2000));

                    // Aqui você implementaria a lógica para enviar todos os dados do formulário
                    console.log("Formulário completo:", formData);

                    // Redirecionar para página de sucesso
                    router.push("/cadastro/sucesso");
                  }}
                >
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="documentoFrente">
                        Documento (Frente)
                      </Label>
                      <div className="grid gap-2">
                        <Input
                          id="documentoFrente"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              setFormData({
                                ...formData,
                                documentos: {
                                  ...formData.documentos,
                                  documentoFrente: e.target.files[0],
                                },
                              });
                            }
                          }}
                        />
                        <p className="text-xs text-muted-foreground">
                          Formatos aceitos: JPG, PNG, PDF. Tamanho máximo: 5MB
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="documentoVerso">Documento (Verso)</Label>
                      <div className="grid gap-2">
                        <Input
                          id="documentoVerso"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              setFormData({
                                ...formData,
                                documentos: {
                                  ...formData.documentos,
                                  documentoVerso: e.target.files[0],
                                },
                              });
                            }
                          }}
                        />
                        <p className="text-xs text-muted-foreground">
                          Formatos aceitos: JPG, PNG, PDF. Tamanho máximo: 5MB
                        </p>
                      </div>
                    </div>

                    {formData.documentos.documentoFrente && (
                      <div className="p-2 border rounded-md">
                        <p className="text-sm font-medium">
                          Documento frente:{" "}
                          {formData.documentos.documentoFrente.name}
                        </p>
                      </div>
                    )}

                    {formData.documentos.documentoVerso && (
                      <div className="p-2 border rounded-md">
                        <p className="text-sm font-medium">
                          Documento verso:{" "}
                          {formData.documentos.documentoVerso.name}
                        </p>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => setStep(3)}
                      disabled={isSubmitting}
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
                      className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 transition-all"
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
                          Processando...
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
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                          </svg>
                          Finalizar
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              )}
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
