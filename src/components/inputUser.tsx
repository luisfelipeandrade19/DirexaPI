import "./css/inputUser.css"

function InputUser({  placeholder = "Digite seu nome de usuário" }) {
  return (
    <div>
      <input type="text" id="inputUser" placeholder={placeholder} />
    </div>
  );
}

export default InputUser;
