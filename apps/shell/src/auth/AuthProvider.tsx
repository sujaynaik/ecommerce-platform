import { useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "./types";

interface Props {
  children: React.ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,

      login: (user: User) => setUser(user),

      logout: () => setUser(null),
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}