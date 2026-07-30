import axios from "axios";

import { tokenService } from "./token.service";

export const api = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {

    const token = tokenService.get();

    if (token) {
        config.headers.Authorization =
            `Bearer ${token}`;
    }

    return config;
});