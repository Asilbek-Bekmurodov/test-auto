import type { HTMLAttributes, ReactNode } from "react";
import "./Button.css"

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;  // children optional bo‘lsa ?
}

function Button({ children, className, ...rest } :Props) {
  return (
    <div className={className} {...rest}>{children}</div>
  )
}
export default Button