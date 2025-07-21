// src/components/googleButton.tsx
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { supabase } from "../supaBaseClient"; // Importe o cliente Supabase

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

  const handleSuccess = async (credentialResponse: CredentialResponse) => { // Tornar assíncrona
    if (credentialResponse.credential) {
      try {
        const decoded: GoogleUser = jwtDecode<GoogleUser>(credentialResponse.credential);

        // Tentar fazer login com o Google no Supabase usando o ID Token
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google', // Provedor Google
          token: credentialResponse.credential, // O ID Token do Google
          // Em alguns casos, o access_token pode ser necessário, mas o ID Token geralmente é suficiente para signInWithIdToken
          // access_token: credentialResponse.credential
        });

        if (error) {
          console.error("Erro no login com Supabase via Google:", error.message); // Loga o erro
          alert(`Erro ao fazer login com Google: ${error.message}`); // Exibe alerta ao usuário
          return;
        }

        if (data.user) { // Se o usuário foi autenticado/registrado no Supabase
          console.log("Usuário logado via Google no Supabase:", data.user); // Loga sucesso

          // Opcional: Salvar ou atualizar informações adicionais do perfil
          // na sua tabela 'profiles' (se ela não for a tabela de autenticação)
          const { error: profileError } = await supabase
            .from('profiles') // Sua tabela de perfis de usuário
            .upsert({
              id: data.user.id, // ID do usuário Supabase
              email: data.user.email, // Email do usuário
              full_name: data.user.user_metadata?.full_name || decoded.name, // Nome completo
              avatar_url: data.user.user_metadata?.avatar_url || decoded.picture, // URL do avatar
              // Adicione outros campos que você deseja salvar
            }, { onConflict: 'id' }); // Atualiza se o ID já existir

          if (profileError) {
            console.error("Erro ao salvar/atualizar perfil do usuário:", profileError.message); // Loga erro
          }

          navigate("/home"); // Navega para a página inicial
        }
      } catch (error) {
        console.error("Erro ao processar login:", error); // Loga erros gerais
        alert("Ocorreu um erro ao processar seu login com o Google."); // Exibe alerta
      }
    }
  };

  const handleError = () => {
    console.error("Falha no login com Google"); // Loga falha
    alert("Falha no login com Google. Por favor, tente novamente."); // Exibe alerta
  };

  return (
    <div id="buttonGoogle">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
}

export default GoogleButton;