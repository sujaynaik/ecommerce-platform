import React from "react";
import styles from "./Heading.module.css";

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Heading({
  level = 1,
  className,
  children,
  ...rest
}: HeadingProps) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

  const classes = [
    styles.heading,
    styles[`h${level}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}