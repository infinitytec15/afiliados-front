"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/layout/header";

export default function CadastroSucesso() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-lg border border-green-500/20 bg-green-500/5">
            <CardHeader className="text-center pb-2">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                  delay: 0.2,
                }}
                className="mx-auto mb-4"
              >
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              </motion.div>
              <CardTitle className="text-2xl">Cadastro Concluído!</CardTitle>
            </CardHeader>

            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Seu cadastro foi enviado com sucesso. Agora você precisa
                preencher o contrato para ativar sua conta de afiliado.
              </p>
            </CardContent>

            <CardFooter className="flex justify-center pt-2">
              <Link href="/contrato">
                <Button size="lg" className="px-8">
                  Continuar para Contrato
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
