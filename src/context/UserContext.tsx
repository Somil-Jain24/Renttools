import React, { createContext, useContext, useState, useEffect } from "react";

export interface TrustScores {
  buyerScore: number; // 0-100
  sellerScore: number; // 0-100
}

export interface SellerProfile {
  isRegistered: boolean;
  verificationStatus: "pending" | "verified" | "rejected";
  bankAccountLinked: boolean;
  totalEarnings: number;
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  avatar?: string;
  isSeller: boolean;
  mode: "buyer" | "seller";
  trustScores: TrustScores;
  sellerProfile: SellerProfile;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
}

interface UserContextType {
  currentUser: CurrentUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, phone: string, password: string, startAsRole: "buyer" | "seller") => Promise<void>;
  logout: () => void;
  switchMode: (newMode: "buyer" | "seller") => void;
  updateProfile: (updates: Partial<CurrentUser>) => void;
  updateTrustScores: (buyerScore?: number, sellerScore?: number) => void;
  registerAsSeller: (updates: Partial<SellerProfile>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const defaultTrustScores: TrustScores = {
  buyerScore: 85,
  sellerScore: 78,
};

const defaultSellerProfile: SellerProfile = {
  isRegistered: false,
  verificationStatus: "pending",
  bankAccountLinked: false,
  totalEarnings: 0,
};

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
      name: "Demo User",
      email: email,
      phone: "+91 98765 43210",
      location: "Bengaluru, India",
      isSeller: true,
      mode: "buyer", // Default to buyer mode
      trustScores: defaultTrustScores,
      sellerProfile: { ...defaultSellerProfile, isRegistered: true, verificationStatus: "verified" },
      emailVerified: true,
      phoneVerified: true,
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days ago
    };
    setCurrentUser(mockUser);
    localStorage.setItem("currentUser", JSON.stringify(mockUser));
  };

  const signup = async (name: string, email: string, phone: string, password: string, startAsRole: "buyer" | "seller") => {
    // Mock signup - in a real app, this would call an API
    const newUser: CurrentUser = {
      id: `user-${Date.now()}`,
      name: name,
      email: email,
      phone: phone,
      isSeller: startAsRole === "seller",
      mode: startAsRole,
      trustScores: defaultTrustScores,
      sellerProfile: startAsRole === "seller" ? { ...defaultSellerProfile, isRegistered: true, verificationStatus: "pending" } : defaultSellerProfile,
      emailVerified: false,
      phoneVerified: false,
      createdAt: new Date().toISOString(),
    };
    setCurrentUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const switchMode = (newMode: "buyer" | "seller") => {
    if (currentUser) {
      // Only allow switching to seller mode if registered as seller
      if (newMode === "seller" && !currentUser.isSeller) {
        console.warn("User is not registered as a seller");
        return;
      }
      const updatedUser = {
        ...currentUser,
        mode: newMode,
      };
      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
  };

  const updateProfile = (updates: Partial<CurrentUser>) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        ...updates,
      };
      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
  };

  const updateTrustScores = (buyerScore?: number, sellerScore?: number) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        trustScores: {
          buyerScore: buyerScore ?? currentUser.trustScores.buyerScore,
          sellerScore: sellerScore ?? currentUser.trustScores.sellerScore,
        },
      };
      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
  };

  const registerAsSeller = (updates: Partial<SellerProfile>) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        isSeller: true,
        sellerProfile: {
          ...currentUser.sellerProfile,
          ...updates,
          isRegistered: true,
        },
      };
      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
  };

  const value: UserContextType = {
    currentUser,
    isLoading,
    login,
    signup,
    logout,
    switchMode,
    updateProfile,
    updateTrustScores,
    registerAsSeller,
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
