"use client";

import { useState, useCallback } from "react";
import { Input } from "./input";
import { Loader2 } from "lucide-react";

type AddressData = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
};

interface AddressInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onAddressFound?: (data: AddressData | null) => void;
  onError?: (message: string) => void;
}

export function AddressInput({
  onAddressFound,
  onError,
  ...props
}: AddressInputProps) {
  const [loading, setLoading] = useState(false);
  const [lastCep, setLastCep] = useState("");

  // Memoized CEP formatter to prevent unnecessary re-renders
  const formatCEP = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const input = e.currentTarget;
      const value = input.value.replace(/\D/g, "");

      if (value === lastCep.replace(/\D/g, "")) return;

      let formattedValue = value;
      if (value.length > 5) {
        formattedValue = `${value.substring(0, 5)}-${value.substring(5, 8)}`;
      }

      // Use the DOM API directly instead of React state
      if (input.value !== formattedValue) {
        input.value = formattedValue;
      }
    },
    [lastCep],
  );

  // Memoized fetch function to prevent unnecessary re-renders
  const fetchAddress = useCallback(
    async (cep: string) => {
      if (cep.length !== 8) return;
      if (cep === lastCep.replace(/\D/g, "")) return;

      setLastCep(cep);
      setLoading(true);

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data: AddressData = await response.json();

        if (data.erro) {
          onError?.("CEP não encontrado");
          onAddressFound?.(null);
        } else {
          onAddressFound?.(data);
        }
      } catch (error) {
        onError?.("Erro ao buscar CEP");
        onAddressFound?.(null);
      } finally {
        setLoading(false);
      }
    },
    [lastCep, onAddressFound, onError],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const cep = e.target.value.replace(/\D/g, "");
      if (cep.length === 8) {
        fetchAddress(cep);
      }
    },
    [fetchAddress],
  );

  return (
    <div className="relative">
      <Input
        {...props}
        onKeyUp={formatCEP}
        onChange={handleChange}
        maxLength={9}
      />
      {loading && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
