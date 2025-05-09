import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suporte - Sistema de Afiliados",
  description: "Central de suporte para afiliados",
};

export default function SuporteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-background min-h-screen">{children}</div>;
}
