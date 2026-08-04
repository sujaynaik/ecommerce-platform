import { User } from "src/auth/types";
import { apiClient as api } from "./api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User
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

  async refresh(refreshToken: string) {
    const response = await api.post("/auth/refresh", {
      refreshToken
    })
    return response.data
  }
}

export const authService = new AuthService();