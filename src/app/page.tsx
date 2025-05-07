import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-24">
        <div className="max-w-3xl w-full text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Programa de Afiliados
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transforme seu alcance em resultados. Indique clientes, construa sua
            rede e ganhe comissões em dois níveis com nosso programa exclusivo
            de afiliados.
          </p>

          <div className="pt-6">
            <Link href="/cadastro/1">
              <Button size="lg" className="text-lg px-8 py-6">
                Quero ser Afiliado
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="w-full py-6 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Programa de Afiliados. Todos os direitos
          reservados.
        </div>
      </footer>
    </div>
  );
}
