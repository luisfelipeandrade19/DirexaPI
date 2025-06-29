import logo from "../assets/logo/Logo.png";
import onibus from "../assets/Onibus.png";
import ButtonForm from "../components/buttonForm";
import GoogleButton from "../components/googleButton";
import InputEmail from "../components/inputEmail";
import InputPassword from "../components/inputPassword";
import LembrarButton from "../components/lembrarButton";
import "./loginPage.css";

function LoginPage() {
  return (
    <div id="container">
      <aside id="left">
        <img id="logoDirexa" src={logo} alt="Logo do sistema Direxa" />
        <img id="busImg" src={onibus} alt="Imagem de um onibus na cidade" />
      </aside>
      <aside id="right">
        <ButtonForm id="loginButton" value="Login" />
        <ButtonForm id="registerButton" value="Criar Conta" />
        <form action="get">
          <h2>Fazer Login</h2>
          <InputEmail id="emaillogin" />
          <InputPassword />
          <LembrarButton />
          <ButtonForm id="sendLogin" value="Entrar"/>
          <GoogleButton/>
        </form>
      </aside>
    </div>
  );
}

export default LoginPage;
