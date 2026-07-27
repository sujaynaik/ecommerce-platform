import styles from "./Button.module.css";

import type { ReactNode } from "react";

interface ButtonProps {
  children:ReactNode;
  variant?: "primary" | "secondary";
  onClick?:()=>void;
}

export function Button({
 children,
 variant="primary",
 onClick
} : ButtonProps){
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}