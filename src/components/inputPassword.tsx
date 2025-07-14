import { useState } from "react";
import "./css/inputPassword.css";
import { Eye, EyeOff } from "lucide-react";

import "./css/inputPassword.css"

type InputPasswordProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
};

function InputPassword({ onChange, value, placeholder = "Digite sua senha" }: InputPasswordProps) {
  const [isShow, setIsShow] = useState(false);

  return (
    <label className="password">
      <div className="input-wrapper">
        <input
          type={isShow ? "text" : "password"}
          id="password"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <button 
          type="button" 
          onClick={() => setIsShow(!isShow)}
          aria-label={isShow ? "Ocultar senha" : "Mostrar senha"}
        >
          {isShow ? <EyeOff width="20px"/> : <Eye width="20px"/>}
        </button>
      </div>
    </label>
  );
}

export default InputPassword