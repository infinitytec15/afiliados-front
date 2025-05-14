"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CepInput from "./CepInput";

interface AddressData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

interface CompleteAddressData extends AddressData {
  numero: string;
}

interface AddressFormProps {
  onAddressChange?: (address: CompleteAddressData) => void;
}

export default function AddressForm({ onAddressChange }: AddressFormProps) {
  const [address, setAddress] = useState<CompleteAddressData>({
    cep: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    localidade: "",
    uf: "",
    numero: "",
  });

  const handleAddressFound = (data: AddressData) => {
    const updatedAddress = {
      ...address,
      ...data,
    };
    setAddress(updatedAddress);
    if (onAddressChange) {
      onAddressChange(updatedAddress);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedAddress = { ...address, [name]: value };
    setAddress(updatedAddress);
    if (onAddressChange) {
      onAddressChange(updatedAddress);
    }
  };

  return (
    <div className="space-y-4">
      <CepInput onAddressFound={handleAddressFound} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="logradouro">Logradouro</Label>
          <Input
            id="logradouro"
            name="logradouro"
            placeholder="Rua, Avenida, etc"
            value={address.logradouro}
            onChange={handleInputChange}
            readOnly={!!address.logradouro}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="numero">Número</Label>
          <Input
            id="numero"
            name="numero"
            placeholder="Número"
            value={address.numero}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="complemento">Complemento</Label>
          <Input
            id="complemento"
            name="complemento"
            placeholder="Apartamento, bloco, etc"
            value={address.complemento}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bairro">Bairro</Label>
          <Input
            id="bairro"
            name="bairro"
            placeholder="Bairro"
            value={address.bairro}
            onChange={handleInputChange}
            readOnly={!!address.bairro}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="localidade">Cidade</Label>
          <Input
            id="localidade"
            name="localidade"
            placeholder="Cidade"
            value={address.localidade}
            onChange={handleInputChange}
            readOnly={!!address.localidade}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="uf">Estado</Label>
          <Input
            id="uf"
            name="uf"
            placeholder="UF"
            value={address.uf}
            onChange={handleInputChange}
            readOnly={!!address.uf}
            maxLength={2}
          />
        </div>
      </div>
    </div>
  );
}
