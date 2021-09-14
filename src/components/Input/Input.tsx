import "./input.scss";

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
}

const InputText = ({ label, ...props }: InputProps) => {
  return (
    <div className="form-group">
      <span>{label}</span>
      <input className="form-field" {...props}/>
    </div>
  );
};

export default InputText;
