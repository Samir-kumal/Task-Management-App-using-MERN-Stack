import React, { memo, useCallback } from "react";

interface ButtonProps {
  children: React.ReactNode;
  style?: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
}

const Button = memo(
  ({ children, style, onClick, type, disabled }: ButtonProps) => {

    const handleClick = useCallback(() => {
      if (onClick) {
        onClick();
      }
    }, [onClick]);
    return (
      <button
        type={type}
        disabled={disabled}
        onClick={handleClick}
        className={`  p-2  ${style}`}
      >
        {children}
      </button>
    );
  }
);

export default Button;
