import styles from "./Badge.module.css";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "success" | "warning" | "danger";
}

export function Badge({ tone = "neutral", className, ...rest }: BadgeProps) {
  return (
    <span
      className={[styles.badge, styles[tone], className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    />
  );
}
