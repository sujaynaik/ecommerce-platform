import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { Spinner } from "@commerce/ui";

interface PublicRouteProps {
  children: React.ReactNode;
}

export function PublicRoute({
  children,
}: PublicRouteProps) {
  const {
    isAuthenticated,
    isLoading,
  } = useAuth();
  if (isLoading) {
    return <Spinner />;
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
}