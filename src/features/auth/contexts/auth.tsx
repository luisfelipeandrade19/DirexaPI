// src/context/auth.tsx
/* eslint-disable react-refresh/only-export-components */

import { useState, useEffect, createContext, type ReactNode } from "react";
import { supabase } from "../../../lib/api/supaBaseClient";
import type { User, Session } from "@supabase/supabase-js";
import type { AuthContextType } from '../types'; 

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    const getInitialSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Erro ao obter sessão inicial:", error.message);
      }
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
    };

    getInitialSession();

    return () => {
      authListener.subscription.unsubscribe(); // Desinscreve o listener ao desmontar
    };
  }, []);

  const signin = async (
    email: string,
    password: string
  ): Promise<string | null> => {
    // Função assíncrona
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    }); // Usa o método de login do Supabase
    if (error) {
      return error.message; // Retorna a mensagem de erro
    }
    // O useEffect com onAuthStateChange já vai atualizar o user e session automaticamente
    return null; // Retorna null em caso de sucesso
  };

  const signup = async (
    email: string,
    password: string,
    nome: string
  ): Promise<string | null> => {
    // Função assíncrona
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: nome, // Passa o nome para os metadados do usuário no Supabase Auth
        },
      },
    });

    if (error) {
      return error.message; // Retorna a mensagem de erro
    }

    // Opcional: Se você tem uma tabela 'profiles' para armazenar informações adicionais
    // (além do que o Supabase Auth já guarda), você pode inserí-las aqui.
    // Certifique-se de ter uma tabela 'profiles' no seu Supabase com colunas 'id', 'email', 'full_name'
    // e RLS configurado para INSERT.
    if (data.user) {
      // Verifica se o usuário foi criado
      const { error: profileError } = await supabase
        .from("profiles") // Nome da sua tabela de perfis
        .insert([
          { id: data.user.id, email: data.user.email, full_name: nome }, // Insere os dados do perfil
        ]);
      if (profileError) {
        console.error(
          "Erro ao inserir perfil adicional:",
          profileError.message
        ); // Loga erros
      }
    }

    return null; // Retorna null em caso de sucesso
  };

  const signout = async (): Promise<void> => {
    // Função assíncrona
    const { error } = await supabase.auth.signOut(); // Usa o método de logout do Supabase
    if (error) {
      console.error("Erro ao fazer logout:", error.message); // Loga erros
    }
    setUser(null); // Limpa o estado do usuário
    setSession(null); // Limpa o estado da sessão
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        signed: !!user,
        signin,
        signup,
        signout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
