"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/layout/header";

export default function CadastroStep1() {
  const router = useRouter();

  // Redirecionar para o novo formulário unificado
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
          <Card className="shadow-lg p-6 flex flex-col items-center justify-center space-y-4">
            <h2 className="text-2xl font-bold">Redirecionando...</h2>
            <p className="text-center text-muted-foreground">
              Estamos redirecionando você para o novo formulário de cadastro
              unificado. Se não for redirecionado automaticamente, clique no
              botão abaixo.
            </p>
            <Link href="/cadastro">
              <Button>Ir para o cadastro</Button>
            </Link>
          </Card>
        </motion.div>
      </main>

      {/* Script para redirecionar automaticamente */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
        window.location.href = "/cadastro" + window.location.search;
      `,
        }}
      />
    </div>
  );
}
