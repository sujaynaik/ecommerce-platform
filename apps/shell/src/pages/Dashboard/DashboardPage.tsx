import { Button, Heading, Text } from "@commerce/ui";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { useEffect } from "react";
import { authApi } from "@commerce/api";

export function DashboardPage() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  useEffect(() => {
    async function api() {
      const response = await authApi.me();
      console.log(response);
    }
    api();
  }, []);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function handleProducts() {
    navigate("/products");
  }

  return (
    <>
      <Heading level={1}>Dashboard</Heading>

      <Text>Welcome {user?.name}</Text>

      <Button onClick={handleProducts}>Go to Products</Button>

      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
}
