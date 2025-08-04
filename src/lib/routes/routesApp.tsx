import RegisterPage from "../../screens/registerPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../screens/home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginPage from "../../screens/loginPage";

import useAuth from "../../features/auth/hooks/useAuth";
import { AuthProvider } from "../../features/auth/contexts/auth";

interface PrivateProps {
  Item: React.ComponentType;
}

const Private = ({ Item }: PrivateProps) => {
  const { signed } = useAuth();
  return signed ? <Item /> : <LoginPage />;
};

function RoutesApp() {
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<Private Item={Home} />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default RoutesApp;
