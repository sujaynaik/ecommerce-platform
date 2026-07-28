import React from "react";
import styles from "./Text.module.css";

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "body-md" | "body-sm" | "caption";
}

export function Text({
  variant = "body-md",
  className,
  children,
  ...rest
}: TextProps) {
  const classes = [
    styles.text,
    styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <p className={classes} {...rest}>
      {children}
    </p>
  );
}