import { AxiosError, InternalAxiosRequestConfig } from "axios";

import { api } from "../client/api";
import { refreshAccessToken } from "../auth/refresh";
import { tokenService } from "../auth/token.service";
import { emit } from "../events/auth.events";

interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;

let refreshPromise: Promise<string> | null = null;

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

        // refresh token logic to fetch access token using refresh token
        originalRequest._retry = true;
        // refresh queue
        let accessToken: string;
        if (!isRefreshing) {
            isRefreshing = true;
            refreshPromise = refreshAccessToken()
                .finally(() => {
                    isRefreshing = false;
                    refreshPromise = null;
                });
        }
        try {
            accessToken = await refreshPromise!;
        } catch (error) {
            tokenService.clear();
            emit("unauthorized");
            return Promise.reject(error);
        }
        
        // Before retrying, update the failed request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        //replay the original request that failed with 401
        return api(originalRequest);
    });
}