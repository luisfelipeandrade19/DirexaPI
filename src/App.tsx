import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginPage from "./screens/loginPage";

function App() {
  const CLIENT_ID =
    "110870834981-v1j67e6av74jgdq51m0sgdheevd0kg2f.apps.googleusercontent.com";
  return (
    <>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <LoginPage />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
