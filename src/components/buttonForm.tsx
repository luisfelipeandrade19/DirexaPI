import "../components/buttonForm.css";

type ButtonFormProps = {
  id?: string;
  value?: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
};

function ButtonForm({ id = "", value = "", onClick}: ButtonFormProps) {
  return <input className="interactiveButtons" type="button" id={id} value={value} onClick={onClick}/>;
}
export default ButtonForm;
