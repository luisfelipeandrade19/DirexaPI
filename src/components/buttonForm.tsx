import "../components/buttonForm.css";

function ButtonForm({ id = "", value = "" }) {
  return <input className="interactiveButtons" type="button" id={id} value={value} />;
}
export default ButtonForm;
