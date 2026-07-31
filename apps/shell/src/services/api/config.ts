import { ENV } from "../../config/env";

export const API_CONFIG = {
  BASE_URL: ENV.API_BASE_URL,
  TIMEOUT: 10000,
} as const;