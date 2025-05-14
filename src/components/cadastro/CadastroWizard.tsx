"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Lock,
  Phone,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import DocumentValidator from "./DocumentValidator";
import { isValidCPF, isValidCNPJ } from "@/utils/document-validator";

interface FormData {
  nome: string;
  email: string;
  cpfCnpj: string;
  telefone: string;
  senha: string;
  codigoIndicacao?: string;
  documentoIdentidade?: File | null;
  comprovanteBancario?: File | null;
}

export default function CadastroWizard() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [referralCode, setReferralCode] = useState("");

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    cpfCnpj: "",
    telefone: "",
    senha: "",
  });

  const [errors, setErrors] = useState({
    nome: "",
    email: "",
    cpfCnpj: "",
    telefone: "",
    senha: "",
  });

  // Função para formatar telefone
  const formatPhone = (value: string): string => {
    const cleanValue = value.replace(/\D/g, "");
    if (cleanValue.length <= 10) {
      return cleanValue
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/^(\d{2})\)\s(\d{4})(\d)/, "($1) $2-$3")
        .substring(0, 14);
    } else {
      return cleanValue
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/^(\d{2})\)\s(\d{5})(\d)/, "($1) $2-$3")
        .substring(0, 15);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(e.target.value);
    setFormData((prev) => ({ ...prev, telefone: formattedPhone }));

    if (errors.telefone) {
      setErrors((prev) => ({ ...prev, telefone: "" }));
    }
  };

  const handleDocumentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, cpfCnpj: value }));

    if (errors.cpfCnpj) {
      setErrors((prev) => ({ ...prev, cpfCnpj: "" }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {
      nome: formData.nome ? "" : "Nome é obrigatório",
      email: !formData.email
        ? "Email é obrigatório"
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
          ? "Email inválido"
          : "",
      cpfCnpj: !formData.cpfCnpj
        ? "CPF/CNPJ é obrigatório"
        : formData.cpfCnpj.replace(/\D/g, "").length === 11
          ? !isValidCPF(formData.cpfCnpj)
            ? "CPF inválido"
            : ""
          : !isValidCNPJ(formData.cpfCnpj)
            ? "CNPJ inválido"
            : "",
      telefone: !formData.telefone
        ? "Telefone é obrigatório"
        : !/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(formData.telefone)
          ? "Telefone inválido"
          : "",
      senha: !formData.senha
        ? "Senha é obrigatória"
        : formData.senha.length < 8
          ? "Senha deve ter no mínimo 8 caracteres"
          : "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 0: // Dados Pessoais
        if (!formData.nome) {
          toast({
            title: "Campo obrigatório",
            description: "Por favor, preencha seu nome completo.",
            variant: "destructive",
          });
          return false;
        }
        if (!formData.email) {
          toast({
            title: "Campo obrigatório",
            description: "Por favor, informe seu email.",
            variant: "destructive",
          });
          return false;
        }
        if (!formData.telefone) {
          toast({
            title: "Campo obrigatório",
            description: "Por favor, informe seu telefone.",
            variant: "destructive",
          });
          return false;
        }
        if (!formData.cpfCnpj) {
          toast({
            title: "Campo obrigatório",
            description: "Por favor, informe seu CPF ou CNPJ.",
            variant: "destructive",
          });
          return false;
        }
        const cleanDoc = formData.cpfCnpj.replace(/\D/g, "");
        if (cleanDoc.length === 11 && !isValidCPF(cleanDoc)) {
          toast({
            title: "CPF inválido",
            description:
              "O CPF informado não é válido. Por favor, verifique e tente novamente.",
            variant: "destructive",
          });
          return false;
        }
        if (cleanDoc.length === 14 && !isValidCNPJ(cleanDoc)) {
          toast({
            title: "CNPJ inválido",
            description:
              "O CNPJ informado não é válido. Por favor, verifique e tente novamente.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 1: // Confirmação de Indicação
        return true; // Não há validação obrigatória neste passo
      case 2: // Upload de Documentos
        if (!formData.documentoIdentidade) {
          toast({
            title: "Documento obrigatório",
            description:
              "Por favor, faça o upload do seu documento de identidade.",
            variant: "destructive",
          });
          return false;
        }
        if (!formData.comprovanteBancario) {
          toast({
            title: "Documento obrigatório",
            description:
              "Por favor, faça o upload do seu comprovante bancário.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      toast({
        title: "Etapa concluída",
        description: "Informações salvas com sucesso!",
        variant: "default",
      });
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleFileUpload = (field: keyof FormData, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));

    if (file) {
      toast({
        title: "Arquivo enviado",
        description: `${file.name} foi carregado com sucesso.`,
        variant: "default",
      });
    }
  };

  const handleFinalizarCadastro = async () => {
    try {
      setIsSubmitting(true);

      // Enviar dados para o ActiveCampaign
      const response = await fetch("/api/active-campaign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.nome?.split(" ")[0] || "",
          lastName: formData.nome?.split(" ").slice(1).join(" ") || "",
          email: formData.email,
          phone: formData.telefone,
          cpfCnpj: formData.cpfCnpj,
          referralCode: referralCode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Erro ao enviar dados para o ActiveCampaign",
        );
      }

      // Mostrar notificação de sucesso
      toast({
        title: "Cadastro realizado com sucesso!",
        description:
          "Seus dados foram enviados. Agora você será redirecionado para preencher o contrato.",
        variant: "success",
      });

      // Redirecionar para a página de sucesso após um breve delay
      setTimeout(() => {
        router.push("/cadastro/sucesso");
      }, 1500);
    } catch (error) {
      console.error("Erro ao finalizar cadastro:", error);
      toast({
        title: "Erro ao finalizar cadastro",
        description:
          error instanceof Error
            ? error.message
            : "Ocorreu um erro ao processar seu cadastro. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardTitle className="text-xl font-bold text-center">
          Cadastro de Afiliado
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="flex justify-between mb-6">
          {[0, 1, 2].map((step) => (
            <div
              key={step}
              className={`flex flex-col items-center ${step < currentStep ? "text-primary" : step === currentStep ? "text-primary" : "text-muted-foreground"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step < currentStep ? "bg-primary text-white" : step === currentStep ? "border-2 border-primary" : "border-2 border-muted"}`}
              >
                {step < currentStep ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span>{step + 1}</span>
                )}
              </div>
              <span className="text-xs mt-1">
                {step === 0
                  ? "Dados Pessoais"
                  : step === 1
                    ? "Indicação"
                    : "Documentos"}
              </span>
            </div>
          ))}
        </div>

        {currentStep === 0 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="nome"
                  name="nome"
                  placeholder="Seu nome completo"
                  className="pl-10"
                  value={formData.nome}
                  onChange={handleInputChange}
                />
              </div>
              {errors.nome && (
                <p className="text-sm text-destructive">{errors.nome}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="telefone"
                  name="telefone"
                  placeholder="(00) 00000-0000"
                  className="pl-10"
                  value={formData.telefone}
                  onChange={handlePhoneChange}
                  maxLength={15}
                />
              </div>
              {errors.telefone && (
                <p className="text-sm text-destructive">{errors.telefone}</p>
              )}
            </div>

            <DocumentValidator
              value={formData.cpfCnpj}
              onChange={handleDocumentChange}
              error={errors.cpfCnpj}
            />

            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="senha"
                  name="senha"
                  type="password"
                  placeholder="Sua senha (mínimo 8 caracteres)"
                  className="pl-10"
                  value={formData.senha}
                  onChange={handleInputChange}
                />
              </div>
              {errors.senha && (
                <p className="text-sm text-destructive">{errors.senha}</p>
              )}
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                Você foi indicado por alguém?
              </h3>
              <p className="text-muted-foreground text-sm">
                Se você foi indicado por um afiliado, insira o código de
                indicação abaixo.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="codigoIndicacao">
                Código de Indicação (opcional)
              </Label>
              <Input
                id="codigoIndicacao"
                placeholder="Código de indicação"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
              />
            </div>

            <div className="bg-muted p-4 rounded-md">
              <p className="text-sm">
                Não tem um código de indicação? Sem problemas! Você pode
                continuar seu cadastro normalmente.
              </p>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                Upload de Documentos
              </h3>
              <p className="text-muted-foreground text-sm">
                Para finalizar seu cadastro, precisamos de alguns documentos.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="documentoIdentidade">
                  Documento de Identidade (RG ou CNH)
                </Label>
                <Input
                  id="documentoIdentidade"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    handleFileUpload(
                      "documentoIdentidade",
                      e.target.files ? e.target.files[0] : null,
                    )
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Formatos aceitos: JPG, PNG ou PDF (máx. 5MB)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comprovanteBancario">
                  Comprovante Bancário
                </Label>
                <Input
                  id="comprovanteBancario"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    handleFileUpload(
                      "comprovanteBancario",
                      e.target.files ? e.target.files[0] : null,
                    )
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Formatos aceitos: JPG, PNG ou PDF (máx. 5MB)
                </p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Revisão de Cadastro
              </h3>
              <p className="text-muted-foreground text-sm">
                Verifique se todas as informações estão corretas antes de
                finalizar.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Nome:</div>
                <div>{formData.nome}</div>

                <div className="font-medium">Email:</div>
                <div>{formData.email}</div>

                <div className="font-medium">CPF/CNPJ:</div>
                <div>{formData.cpfCnpj}</div>

                <div className="font-medium">Telefone:</div>
                <div>{formData.telefone}</div>

                {referralCode && (
                  <>
                    <div className="font-medium">Código de Indicação:</div>
                    <div>{referralCode}</div>
                  </>
                )}

                <div className="font-medium">Documento de Identidade:</div>
                <div>{formData.documentoIdentidade?.name || "Não enviado"}</div>

                <div className="font-medium">Comprovante Bancário:</div>
                <div>{formData.comprovanteBancario?.name || "Não enviado"}</div>
              </div>

              <div className="bg-muted p-4 rounded-md text-sm">
                <p>
                  Ao finalizar seu cadastro, você concorda com nossos{" "}
                  <a href="#" className="text-primary hover:underline">
                    Termos de Serviço
                  </a>{" "}
                  e{" "}
                  <a href="#" className="text-primary hover:underline">
                    Política de Privacidade
                  </a>
                  .
                </p>
              </div>

              <Button
                onClick={handleFinalizarCadastro}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
                  "Finalizar Cadastro"
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        {currentStep > 0 && currentStep < 3 && (
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Button>
        )}

        {currentStep === 0 && (
          <div className="ml-auto">
            <Button
              onClick={handleNext}
              className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={
                !formData.nome ||
                !formData.email ||
                !formData.cpfCnpj ||
                !formData.senha
              }
            >
              Próximo <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {currentStep === 1 && (
          <div className="ml-auto">
            <Button
              onClick={handleNext}
              className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Próximo <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="ml-auto">
            <Button
              onClick={handleNext}
              className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={
                !formData.documentoIdentidade || !formData.comprovanteBancario
              }
            >
              Revisar <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {currentStep === 0 && <div></div>}
      </CardFooter>
    </Card>
  );
}
