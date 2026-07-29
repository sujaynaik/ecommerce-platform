import { Input } from "../../atoms/Input";
import { Text } from "../../atoms/Text";
import styles from "./FormField.module.css";

interface FormFieldProps {
  id: string;
  label: string;

  helperText?: string;
  error?: string;

  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export function FormField({
  id,
  label,
  helperText,
  error,
  inputProps,
}: FormFieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>

      <Input
        id={id}
        error={!!error}
        {...inputProps}
      />

      {error ? (
        <Text variant="caption" className={styles.error}>
          {error}
        </Text>
      ) : helperText ? (
        <Text variant="caption" className={styles.helper}>
          {helperText}
        </Text>
      ) : null}
    </div>
  );
}