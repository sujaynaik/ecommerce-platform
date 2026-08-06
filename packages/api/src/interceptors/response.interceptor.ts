import { AxiosError, InternalAxiosRequestConfig } from "axios";

import { api } from "../client/api";

interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export function registerResponseInterceptor() {
    api.interceptors.response.use((response) => response, async (error: AxiosError) => {
        const originalRequest = error.config as RetryRequestConfig;
        if (
            error.response?.status !== 401 ||
            !originalRequest
        ) {
            return Promise.reject(error);
        }

        // Skip Refresh Endpoint
        if (originalRequest.url?.includes("/auth/refresh")) {
            return Promise.reject(error);
        }

        // every request to be retried only once
        if (originalRequest._retry) {
            return Promise.reject(error);
        }
        return Promise.reject(error);
    });
}