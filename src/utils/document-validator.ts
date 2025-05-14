// Função para validar CPF
export function isValidCPF(cpf: string): boolean {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/[^\d]/g, "");

  // Verifica se tem 11 dígitos
  if (cpf.length !== 11) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cpf)) return false;

  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = sum % 11;
  let digit1 = remainder < 2 ? 0 : 11 - remainder;

  if (parseInt(cpf.charAt(9)) !== digit1) return false;

  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = sum % 11;
  let digit2 = remainder < 2 ? 0 : 11 - remainder;

  return parseInt(cpf.charAt(10)) === digit2;
}

// Função para validar CNPJ
export function isValidCNPJ(cnpj: string): boolean {
  // Remove caracteres não numéricos
  cnpj = cnpj.replace(/[^\d]/g, "");

  // Verifica se tem 14 dígitos
  if (cnpj.length !== 14) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cnpj)) return false;

  // Validação do primeiro dígito verificador
  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  const digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;

  // Validação do segundo dígito verificador
  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return result === parseInt(digits.charAt(1));
}

// Função para validar CPF ou CNPJ
export function isValidDocument(document: string): boolean {
  const cleanDoc = document.replace(/[^\d]/g, "");

  if (cleanDoc.length === 11) {
    return isValidCPF(cleanDoc);
  } else if (cleanDoc.length === 14) {
    return isValidCNPJ(cleanDoc);
  }

  return false;
}

// Função para formatar CPF
export function formatCPF(value: string): string {
  const cleanValue = value.replace(/\D/g, "");
  return cleanValue
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4")
    .substring(0, 14);
}

// Função para formatar CNPJ
export function formatCNPJ(value: string): string {
  const cleanValue = value.replace(/\D/g, "");
  return cleanValue
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5")
    .substring(0, 18);
}

// Função para formatar documento (CPF ou CNPJ)
export function formatDocument(value: string): string {
  const cleanValue = value.replace(/\D/g, "");

  if (cleanValue.length <= 11) {
    return formatCPF(cleanValue);
  } else {
    return formatCNPJ(cleanValue);
  }
}

// Função para formatar telefone
export function formatPhone(value: string): string {
  const cleanValue = value.replace(/\D/g, "");
  if (cleanValue.length <= 10) {
    return cleanValue
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/^(\d{2})\)\s(\d{4})(\d)/, "($1) $2-$3")
      .substring(0, 14);
  } else {
    return cleanValue
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/^(\d{2})\)\s(\d{5})(\d)/, "($1) $2-$3")
      .substring(0, 15);
  }
}
