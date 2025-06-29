import { useState } from "react";
import "./inputPassword.css";
import { Eye, EyeOff } from "lucide-react";

function InputPassword() {
  const [isShow, setIsShow] = useState(false);

  const handlePassword = () => setIsShow(!isShow);

  return (
    <label className="password">
      <div className="input-wrapper">
        <input
          type={isShow ? "text" : "password"}
          id="password"
          placeholder="Digite a sua senha"
        />
        <button onClick={handlePassword} type="button">
          {!isShow && <Eye />}
          {isShow && <EyeOff />}
        </button>
      </div>
    </label>
  );
}
export default InputPassword;
