import { useContext } from "react";
import { AuthContext } from "../context/auth";

const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  
  return context;
};

export default useAuth;