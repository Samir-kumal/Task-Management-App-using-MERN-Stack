import React,{memo} from "react";

interface ButtonProps {
  children: React.ReactNode;
  style?: string;
  onClick?: () => void;
  type?:"submit" | "reset" | "button"
  disabled?:boolean
}

const Button = ({ children, style, onClick, type,disabled }: ButtonProps) => {
  return (
    <button type={type} disabled={disabled}
      onClick={onClick}
      className={`  p-2  ${style}`}
    >
      {children}
    </button>
  );
};

export default memo(Button);
