import logo from "../assets/logo/Logo.png";
import onibus from "../assets/Onibus.png";
import ButtonForm from "../components/buttonForm";
import GoogleButton from "../components/googleButton";
import InputEmail from "../components/inputEmail";
import InputPassword from "../components/inputPassword";

import InputUser from "../components/inputUser"
import "./registerPage.css";

function RegisterPage() {
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
          <InputUser/>
          <InputEmail />
          <InputPassword />
          <div id="entrarAndLembrar">
            <ButtonForm
              id="sendLogin"
              value="Entrar"
              onClick={() =>
                (window.location.href =
                  "https://drive.google.com/drive/u/0/home")
              }
            />
          </div>
          <GoogleButton />
        </form>
      </aside>
    </div>
  );
}

export default RegisterPage;
