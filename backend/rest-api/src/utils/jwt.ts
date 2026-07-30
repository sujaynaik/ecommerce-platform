import jwt, { Secret, SignOptions } from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
}

export function generateAccessToken(
  payload: JwtPayload
) {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET! as Secret,
    {
      expiresIn: (process.env.JWT_EXPIRES_IN ?? "15m") as SignOptions["expiresIn"],
    }
  );
}