import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CopyIcon, UploadIcon, CheckIcon } from "lucide-react";

interface CompanyData {
  name: string;
  cnpj: string;
  address: string;
}

interface InvoiceUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (file: File | null) => void;
}

const InvoiceUploadModal = ({
  open,
  onOpenChange,
  onSubmit,
}: InvoiceUploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [copied, setCopied] = useState(false);

  // Dados da empresa para emissão de nota fiscal
  const companyData: CompanyData = {
    name: "Programa de Afiliados LTDA",
    cnpj: "12.345.678/0001-90",
    address: "Av. Paulista, 1000, São Paulo - SP, CEP 01310-100",
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    onSubmit(file);
    onOpenChange(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Solicitar Saque</DialogTitle>
          <DialogDescription>
            Para solicitar seu saque, emita uma nota fiscal com os dados abaixo
            e faça o upload do arquivo.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-muted p-4 rounded-md space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Dados para Emissão da Nota</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  copyToClipboard(
                    `${companyData.name}\n${companyData.cnpj}\n${companyData.address}`,
                  )
                }
              >
                {copied ? (
                  <CheckIcon className="h-4 w-4 mr-1" />
                ) : (
                  <CopyIcon className="h-4 w-4 mr-1" />
                )}
                {copied ? "Copiado" : "Copiar"}
              </Button>
            </div>
            <p className="text-sm">Empresa: {companyData.name}</p>
            <p className="text-sm">CNPJ: {companyData.cnpj}</p>
            <p className="text-sm">Endereço: {companyData.address}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="invoice">Upload da Nota Fiscal</Label>
            <div className="flex items-center gap-2">
              <Input
                id="invoice"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Formatos aceitos: PDF, JPG, JPEG, PNG. Tamanho máximo: 5MB.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações (opcional)</Label>
            <Textarea
              id="notes"
              placeholder="Adicione informações adicionais se necessário"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!file}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <UploadIcon className="h-4 w-4 mr-2" />
            Enviar Nota Fiscal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceUploadModal;
