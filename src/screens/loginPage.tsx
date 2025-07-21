/* eslint-disable @typescript-eslint/ban-ts-comment */
import logo from "../assets/logo/Logo.png";
import onibus from "../assets/Onibus.png";
import ButtonForm from "../components/buttonForm";
import GoogleButton from "../components/googleButton";
import InputEmail from "../components/inputEmail";
import InputPassword from "../components/inputPassword";
import LembrarButton from "../components/lembrarButton";
import useAuth from "../hooks/useAuth";
import "./css/loginPage.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { signin } = useAuth(); // Obtém a função signin do hook useAuth
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.MouseEvent) => { // Tornar a função assíncrona
    e.preventDefault();
    if (!email || !senha) {
      setError("Preencha todos os campos");
      return; // Apenas retorna, não precisa retornar 'error'
    }

    const res = await signin(email, senha); // Aguarda o resultado da função signin

    if (res) {
      setError(res); // Define o erro se houver
    } else {
      navigate("/home"); // Navega para a home apenas em caso de sucesso
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
            onClick={() => (window.location.href = "/")}
          />
          <ButtonForm
            id="registerButton"
            value="Criar Conta"
            onClick={() => (window.location.href = "/register")}
          />
        </div>
        <form action="get">
          <h2 id="titleLogin">Fazer Login</h2>
          <div className="inputForm">
            <InputEmail
            // @ts-ignore
            onChange={(e) => [setEmail(e.target.value), setError("")]}
            value={email}
          />
          <InputPassword
            // @ts-ignore
            onChange={(e) => [setSenha(e.target.value), setError("")]}
            value={senha}
          />
          <div id="entrarAndLembrar">
            <LembrarButton />
            <ButtonForm
              id="sendLogin"
              value="Entrar"
              onClick={ handleLogin}
            />
          </div>
          <GoogleButton />
          </div>
        </form>
      </aside>
    </div>
  );
}

export default LoginPage;