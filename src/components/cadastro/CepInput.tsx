"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface AddressData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

interface CepInputProps {
  onAddressFound: (address: AddressData) => void;
}

export default function CepInput({ onAddressFound }: CepInputProps) {
  const [cep, setCep] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const formatCep = (value: string): string => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d)/, "$1-$2")
      .substring(0, 9);
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCep = formatCep(e.target.value);
    setCep(formattedCep);
  };

  const searchCep = async () => {
    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      toast({
        title: "CEP inválido",
        description: "Por favor, digite um CEP válido com 8 dígitos.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cleanCep}/json/`,
      );
      const data = await response.json();

      if (data.erro) {
        toast({
          title: "CEP não encontrado",
          description: "O CEP informado não foi encontrado.",
          variant: "destructive",
        });
        return;
      }

      onAddressFound(data);
      toast({
        title: "Endereço encontrado",
        description: "Os campos de endereço foram preenchidos automaticamente.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Erro ao buscar CEP",
        description: "Ocorreu um erro ao buscar o CEP. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="cep">CEP</Label>
      <div className="flex gap-2">
        <Input
          id="cep"
          placeholder="00000-000"
          value={cep}
          onChange={handleCepChange}
          maxLength={9}
          className="flex-1"
        />
        <Button
          type="button"
          onClick={searchCep}
          disabled={isLoading || cep.replace(/\D/g, "").length !== 8}
          variant="secondary"
        >
          {isLoading ? "Buscando..." : "Buscar"}
        </Button>
      </div>
    </div>
  );
}
