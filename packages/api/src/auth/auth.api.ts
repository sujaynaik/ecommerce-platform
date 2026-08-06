import { api } from "../client/api";
import { LoginRequest, LoginResponse, User } from "./types";

class AuthApi {
  async login(request: LoginRequest) {
    const { data } = await api.post<LoginResponse>("/auth/login", request);

    return data;
  }

  async me() {
    const { data } = await api.get<User>("/auth/me");

    return data;
  }

  async refresh(refreshToken: string) {
    const { data } = await api.post("/auth/refresh", {
      refreshToken,
    });

    return data;
  }
}

export const authApi = new AuthApi();
