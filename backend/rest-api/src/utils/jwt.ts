import jwt, { Secret, SignOptions } from "jsonwebtoken";

import { config } from "../config.js";

interface JwtPayload {
  id: string;
  email: string;
}

export function generateAccessToken(payload: JwtPayload) {
  return jwt.sign(payload, config.jwtAccessSecret as Secret, {
    expiresIn: config.accessExpiresIn as SignOptions["expiresIn"],
  });
}

export function generateRefreshToken(payload: JwtPayload) {
  return jwt.sign(payload, config.jwtRefreshSecret, {
    expiresIn: config.refreshExpiresIn as SignOptions["expiresIn"],
  });
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwtAccessSecret);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, config.jwtRefreshSecret);
};
