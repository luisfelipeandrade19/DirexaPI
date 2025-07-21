/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import logo from "../assets/logo/Logo.png";
import onibus from "../assets/Onibus.png";
import ButtonForm from "../components/buttonForm";
import GoogleButton from "../components/googleButton";
import InputEmail from "../components/inputEmail";
import InputPassword from "../components/inputPassword";
import InputUser from "../components/inputUser";
import "./css/registerPage.css";

import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function RegisterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { signup } = useAuth(); // Obtém a função signup do hook useAuth

  const handleSignup = async (e: React.MouseEvent) => { // Tornar a função assíncrona
    e.preventDefault();
    if (!email || !senha || !nome) {
      setError("Preencha todos os campos");
      return; // Apenas retorna, não precisa retornar 'error'
    }

    const res = await signup(email, senha, nome); // Aguarda o resultado da função signup

    if (res) {
      setError(res); // Define o erro se houver
    } else {
      alert("Usuário cadastrado com sucesso"); // Alerta de sucesso
      navigate("/"); // Navega para a página de login após o cadastro
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
            onClick={() => (window.location.href = "/")}
          />
          <ButtonForm
            id="registerButton"
            value="Criar Conta"
            onClick={() => (window.location.href = "/register")}
          />
        </div>
        <form action="get">
          <h2 id="titleLogin">Fazer Cadastro</h2>
          {error && <span style={{ color: 'red' }}>{error}</span>} {/* Exibe o erro */}
          <InputUser
            // @ts-ignore
            onChange={(e) => [setNome(e.target.value), setError("")]}
            value={nome}
          />

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
            <ButtonForm id="sendLogin" value="Entrar" onClick={handleSignup} />
          </div>
          <GoogleButton />
        </form>
      </aside>
    </div>
  )
}

export default RegisterPage;