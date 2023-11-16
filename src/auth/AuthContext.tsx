import React, { createContext, useState, useEffect, ReactNode } from "react";

type AuthContextType = {
  isAuthenticated: boolean | undefined;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const defaultContextValue: AuthContextType = {
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultContextValue);

type AuthProviderProps = {
  children: ReactNode;
};
const BASE_URL = "http://localhost:8080";
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  console.log("isAuthenticated: ", isAuthenticated);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch(`${BASE_URL}/check`, {
          credentials: "include",
        });
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(undefined);
      }
    };

    checkAuthentication();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (response.ok) {
        setIsAuthenticated(true);
        window.location.href = "/game";
      } else {
        throw new Error("Failed to login");
      }
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      setIsAuthenticated(undefined);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setIsAuthenticated(false);
      } else {
        throw new Error("Failed to logout");
      }
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      setIsAuthenticated(undefined);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
