import jwt, { Secret, SignOptions } from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
}

const JWT_EXPIRES_IN = process.env.ACCESS_EXPIRES_IN || "15m";
const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN || "7d";

export function generateAccessToken(
  payload: JwtPayload
) {
  console.log('generateAccessToken', process.env.JWT_ACCESS_SECRET! as Secret);
  
  return jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET! as Secret,
    {
      expiresIn: JWT_EXPIRES_IN as SignOptions["expiresIn"],
    }
  );
}

export function generateRefreshToken(
  payload: JwtPayload
) {
  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET!,
    {
      expiresIn: REFRESH_EXPIRES_IN as SignOptions["expiresIn"],
    }
  );
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
};