import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

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

  me(req: Request, res: Response) {
    res.json({
        id: req.user!.id,
        name:"Commerce Admin",
        email: req.user!.email
    });
  }
}