"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    userData: Omit<User, "id"> & { password: string },
  ) => Promise<boolean>;
  logout: () => void;
  getReferralLink: () => string;
  saveCustomLinkSlug: (slug: string) => boolean;
  customLinkSlug: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Mock users for testing
  const mockUsers = [
    {
      id: "1",
      name: "João Silva",
      email: "joao@exemplo.com",
      password: "senha123",
      role: "afiliado",
    },
    {
      id: "2",
      name: "Maria Souza",
      email: "maria@exemplo.com",
      password: "senha123",
      role: "admin",
    },
  ];

  // Check for existing user in localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Find user with matching credentials
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password,
    );

    if (foundUser) {
      // Remove password from user object before storing in state
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      // Store in localStorage for persistence
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      return true;
    }

    return false;
  };

  // Função para registrar novo usuário e redirecionar para dashboard
  const register = async (
    userData: Omit<User, "id"> & { password: string },
  ) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Em um sistema real, aqui seria feita uma chamada à API para registrar o usuário
    // Para este exemplo, vamos apenas criar um novo usuário com ID gerado
    const newUser = {
      id: `${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.role || "afiliado",
    };

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Estado para armazenar o link personalizado do usuário
  const [customLinkSlug, setCustomLinkSlug] = useState<string>("");

  // Carregar o slug personalizado do localStorage ao iniciar
  useEffect(() => {
    if (user) {
      const storedSlug = localStorage.getItem(`customLinkSlug_${user.id}`);
      if (storedSlug) {
        setCustomLinkSlug(storedSlug);
      }
    }
  }, [user]);

  // Função para salvar o slug personalizado
  const saveCustomLinkSlug = (slug: string) => {
    if (!user) return false;

    // Validar o slug (apenas letras, números e hífens)
    const isValid = /^[a-zA-Z0-9-]+$/.test(slug) && slug.length >= 3;

    if (isValid) {
      setCustomLinkSlug(slug);
      localStorage.setItem(`customLinkSlug_${user.id}`, slug);
      return true;
    }

    return false;
  };

  // Função para gerar link de indicação do usuário
  const getReferralLink = () => {
    if (!user) return "";

    // Usa o slug personalizado se existir, caso contrário usa o ID do usuário
    const refParam = customLinkSlug || user.id;
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    return `${baseUrl}/cadastro/1?ref=${refParam}`;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        getReferralLink,
        saveCustomLinkSlug,
        customLinkSlug,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
