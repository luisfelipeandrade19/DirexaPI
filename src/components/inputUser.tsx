// inputEmail.tsx
type InputEmailProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder?: string;
};

function InputUser({ onChange, value, placeholder = "Digite seu nome de usuario" }: InputEmailProps) {
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

export default InputUser