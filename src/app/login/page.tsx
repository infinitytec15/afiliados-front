"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/header";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    router.push("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        router.push("/dashboard");
      } else {
        setError("Email ou senha inválidos. Tente novamente.");
      }
    } catch (err) {
      setError("Ocorreu um erro ao fazer login. Tente novamente.");
      console.error(err);
    } finally {
      setIsLoading(false);
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
                Acesse sua conta e gerencie suas comissões, indicados e
                materiais de marketing.
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
                {[1, 2, 3, 4].map((id) => (
                  <div
                    key={id}
                    className="relative w-12 h-12 rounded-full border-2 border-white overflow-hidden"
                  >
                    <div className="absolute inset-0">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=afiliado${id}`}
                        alt={`Afiliado ${id}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
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
                  Acesse sua conta
                </CardTitle>
                <CardDescription className="text-base">
                  Entre com suas credenciais para acessar o painel de afiliados
                </CardDescription>

                <div className="text-sm text-muted-foreground mt-2">
                  Não tem uma conta?{" "}
                  <Link
                    href="/cadastro"
                    className="text-primary font-medium hover:underline"
                  >
                    Cadastre-se como afiliado
                  </Link>
                </div>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4 px-0">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="border-input/60 focus:border-primary"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Senha</Label>
                      <Link
                        href="#"
                        className="text-sm text-primary hover:underline"
                      >
                        Esqueceu a senha?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      className="border-input/60 focus:border-primary"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                </CardContent>

                <CardFooter className="px-0 pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 transition-all text-white font-medium py-6"
                    disabled={isLoading}
                  >
                    {isLoading ? (
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
                        Entrando...
                      </>
                    ) : (
                      "Entrar"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
