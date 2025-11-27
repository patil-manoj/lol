import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  preferences: {
    allowChatStorage: boolean;
    allowPersonalization: boolean;
    theme: "light" | "dark";
  };
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updatePreferences: (
    preferences: Partial<User["preferences"]>
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Configure Google OAuth
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com",
    iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
    androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
  });

  // Handle Google OAuth response
  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      handleGoogleSignIn(authentication?.accessToken);
    }
  }, [response]);

  // Load user from AsyncStorage on mount
  useEffect(() => {
    loadUser();
  }, []);

  const handleGoogleSignIn = async (accessToken?: string) => {
    if (!accessToken) return;

    try {
      // Fetch user info from Google
      const userInfoResponse = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const userInfo = await userInfoResponse.json();
      const { email, name, picture, id: googleId } = userInfo;

      const storedUsers = await AsyncStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      let existingUser = users.find((u: any) => u.email === email);

      if (existingUser) {
        // User exists, sign them in
        const { password: _, ...userWithoutPassword } = existingUser;
        userWithoutPassword.createdAt = new Date(userWithoutPassword.createdAt);

        await AsyncStorage.setItem("user", JSON.stringify(userWithoutPassword));
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

        await AsyncStorage.setItem("users", JSON.stringify(users));
        await AsyncStorage.setItem("user", JSON.stringify(newUser));

        setAuthState({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        // Convert date string back to Date object
        user.createdAt = new Date(user.createdAt);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      }
    } catch (error) {
      console.error("Failed to load user:", error);
      setAuthState({ user: null, isAuthenticated: false, isLoading: false });
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const storedUsers = await AsyncStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const user = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (!user) {
        throw new Error("Invalid email or password");
      }

      const { password: _, ...userWithoutPassword } = user;
      userWithoutPassword.createdAt = new Date(userWithoutPassword.createdAt);

      await AsyncStorage.setItem("user", JSON.stringify(userWithoutPassword));
      setAuthState({
        user: userWithoutPassword,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const storedUsers = await AsyncStorage.getItem("users");
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

      await AsyncStorage.setItem("users", JSON.stringify(users));
      await AsyncStorage.setItem("user", JSON.stringify(newUser));

      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      await promptAsync();
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  const updatePreferences = async (
    preferences: Partial<User["preferences"]>
  ) => {
    if (!authState.user) return;

    try {
      const updatedUser = {
        ...authState.user,
        preferences: {
          ...authState.user.preferences,
          ...preferences,
        },
      };

      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      setAuthState({
        ...authState,
        user: updatedUser,
      });
    } catch (error) {
      console.error("Failed to update preferences:", error);
    }
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
