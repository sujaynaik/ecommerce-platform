import { Request, Response } from "express";
import { OrderService } from "./order.service.js";

export class OrderController {
  constructor(private readonly service = new OrderService()) {}

  async getAll(_req: Request, res: Response) {
    res.json(await this.service.getAll());
  }

  async create(req: Request, res: Response) {
    try {
      res.status(201).json(await this.service.create(req.body));
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : "Invalid order",
      });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      res.json(await this.service.updateStatus(id, req.body.status));
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : "Invalid order",
      });
    }
  }
}
