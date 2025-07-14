import { GoogleLogin } from "@react-oauth/google";


function GoogleButton() {
  
  return (
    <div id="buttonGoogle">
      < GoogleLogin 
  onSuccess = { credentialResponse  =>  { 
    console . log ( credentialResponse ) ; 
  } } 
  onError = { ( )  =>  { 
    console . log ( 'Falha no login' ) ; 
  } } 
/> ;
    </div>
  );

}
export default GoogleButton;
