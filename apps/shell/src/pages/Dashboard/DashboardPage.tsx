import { Button, Heading, Text } from "@commerce/ui";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

export function DashboardPage() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

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