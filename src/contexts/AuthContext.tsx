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

  // Função para gerar link de indicação do usuário
  const getReferralLink = () => {
    if (!user) return "";

    // Gera um link de indicação baseado no ID do usuário
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    return `${baseUrl}/cadastro/1?ref=${user.id}`;
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
