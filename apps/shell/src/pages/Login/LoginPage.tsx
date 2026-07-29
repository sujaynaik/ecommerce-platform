import { Button, FormField, Heading, Text } from "@commerce/ui";
import styles from "./LoginPage.module.css";

export function LoginPage() {
  return (
    <main className={styles.container}>
      <section className={styles.card}>
       <Heading level={1} className={styles.title}>
          Welcome Back
        </Heading>

        <Text variant="body-sm" className={styles.subtitle}>
          Sign in to continue
        </Text>

        <form className={styles.form}>
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