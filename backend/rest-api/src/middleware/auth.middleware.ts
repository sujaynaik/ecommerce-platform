import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;

  if (!auth) return res.sendStatus(401);

  const token = auth.replace("Bearer ", "");
  // console.log("Authorization Header:", auth);
  // console.log("Extracted Token:", token);

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);

    req.user = payload as {
      id: string;
      email: string;
    };

    next();
  } catch (e) {
    console.error("token error: ", e);

    return res.sendStatus(401);
  }
}
