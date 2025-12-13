import type { HTMLAttributes, ReactNode } from "react";
import "./Button.css";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode; // children optional bo‘lsa ?
}

function Button({ children, className, ...rest }: Props) {
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}
export default Button;
