import { config as loadEnv } from "dotenv";
import { resolve } from "node:path";
loadEnv();
loadEnv({ path: resolve(process.cwd(), "../../.env"), override: false });
function required(name) {
    const value = process.env[name]?.trim();
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}
function positiveInteger(name, fallback) {
    const value = process.env[name];
    const parsed = value === undefined ? fallback : Number(value);
    if (!Number.isInteger(parsed) || parsed <= 0) {
        throw new Error(`${name} must be a positive integer`);
    }
    return parsed;
}
const corsOrigins = (process.env.CORS_ORIGINS ?? process.env.CORS_ORIGIN ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
if (corsOrigins.length === 0) {
    throw new Error("CORS_ORIGINS must contain at least one allowed origin");
}
export const config = {
    nodeEnv: process.env.NODE_ENV ?? "development",
    port: positiveInteger("PORT", 4000),
    databaseUrl: required("DATABASE_URL"),
    databasePoolMax: positiveInteger("DATABASE_POOL_MAX", 10),
    jwtAccessSecret: required("JWT_ACCESS_SECRET"),
    jwtRefreshSecret: required("JWT_REFRESH_SECRET"),
    accessExpiresIn: process.env.ACCESS_EXPIRES_IN ?? "15m",
    refreshExpiresIn: process.env.REFRESH_EXPIRES_IN ?? "7d",
    corsOrigins,
};
