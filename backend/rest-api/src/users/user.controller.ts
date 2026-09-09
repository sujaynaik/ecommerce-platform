import { Request, Response } from "express";
import { UserService } from "./user.service.js";

export class UserController {
  constructor(private readonly service = new UserService()) {}

  getAll(_req: Request, res: Response) {
    res.json(this.service.getAll());
  }
}
