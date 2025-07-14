import RegisterPage from "../screens/registerPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../screens/home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginPage from "../screens/loginPage";

import useAuth from "../hooks/useAuth";
import { AuthProvider } from "../context/auth";

interface PrivateProps {
  Item: React.ComponentType;
}

const Private = ({ Item }: PrivateProps) => {
  const { signed } = useAuth();
  return signed ? <Item /> : <LoginPage />;
};

function RoutesApp() {
  const CLIENT_ID =
    "110870834981-v1j67e6av74jgdq51m0sgdheevd0kg2f.apps.googleusercontent.com";

  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<Private Item={Home} />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default RoutesApp;
