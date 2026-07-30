import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController {

  login(req: Request, res: Response) {

    try {

      const response = authService.login(req.body);

      return res.json(response);

    } catch {

      return res.status(401).json({
        message: "Invalid email or password",
      });

    }

  }

}