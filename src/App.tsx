import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginPage from "./screens/loginPage";
import RegisterPage from "./screens/registerPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/home"

function App() {
  const CLIENT_ID =
    "110870834981-v1j67e6av74jgdq51m0sgdheevd0kg2f.apps.googleusercontent.com";
  return (
    <>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
