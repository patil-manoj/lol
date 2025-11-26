"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, AuthState } from "@/types";

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signInWithGoogle: (credential: string) => Promise<void>;
  signOut: () => void;
  updatePreferences: (preferences: Partial<User["preferences"]>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Decode JWT token (Google credential)
function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to parse JWT:", error);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      setAuthState({ user: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    // Simulate API call - replace with actual authentication
    const storedUsers = localStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const { password: _, ...userWithoutPassword } = user;

    localStorage.setItem("user", JSON.stringify(userWithoutPassword));
    setAuthState({
      user: userWithoutPassword,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const signUp = async (email: string, password: string, name: string) => {
    // Simulate API call - replace with actual authentication
    const storedUsers = localStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      throw new Error("Email already registered");
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      createdAt: new Date(),
      preferences: {
        allowChatStorage: false,
        allowPersonalization: false,
        theme: "light",
      },
    };

    const userWithPassword = { ...newUser, password };
    users.push(userWithPassword);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user", JSON.stringify(newUser));

    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const signInWithGoogle = async (credential: string) => {
    // Decode Google JWT token
    const payload = parseJwt(credential);

    if (!payload) {
      throw new Error("Invalid Google credential");
    }

    const { email, name, picture, sub: googleId } = payload;

    // Check if user exists
    const storedUsers = localStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    let existingUser = users.find((u: any) => u.email === email);

    if (existingUser) {
      // User exists, sign them in
      const { password: _, ...userWithoutPassword } = existingUser;
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      setAuthState({
        user: userWithoutPassword,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      // Create new user from Google account
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name: name || email.split("@")[0],
        createdAt: new Date(),
        preferences: {
          allowChatStorage: false,
          allowPersonalization: false,
          theme: "light",
        },
      };

      const userWithGoogle = { ...newUser, googleId, picture };
      users.push(userWithGoogle);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify(newUser));

      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
      });
    }
  };

  const signOut = () => {
    localStorage.removeItem("user");
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updatePreferences = (preferences: Partial<User["preferences"]>) => {
    if (!authState.user) return;

    const updatedUser = {
      ...authState.user,
      preferences: {
        ...authState.user.preferences,
        ...preferences,
      },
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setAuthState({
      ...authState,
      user: updatedUser,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        updatePreferences,
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
