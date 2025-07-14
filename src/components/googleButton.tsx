import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function GoogleButton() {
  const navigate = useNavigate();
  return (
    <div id="buttonGoogle">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          navigate("/home")
        }}
        onError={() => {
          console.log("Falha no login");
        }}
      />
    </div>
  );
}
export default GoogleButton;
