import React, { memo } from "react";
import "./button.scss";

interface IProps {
  iconClass?: string;
  className?: string;
  children?: string | JSX.Element;
  onClick: () => void;
}

const Button = ({ iconClass, className, children, onClick }: IProps) => {
  return (
    <button className={`btn + ${className ? className : ""} btn-title`} onClick={onClick}>
      {iconClass && <i className={`icon ${iconClass ? iconClass : ""}`}></i>}
      {children}
    </button>
  );
};
export default memo(Button);
