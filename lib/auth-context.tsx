"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { User } from "./types";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: Partial<User> & { password: string }) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router  = useRouter()

  // Initialize: only restore session if it was actively created
  useEffect(() => {
    const sessionActive = localStorage.getItem("session_active");
    if (sessionActive === "true") {
      restoreSession();
    }
    setIsLoading(false);
  }, []);

  // Mock Sign Up
  const signUp = async (userData: Partial<User> & { password: string }) => {
    setIsLoading(true);
    
    // Simulate API delay
  
    
    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      email: userData.email || "",
      name: userData.name || "",
      university: userData.university || "",
      year: userData.year || "freshman",
      major: userData.major,
      rating: 5.0,
      reviewCount: 0,
      createdAt: new Date(),
      isVerified: false,
      password: userData.password
    };
    
    // Save registered user
    localStorage.setItem("registered_user", JSON.stringify(newUser));
    setIsLoading(false);
  };

  // Restore session (only call this manually)
  const restoreSession = () => {
    const savedUser = localStorage.getItem("user_session");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      return true;
    }
    return false;
  };

  // Mock Sign In
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Check if user exists
    const registeredUser = localStorage.getItem("registered_user");
    if (!registeredUser) {
      setIsLoading(false);
      throw new Error("No user found. Please sign up first.");
    }
    
    const userData = JSON.parse(registeredUser);
    
    // Validate credentials
    if (userData.email !== email || userData.password !== password) {
      setIsLoading(false);
      throw new Error("Invalid credentials");
    }
    
    // Set active session
    const { password: _, ...userWithoutPassword } = userData;
    setUser(userWithoutPassword);
    localStorage.setItem("user_session", JSON.stringify(userWithoutPassword));
    localStorage.setItem("session_active", "true"); // Mark session as active
    setIsLoading(false);
  };

  // Sign Out
  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user_session");
    localStorage.removeItem("session_active");
  };


  return (
    <AuthContext.Provider value={{
      user ,
      isLoading,
       signIn,
       signUp,
       signOut,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};