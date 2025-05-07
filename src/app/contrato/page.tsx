"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ViaCEPInput } from "@/components/ui/via-cep-input";
import { validateDocument } from "@/lib/validate-document";
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

    if (tipoDocumento === "cpf") {
      // Formata CPF: 000.000.000-00
      value = value.replace(/^(\d{3})(\d)/g, "$1.$2");
      value = value.replace(/(\d{3})(\d)/g, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      // Formata CNPJ: 00.000.000/0000-00
      value = value.replace(/^(\d{2})(\d)/g, "$1.$2");
      value = value.replace(/(\d{3})(\d)/g, "$1.$2");
      value = value.replace(/(\d{3})(\d)/g, "$1/$2");
      value = value.replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }

    input.value = value;

    // Validate document
    const cleanValue = value.replace(/\D/g, "");
    if (
      (tipoDocumento === "cpf" && cleanValue.length === 11) ||
      (tipoDocumento === "cnpj" && cleanValue.length === 14)
    ) {
      const isValid = validateDocument(cleanValue, tipoDocumento);
      setIsDocumentoValid(isValid);
    } else {
      setIsDocumentoValid(null);
    }
  };

  // Reset document validation when document type changes
  useEffect(() => {
    setIsDocumentoValid(null);
  }, [tipoDocumento]);

  const onSubmitPessoal = (data: any) => {
    setFormData({ ...formData, pessoal: data });
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Dados para Contrato</CardTitle>
              <CardDescription>Passo {step} de 4</CardDescription>
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
                  >
                    Voltar
                  </Button>
                  <Button type="submit">Próximo</Button>
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
                  >
                    Voltar
                  </Button>
                  <Button type="submit">Próximo</Button>
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
                  >
                    Voltar
                  </Button>
                  <Button type="submit">Próximo</Button>
                </CardFooter>
              </form>
            )}

            {step === 4 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Validar se os arquivos foram selecionados
                  if (
                    !formData.documentos.documentoFrente ||
                    !formData.documentos.documentoVerso
                  ) {
                    alert("Por favor, envie os documentos frente e verso.");
                    return;
                  }

                  // Aqui você implementaria a lógica para enviar todos os dados do formulário
                  console.log("Formulário completo:", formData);
                  // Redirecionar para página de sucesso ou outra ação
                  router.push("/cadastro/sucesso");
                }}
              >
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="documentoFrente">Documento (Frente)</Label>
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
                  >
                    Voltar
                  </Button>
                  <Button type="submit">Finalizar</Button>
                </CardFooter>
              </form>
            )}
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
