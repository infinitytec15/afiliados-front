"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/layout/header";

export default function CadastroStep2() {
  const router = useRouter();
  const [cadastroData, setCadastroData] = useState(null);
  const [indicador, setIndicador] = useState({
    nivel1: "João Silva",
  });

  useEffect(() => {
    // Em um cenário real, verificaríamos o código de indicação
    // e buscaríamos os dados do indicador no backend
    const storedData = localStorage.getItem("cadastroData");
    if (storedData) {
      setCadastroData(JSON.parse(storedData));
    } else {
      // Se não houver dados, redireciona para o passo 1
      router.push("/cadastro/1");
    }
  }, [router]);

  const handleConcluir = () => {
    // Em um cenário real, enviaríamos os dados para o backend
    router.push("/cadastro/sucesso");
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
              <CardTitle className="text-2xl">
                Confirmação de Indicação
              </CardTitle>
              <CardDescription>
                Passo 2 de 2: Verifique seus indicadores
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Você foi indicado por:</h3>
                  <p className="text-lg font-semibold">{indicador.nivel1}</p>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-sm text-muted-foreground">
                  Ao concluir seu cadastro, você confirma que foi indicado pelos
                  afiliados acima.
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Link href="/cadastro/1">
                <Button variant="outline" type="button">
                  Voltar
                </Button>
              </Link>
              <Button onClick={handleConcluir}>Concluir Cadastro</Button>
            </CardFooter>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
