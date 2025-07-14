import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Tipagem para a resposta de credencial do Google
interface CredentialResponse {
  credential?: string;
  select_by?:
    | "auto"
    | "user"
    | "user_1tap"
    | "user_2tap"
    | "btn"
    | "btn_confirm"
    | "btn_add_session"
    | "btn_confirm_add_session";
  clientId?: string;
}

// Tipagem para os dados do usuário decodificados
interface GoogleUser {
  email: string;
  name: string;
  picture?: string;
  sub: string;
  given_name?: string;
  family_name?: string;
  email_verified?: boolean;
}

function GoogleButton() {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      try {
        // Decodificação segura com tipagem
        const decoded: GoogleUser = jwtDecode<GoogleUser>(credentialResponse.credential);
        
        // Armazenamento tipado no localStorage
        const authData = {
          token: credentialResponse.credential,
          user: {
            email: decoded.email,
            name: decoded.name,
            firstName: decoded.given_name,
            lastName: decoded.family_name,
            picture: decoded.picture,
            id: decoded.sub,
            provider: 'google' as const,
            emailVerified: decoded.email_verified || false
          }
        };

        localStorage.setItem("google_auth", JSON.stringify(authData));
        navigate("/home");
      } catch (error) {
        console.error("Erro ao processar login:", error);
      }
    }
  };

  return (
    <div id="buttonGoogle">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.error("Falha no login com Google")}
      />
    </div>
  );
}

export default GoogleButton;