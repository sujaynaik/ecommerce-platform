import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "./types";
import { on, tokenService } from "@commerce/api";
import { authApi } from "@commerce/api";

interface Props {
  children: React.ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);

  const initialize = async () => {
    try {
      if (!tokenService.getAccessToken()) {
        return;
      }
      setLoading(true);
      const user = await authApi.me();
      setUser(user);
    } catch {
      tokenService.clear();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    tokenService.clear();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      initialize,
      login: (user: User) => setUser(user),
      logout,
    }),
    [user, isLoading],
  );

  useEffect(() => {
    initialize();

    const unsubscribe = on("unauthorized", () => {
      console.log("Event emitted: unauthorized");

      logout();
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
