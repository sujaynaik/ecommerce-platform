import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { generateAccessToken } from "../utils/jwt";

const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const response = await authService.login(req.body);
      return res.json(response);
    } catch {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
  }

  async refreshToken(req: Request, res: Response) {
  try {
      const response = await authService.refreshToken({
        refreshToken: req.body.refreshToken,
      });

      res.json(response);
    } catch (error) {
      res.status(401).json({
        message: "Invalid refresh token",
      });
    }
  }

  me(req: Request, res: Response) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      console.log("No bearer token");
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("Extracted token:", token);
    
    res.json({
        id: req.user!.id,
        name:"Commerce Admin",
        email: req.user!.email
    });
  }
}