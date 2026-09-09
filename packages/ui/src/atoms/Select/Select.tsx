import React from "react";
import styles from "./Select.module.css";

export function Select({
  className,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={[styles.select, className].filter(Boolean).join(" ")}
      {...rest}
    />
  );
}
