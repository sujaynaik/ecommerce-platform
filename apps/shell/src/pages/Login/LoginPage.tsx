import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormField, Heading, Text } from "@commerce/ui";

import styles from "./LoginPage.module.css";
import { useAuth } from "../../auth/useAuth";
import { authService } from "../../services/auth.service";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setError("");

      const response = await authService.login({
        email,
        password,
      });

      login(response.user);

      navigate("/dashboard");

    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <Heading level={1} className={styles.title}>
          Welcome Back
        </Heading>

        <Text variant="body-sm" className={styles.subtitle}>
          Sign in to continue
        </Text>

        <form 
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <FormField
            id="email"
            label="Email"
            error={error}
            inputProps={{
              type: "email",
              value: email,
              placeholder: "admin@commerce.com",
              onChange: (e) => setEmail(e.target.value),
            }}
          />

          <FormField
            id="password"
            label="Password"
            error={error}
            inputProps={{
              type: "password",
              value: password,
              placeholder: "admin123",
              onChange: (e) => setPassword(e.target.value),
            }}
          />

          <Button type="submit">
            Sign In
          </Button>
        </form>
      </section>
    </main>
  );
}