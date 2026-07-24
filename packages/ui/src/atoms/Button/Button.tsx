import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

export function Button({
  children,
  variant = "primary",
  onClick
}: ButtonProps) {

  return (
    <button
      data-variant={variant}
      onClick={onClick}
    >
      {children}
    </button>
  );
}