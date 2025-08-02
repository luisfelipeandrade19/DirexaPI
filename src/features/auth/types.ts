import type { Session, User } from "@supabase/supabase-js";

export interface AuthContextType {
  signed: boolean;
  user: User | null; 
  session: Session | null; 
  signin: (email: string, password: string) => Promise<string | null>;
  signup: (email: string, password: string, nome: string) => Promise<string | null>;
  signout: () => Promise<void>;
  loading: boolean;
}