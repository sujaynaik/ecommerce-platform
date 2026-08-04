import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "./types";
import { tokenService } from "src/services/token.service";
import { authService } from "src/services/auth.service";

interface Props {
  children: React.ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(false);

  const initialize = async () => {
    try {
      if (!tokenService.getAccessToken()) {
        return;
      }
      setLoading(true);
      const user = await authService.me();
      setUser(user);
    } catch {
      tokenService.clear();
      setUser(null);
    } finally {
      setLoading(false);
    }
};

  const value = useMemo(() => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      initialize,
      login: (user: User) => setUser(user),
      logout: () => {
        tokenService.clear();
        setUser(null)
      },
    }),
    [user, isLoading]
  );

  useEffect(() => {
    initialize();
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}