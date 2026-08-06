import { api } from "../client/api";
import { tokenService } from "../auth/token.service";

export function registerRequestInterceptor() {
  api.interceptors.request.use((config) => {
    const token = tokenService.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
}
