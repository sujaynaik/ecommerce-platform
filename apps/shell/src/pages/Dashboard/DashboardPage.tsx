import { Button, Heading, Text } from "@commerce/ui";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { useEffect } from "react";
import { authService } from "src/services/auth.service";

export function DashboardPage() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  useEffect(() => {
    async function api() {
      const response = await authService.me();
      console.log(response);
    }
    api()
  }, [])

  return (
    <>
      <Heading level={1}>
        Dashboard
      </Heading>

      <Text>
        Welcome {user?.name}
      </Text>

      <Button onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
}