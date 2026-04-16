import React, { createContext, useContext, useState, useEffect } from "react";

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  isSeller: boolean;
}

interface UserContextType {
  currentUser: CurrentUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, phone: string, password: string, isSeller: boolean) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("currentUser");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in a real app, this would call an API
    const mockUser: CurrentUser = {
      id: "current-user",
      name: "Current User",
      email: email,
      isSeller: true, // Default to seller for existing users
    };
    setCurrentUser(mockUser);
    localStorage.setItem("currentUser", JSON.stringify(mockUser));
  };

  const signup = async (name: string, email: string, phone: string, password: string, isSeller: boolean) => {
    // Mock signup - in a real app, this would call an API
    const newUser: CurrentUser = {
      id: `user-${Date.now()}`,
      name: name,
      email: email,
      isSeller: isSeller,
    };
    setCurrentUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const value: UserContextType = {
    currentUser,
    isLoading,
    login,
    signup,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
