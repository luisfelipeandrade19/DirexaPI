import "../css/inputEmail.css";
type InputEmailProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder?: string;
};

function InputEmail({ onChange, value, placeholder = "Digite seu email" }: InputEmailProps) {
  return (
    <div>
      <input 
        onChange={onChange}
        value={value}
        type="email"
        id="inputEmail"
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputEmail