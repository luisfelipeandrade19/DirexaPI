import logo from "../assets/logo/Logo.png";
import onibus from "../assets/Onibus.png";
import ButtonForm from "../components/ui/buttonForm";
import GoogleButton from "../features/auth/components/googleButton";
import InputEmail from "../components/ui/inputEmail";
import InputPassword from "../components/ui/inputPassword";
import LembrarButton from "../components/ui/lembrarButton";
import useAuth from "../features/auth/hooks/useAuth";
import "./css/loginPage.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    const res = await signin(email, senha);

    if (res) {
      setError(res);
    } else {
      setError("");
      navigate("/home");
    }
  };

  return (
    <div className="loginPage container">
      <aside className="left">
        <img id="logoDirexa" src={logo} alt="Logo do sistema Direxa" />
        <img id="busImg" src={onibus} alt="Imagem de um onibus na cidade" />
      </aside>
      <aside className="right">
        <div id="rightButtons">
          <ButtonForm
            id="loginButton"
            value="Login"
            onClick={() => {
              window.location.href = "/";
            }}
          />
          <ButtonForm
            id="registerButton"
            value="Criar Conta"
            onClick={() => {
              window.location.href = "/register";
            }}
          />
        </div>
        <form action="get">
          <h2 id="titleLogin">Fazer Login</h2>
          {error && (
            <span
              style={{
                color: "red",
                display: "block",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              {error}
            </span>
          )}
          <div className="inputs">
            <InputEmail
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => [
                setEmail(e.target.value),
                setError(""),
              ]}
              value={email}
            />
            <InputPassword
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => [
                setSenha(e.target.value),
                setError(""),
              ]}
              value={senha}
            />
          </div>
          <div id="entrarAndLembrar">
            <LembrarButton />
            <ButtonForm id="sendLogin" value="Entrar" onClick={handleLogin} />
          </div>
          <GoogleButton />
        </form>
      </aside>
    </div>
  );
}

export default LoginPage;
