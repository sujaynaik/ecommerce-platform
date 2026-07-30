import { useNavigate } from "react-router-dom";

import { useAuth } from "../../auth/useAuth";
import { Button, FormField, Heading, Text } from "@commerce/ui";
import styles from "./LoginPage.module.css";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (
    e: React.SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    login({
      id: "1",
      name: "John Doe",
      email: "john@example.com",
    });

    navigate("/dashboard");
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
            inputProps={{
              type: "email",
              placeholder: "john@example.com",
            }}
          />

          <FormField
            id="password"
            label="Password"
            inputProps={{
              type: "password",
              placeholder: "••••••••",
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