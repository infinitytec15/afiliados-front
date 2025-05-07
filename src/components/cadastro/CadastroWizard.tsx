"use client";

import { useState } from "react";
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
} from "lucide-react";

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
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    senha: "",
  });

  const [errors, setErrors] = useState({
    nome: "",
    email: "",
    cpf: "",
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
      cpf: !formData.cpf
        ? "CPF é obrigatório"
        : !/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(formData.cpf)
          ? "CPF inválido"
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
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/([\d]{3})([\d]{3})([\d]{3})([\d]{2})/, "$1.$2.$3-$4")
      .substr(0, 14);
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCPF = formatCPF(e.target.value);
    setFormData((prev) => ({ ...prev, cpf: formattedCPF }));

    if (errors.cpf) {
      setErrors((prev) => ({ ...prev, cpf: "" }));
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
                <Label htmlFor="cpf">CPF</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="cpf"
                    name="cpf"
                    placeholder="000.000.000-00"
                    className="pl-10"
                    value={formData.cpf}
                    onChange={handleCPFChange}
                    maxLength={14}
                  />
                </div>
                {errors.cpf && (
                  <p className="text-sm text-destructive">{errors.cpf}</p>
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
                  !formData.cpf ||
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
                onClick={() => window.open("https://mail.google.com", "_blank")}
              >
                Ir para e-mail
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}
