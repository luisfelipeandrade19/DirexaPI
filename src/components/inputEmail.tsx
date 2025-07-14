import "./css/inputEmail.css"

function InputEmail({  placeholder = "Digite seu email" }) {
  return (
    <div>
      <input type="email" id="inputEmail" placeholder={placeholder} />
    </div>
  );
}

export default InputEmail;
