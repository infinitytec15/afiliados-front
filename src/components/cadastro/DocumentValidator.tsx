"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard } from "lucide-react";

interface DocumentValidatorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
  placeholder?: string;
}

export default function DocumentValidator({
  value,
  onChange,
  error,
  label = "CPF/CNPJ",
  placeholder = "000.000.000-00 ou 00.000.000/0000-00",
}: DocumentValidatorProps) {
  // Função para formatar CPF
  const formatCPF = (value: string): string => {
    const cleanValue = value.replace(/\D/g, "");
    return cleanValue
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4")
      .substring(0, 14);
  };

  // Função para formatar CNPJ
  const formatCNPJ = (value: string): string => {
    const cleanValue = value.replace(/\D/g, "");
    return cleanValue
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5")
      .substring(0, 18);
  };

  // Função para formatar documento (CPF ou CNPJ)
  const formatDocument = (value: string): string => {
    const cleanValue = value.replace(/\D/g, "");
    if (cleanValue.length <= 11) {
      return formatCPF(cleanValue);
    } else {
      return formatCNPJ(cleanValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatDocument(e.target.value);
    onChange(formattedValue);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="cpfCnpj">{label}</Label>
      <div className="relative">
        <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        <Input
          id="cpfCnpj"
          name="cpfCnpj"
          placeholder={placeholder}
          className="pl-10"
          value={value}
          onChange={handleChange}
          maxLength={18}
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
