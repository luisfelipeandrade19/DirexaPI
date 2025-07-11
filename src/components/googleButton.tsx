import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import type { GoogleLoginProps } from "@react-oauth/google";

function GoogleButton() {
  const responseMessage: GoogleLoginProps["onSuccess"] = (
    response: CredentialResponse
  ) => {
    console.log("Login success", response);
  };
  const erroMessage = () => {
    console.log(
      "Login failed: An error occurred, but details are not provided by the library in this version."
    );
  };
  return (
    <div id="buttonGoogle">
      <GoogleLogin onError={erroMessage} onSuccess={responseMessage} />
    </div>
  );
}

export default GoogleButton;
