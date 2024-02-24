import React, { memo } from "react";

interface ErrorTextComponentProps {
  touched: boolean | undefined;
  errors: string | undefined;
  align?: string;
}

const ErrorTextComponent: React.FC<ErrorTextComponentProps> = memo(
  ({ touched, errors, align }) => {
    return (
      <p
        className={`text-xs text-red-500 ${
          align === "center" ? "text-center" : "text-left"
        } w-full  h-2 -translate-y-3`}
      >
        {touched && errors && errors}
      </p>
    );
  }
);

export default ErrorTextComponent;
