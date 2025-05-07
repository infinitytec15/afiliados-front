/**
 * Validates Brazilian CPF and CNPJ numbers
 */

// CPF validation
export function validateCPF(cpf: string): boolean {
  // Remove non-digits
  cpf = cpf.replace(/\D/g, "");

  // Check if it has 11 digits
  if (cpf.length !== 11) return false;

  // Check if all digits are the same
  if (/^(\d)\1+$/.test(cpf)) return false;

  // Validate check digits
  let sum = 0;
  let remainder;

  // First check digit
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  // Second check digit
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

// CNPJ validation
export function validateCNPJ(cnpj: string): boolean {
  // Remove non-digits
  cnpj = cnpj.replace(/\D/g, "");

  // Check if it has 14 digits
  if (cnpj.length !== 14) return false;

  // Check if all digits are the same
  if (/^(\d)\1+$/.test(cnpj)) return false;

  // Validate check digits
  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  const digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;

  // First check digit
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;

  // Second check digit
  size += 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) return false;

  return true;
}

// Validate either CPF or CNPJ based on length
export function validateDocument(doc: string, type: "cpf" | "cnpj"): boolean {
  const cleanDoc = doc.replace(/\D/g, "");

  if (type === "cpf") {
    return validateCPF(cleanDoc);
  } else if (type === "cnpj") {
    return validateCNPJ(cleanDoc);
  }

  return false;
}
