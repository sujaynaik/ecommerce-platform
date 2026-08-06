import React from "react";
import styles from "./Input.module.css";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ error = false, className, ...rest }: InputProps) {
  const classes = [styles.input, error && styles.error, className]
    .filter(Boolean)
    .join(" ");

  return <input className={classes} {...rest} />;
}
