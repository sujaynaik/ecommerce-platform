import { User } from "src/auth/types";
import { api } from "./api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;

  user: {
    id: string;
    name: string;
    email: string;
  };
}

export class AuthService {
  async login(
    request: LoginRequest
  ): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>(
        "/auth/login",
        request
      );

    return data;
  }

  async me() {
    const { data } = await api.get<User>("/auth/me");
    return data;
  }
}

export const authService = new AuthService();