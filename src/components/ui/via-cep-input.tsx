"use client";

import * as React from "react";
import { useState, useRef, useCallback } from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ViaCEPResponse {
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
}

export interface ViaCEPInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onAddressFound?: (addressData: ViaCEPResponse | null) => void;
  onError?: (error: string) => void;
}

export const ViaCEPInput = React.forwardRef<HTMLInputElement, ViaCEPInputProps>(
  ({ className, onAddressFound, onError, ...props }, ref) => {
    const [loading, setLoading] = useState(false);
    const lastCepRef = useRef("");
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const onAddressFoundRef = useRef(onAddressFound);
    const onErrorRef = useRef(onError);

    // Update refs when props change
    React.useEffect(() => {
      onAddressFoundRef.current = onAddressFound;
      onErrorRef.current = onError;
    }, [onAddressFound, onError]);

    const mergedRef = useCallback(
      (node: HTMLInputElement | null) => {
        // Update our internal ref
        inputRef.current = node;

        // Handle the forwarded ref
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    // Format CEP as user types (00000-000)
    const formatCEP = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        let value = input.value.replace(/\D/g, ""); // Remove non-digits

        if (value.length > 5) {
          value = `${value.substring(0, 5)}-${value.substring(5, 8)}`;
        }

        // Only update if the value has actually changed
        if (input.value !== value) {
          input.value = value;
        }
      },
      [],
    );

    const fetchAddressData = useCallback(async (cep: string) => {
      if (cep.length !== 8) return;

      // Prevent duplicate API calls for the same CEP
      if (lastCepRef.current === cep && loading) return;

      try {
        setLoading(true);
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

        // Check if the component is still mounted before proceeding
        if (!inputRef.current) return;

        const data: ViaCEPResponse = await response.json();

        if (data.erro) {
          onErrorRef.current?.("CEP não encontrado");
          onAddressFoundRef.current?.(null);
        } else {
          // Create a shallow copy of the data to avoid reference issues
          const dataCopy = { ...data };
          // Call onAddressFound with the data using the ref
          onAddressFoundRef.current?.(dataCopy);
        }
      } catch (error) {
        console.error("ViaCEP error:", error);
        onErrorRef.current?.("Erro ao buscar CEP");
        onAddressFoundRef.current?.(null);
      } finally {
        // Only update state if component is still mounted
        if (inputRef.current) {
          setLoading(false);
        }
      }
    }, []);

    const handleCEPChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const cep = e.target.value.replace(/\D/g, "");

        // Clear any existing timeout to prevent multiple calls
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }

        // Only proceed if we have a complete CEP and it's different from the previous one
        if (cep.length === 8 && cep !== lastCepRef.current) {
          lastCepRef.current = cep;

          // Use a timeout to debounce the API call
          timeoutRef.current = setTimeout(() => {
            // Wrap in try/catch to prevent unhandled errors from causing issues
            try {
              fetchAddressData(cep);
            } catch (error) {
              console.error("Error fetching address data:", error);
              setLoading(false);
              onErrorRef.current?.("Erro ao buscar CEP");
            }
          }, 300); // 300ms debounce
        }
      },
      [fetchAddressData],
    );

    // Clean up timeout on unmount
    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    return (
      <div className="relative">
        <Input
          type="text"
          maxLength={9} // 00000-000
          className={cn(loading && "opacity-70", className)}
          onKeyUp={formatCEP}
          onChange={handleCEPChange}
          disabled={loading}
          ref={mergedRef}
          {...props}
        />
        {loading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>
    );
  },
);

ViaCEPInput.displayName = "ViaCEPInput";
