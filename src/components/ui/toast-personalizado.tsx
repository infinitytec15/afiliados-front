import { toast as sonnerToast } from "@/components/ui/use-toast";

type ToastVariant = "default" | "destructive" | "success" | "warning" | "info";

interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

export const toastPersonalizado = {
  sucesso: (options: Omit<ToastOptions, "variant">) => {
    return sonnerToast({
      ...options,
      variant: "success",
      duration: options.duration || 5000,
    });
  },
  erro: (options: Omit<ToastOptions, "variant">) => {
    return sonnerToast({
      ...options,
      variant: "destructive",
      duration: options.duration || 5000,
    });
  },
  aviso: (options: Omit<ToastOptions, "variant">) => {
    return sonnerToast({
      ...options,
      variant: "warning",
      duration: options.duration || 5000,
    });
  },
  info: (options: Omit<ToastOptions, "variant">) => {
    return sonnerToast({
      ...options,
      variant: "info",
      duration: options.duration || 5000,
    });
  },
  padrao: (options: Omit<ToastOptions, "variant">) => {
    return sonnerToast({
      ...options,
      variant: "default",
      duration: options.duration || 5000,
    });
  },
};
