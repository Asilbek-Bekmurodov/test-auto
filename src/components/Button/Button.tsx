import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

function Button({ children, className, ...rest }: Props) {
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}

export default Button;
