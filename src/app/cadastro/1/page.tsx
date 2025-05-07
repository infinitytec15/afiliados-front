"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/layout/header";

// Definindo o schema de validação
const formSchema = z.object({
  nome: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  cpf: z.string().min(11, { message: "CPF inválido" }),
  senha: z
    .string()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
});

export default function CadastroStep1() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refCode = searchParams.get("ref") || "";

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    // Em um cenário real, salvaríamos os dados no estado global ou localStorage
    // Por enquanto, apenas navegamos para o próximo passo
    localStorage.setItem("cadastroData", JSON.stringify(data));
    router.push("/cadastro/2");
  };

  // Função para formatar CPF enquanto digita
  const formatCPF = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, ""); // Remove tudo que não é dígito
    value = value.replace(/^(\d{3})(\d)/g, "$1.$2"); // Coloca ponto após o terceiro dígito
    value = value.replace(/(\d{3})(\d)/g, "$1.$2"); // Coloca ponto após o sexto dígito
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Coloca hífen entre o nono e o décimo dígito
    e.target.value = value;
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
              <CardTitle className="text-2xl">Cadastro de Afiliado</CardTitle>
              <CardDescription>Passo 1 de 2: Dados Básicos</CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    placeholder="Digite seu nome completo"
                    {...register("nome")}
                  />
                  {errors.nome && (
                    <p className="text-sm text-destructive">
                      {errors.nome.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    placeholder="000.000.000-00"
                    maxLength={14}
                    {...register("cpf")}
                    onKeyUp={formatCPF}
                  />
                  {errors.cpf && (
                    <p className="text-sm text-destructive">
                      {errors.cpf.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senha">Senha</Label>
                  <Input
                    id="senha"
                    type="password"
                    placeholder="******"
                    {...register("senha")}
                  />
                  {errors.senha && (
                    <p className="text-sm text-destructive">
                      {errors.senha.message}
                    </p>
                  )}
                </div>

                {refCode && (
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground">
                      Código de indicação: {refCode}
                    </p>
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex justify-between">
                <Link href="/">
                  <Button variant="outline" type="button">
                    Voltar
                  </Button>
                </Link>
                <Button type="submit" disabled={!isValid}>
                  Próximo
                </Button>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
