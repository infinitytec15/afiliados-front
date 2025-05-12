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
  CreditCard,
  Phone,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  formatDocument,
  isValidCPF,
  isValidCNPJ,
} from "@/lib/validate-document";

interface CadastroWizardProps {
  initialStep?: number;
  referralCode?: string;
  referrerName?: string;
}

export default function CadastroWizard({
  initialStep = 1,
  referralCode = "",
  referrerName = "João Silva",
}: CadastroWizardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when typing
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

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep((prev) => prev + 1);
        toast({
          title: "Etapa concluída",
          description: "Dados pessoais salvos com sucesso!",
          variant: "default",
        });
      }
    } else {
      setCurrentStep((prev) => prev + 1);
      toast({
        title: "Etapa concluída",
        description: "Informações confirmadas com sucesso!",
        variant: "default",
      });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedDocument = formatDocument(e.target.value);
    setFormData((prev) => ({ ...prev, cpfCnpj: formattedDocument }));

    if (errors.cpfCnpj) {
      setErrors((prev) => ({ ...prev, cpfCnpj: "" }));
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
    <div className="w-full max-w-3xl mx-auto bg-background">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              1
            </div>
            <span className="text-sm mt-2">Dados Básicos</span>
          </div>
          <div className="flex-1 flex items-center">
            <div
              className={`h-1 w-full ${currentStep >= 2 ? "bg-primary" : "bg-muted"}`}
            ></div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              2
            </div>
            <span className="text-sm mt-2">Confirmação</span>
          </div>
          <div className="flex-1 flex items-center">
            <div
              className={`h-1 w-full ${currentStep >= 3 ? "bg-primary" : "bg-muted"}`}
            ></div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              3
            </div>
            <span className="text-sm mt-2">Conclusão</span>
          </div>
        </div>
      </div>

      <Card className="w-full">
        {currentStep === 1 && (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Crie sua conta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome completo</Label>
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
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
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
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      const formattedValue = value
                        .replace(/^(\d{2})(\d)/g, "($1) $2")
                        .replace(
                          value.length > 10 ? /(\d{5})(\d)/ : /(\d{4})(\d)/,
                          "$1-$2",
                        )
                        .substring(0, 15);
                      setFormData((prev) => ({
                        ...prev,
                        telefone: formattedValue,
                      }));
                    }}
                    maxLength={15}
                  />
                </div>
                {errors.telefone && (
                  <p className="text-sm text-destructive">{errors.telefone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="cpfCnpj"
                    name="cpfCnpj"
                    placeholder="000.000.000-00 ou 00.000.000/0000-00"
                    className="pl-10"
                    value={formData.cpfCnpj}
                    onChange={handleDocumentChange}
                    maxLength={18}
                  />
                </div>
                {errors.cpfCnpj && (
                  <p className="text-sm text-destructive">{errors.cpfCnpj}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="senha"
                    name="senha"
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    className="pl-10"
                    value={formData.senha}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.senha && (
                  <p className="text-sm text-destructive">{errors.senha}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={handleNext}
                className="w-full sm:w-auto"
                disabled={
                  !formData.nome ||
                  !formData.email ||
                  !formData.cpfCnpj ||
                  !formData.senha
                }
              >
                Próximo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </>
        )}

        {currentStep === 2 && (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Confirme quem indicou você
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Indicado por</Label>
                <div className="p-3 bg-muted rounded-md flex items-center">
                  <User className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{referrerName}</span>
                </div>
              </div>

              <div className="p-4 bg-primary/10 rounded-md">
                <p className="text-sm">
                  Ao prosseguir, você confirma que foi indicado por{" "}
                  {referrerName}.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
              </Button>
              <Button onClick={handleNext}>
                Próximo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </>
        )}

        {currentStep === 3 && (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Registro em análise
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-10 space-y-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-medium">
                  Seu cadastro foi enviado!
                </h3>
                <p className="text-muted-foreground">
                  Verifique seu e-mail para ativar a conta.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                onClick={handleFinalizarCadastro}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}
