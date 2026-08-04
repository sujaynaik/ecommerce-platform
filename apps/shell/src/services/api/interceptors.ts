import { apiClient } from "./client";
import { tokenService } from "../token.service";
import { authService } from "../auth.service";

export function setupInterceptors() {
  apiClient.interceptors.request.use((config) => {
    const token = tokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  apiClient.interceptors.response.use(
    response => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status !== 401) {
        return Promise.reject(error);
      }

      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      const refreshToken = tokenService.getRefreshToken();
      if (!refreshToken) {
        tokenService.clear();
        return Promise.reject(error);
      }

      const response = await authService.refresh(refreshToken);
      tokenService.setAccessToken(
          response.accessToken
      );

      originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;

      return apiClient(originalRequest);
    }
  );
}