import { api, tokenService } from "@commerce/api";
import { authService } from "../auth.service";

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

export function setupInterceptors() {
  api.interceptors.request.use((config) => {
    const token = tokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    response => response,
    async (error) => {
      const originalRequest = error.config;

      // Don't intercept the refresh request
      if (originalRequest.url?.includes("/auth/refresh")) {
        tokenService.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

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

      try {
        if (!isRefreshing) {
            isRefreshing = true;
        }
        // const response = await authService.refresh(refreshToken);

        // tokenService.setAccessToken(
        //     response.accessToken
        // );

        refreshPromise = authService.refresh(refreshToken)
        .then((response) => {
          tokenService.setAccessToken(
              response.accessToken
          );
          return response.accessToken;
        })
        .finally(() => {
            isRefreshing = false;
            refreshPromise = null;
        });

        const accessToken = await refreshPromise!;

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (error) {
        tokenService.clear();
        window.location.href = "/login";
        // This prevents stale headers from being reused
        delete api.defaults.headers.common.Authorization;
        return Promise.reject(error);
      }
    }
  );
}