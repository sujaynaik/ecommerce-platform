import { apiClient } from "./client";
import { tokenService } from "../token.service";

export function setupInterceptors() {
  apiClient.interceptors.request.use((config) => {
    const token = tokenService.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            tokenService.clear();
        }
        return Promise.reject(error);
    }
  );
}