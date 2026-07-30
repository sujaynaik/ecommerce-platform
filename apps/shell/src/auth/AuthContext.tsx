import { createContext } from "react";
import type { AuthState, User } from "./types";

export interface AuthContextValue extends AuthState {
  login: (user: User) => void;
  logout: () => void;
  initialize: () => Promise<void>;
}

export const AuthContext =
  createContext<AuthContextValue | null>(null);