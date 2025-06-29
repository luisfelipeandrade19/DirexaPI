function InputEmail({ id = "inputEmail", placeholder = "Digite seu email" }) {
  return (
    <div>
      <input type="email" id={id} placeholder={placeholder} />
    </div>
  );
}

export default InputEmail;
