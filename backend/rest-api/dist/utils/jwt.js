import jwt from "jsonwebtoken";
import { config } from "../config.js";
export function generateAccessToken(payload) {
    return jwt.sign(payload, config.jwtAccessSecret, {
        expiresIn: config.accessExpiresIn,
    });
}
export function generateRefreshToken(payload) {
    return jwt.sign(payload, config.jwtRefreshSecret, {
        expiresIn: config.refreshExpiresIn,
    });
}
export const verifyToken = (token) => {
    return jwt.verify(token, config.jwtAccessSecret);
};
export const verifyRefreshToken = (token) => {
    return jwt.verify(token, config.jwtRefreshSecret);
};
