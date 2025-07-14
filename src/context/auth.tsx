/* eslint-disable react-refresh/only-export-components */

import { useState, useEffect, createContext, type ReactNode } from "react";

type User = {
  email: string;
  password: string;
  nome?: string;
};

type AuthContextType = {
  user: User | null;
  signed: boolean;
  signin: (email: string, password: string) => string | void;
  signup: (email: string, password: string, nome: string) => string | void;
  signout: () => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_db");

    if (userToken && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.filter(
        (user: User) => user.email === JSON.parse(userToken).email
      );
      if (hasUser.length) setUser(hasUser[0]);
    }
  }, []);

  const signin = (email: string, password: string) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_db") || "[]");
    const hasUser = usersStorage?.filter((user: User) => user.email === email);

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser({ email, password });
        return;
      }
      return "Email ou senha incorretos";
    }
    return "Usuário não cadastrado";
  };

  const signup = (email: string, password: string, nome: string) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_db") || "[]");
    const hasUser = usersStorage?.filter((user: User) => user.email === email);

    if (hasUser?.length) {
      return "Já tem uma conta cadastrada com esse E-mail";
    }

    const newUser = usersStorage.length 
      ? [...usersStorage, { email, password, nome }] 
      : [{ email, password, nome }];

    localStorage.setItem("users_db", JSON.stringify(newUser));
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
};