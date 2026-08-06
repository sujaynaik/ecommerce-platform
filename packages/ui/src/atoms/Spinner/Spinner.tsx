import React from "react";
import styles from "./Spinner.module.css";

export interface SpinnerProps extends React.ComponentPropsWithoutRef<"div"> {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "neutral";
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  variant = "primary",
  className = "",
  ...restProps
}) => {
  const classes = `
    ${styles.spinner} 
    ${styles[`spinner--${size}`]} 
    ${styles[`spinner--${variant}`]} 
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <div
      className={styles.spinnerContainer}
      role="status"
      aria-label="loading"
      {...restProps}
    >
      <div className={classes} />
    </div>
  );
};
