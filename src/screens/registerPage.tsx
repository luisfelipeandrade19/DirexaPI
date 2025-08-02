import logo from "../assets/logo/Logo.png";
import onibus from "../assets/Onibus.png";
import ButtonForm from "../components/ui/buttonForm";
import GoogleButton from "../features/auth/components/googleButton";
import InputEmail from "../components/ui/inputEmail";
import InputPassword from "../components/ui/inputPassword";
import InputUser from "../components/ui/inputUser";
import "./css/registerPage.css";

import useAuth from "../features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function RegisterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignup = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email || !senha || !nome) {
      setError("Preencha todos os campos");
      return;
    }

    const res = await signup(email, senha, nome);

    if (res) {
      setError(res);
    } else {
      setError("");
      alert("Usuário cadastrado com sucesso");
      navigate("/");
    }
  };

  return (
    <div className="registerPage container">
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
          <h2 id="titleLogin">Fazer Cadastro</h2>
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
            <InputUser
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => [
                setNome(e.target.value),
                setError(""),
              ]}
              value={nome}
            />

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
            <ButtonForm
              id="sendLogin"
              value="Cadastrar"
              onClick={handleSignup}
            />
          </div>
          <GoogleButton />
        </form>
      </aside>
    </div>
  );
}

export default RegisterPage;
