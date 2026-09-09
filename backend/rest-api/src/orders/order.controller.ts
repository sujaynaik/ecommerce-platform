import { Request, Response } from "express";
import { OrderService } from "./order.service.js";

export class OrderController {
  constructor(private readonly service = new OrderService()) {}

  getAll(_req: Request, res: Response) {
    res.json(this.service.getAll());
  }

  create(req: Request, res: Response) {
    try {
      res.status(201).json(this.service.create(req.body));
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : "Invalid order",
      });
    }
  }

  updateStatus(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      res.json(this.service.updateStatus(id, req.body.status));
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : "Invalid order",
      });
    }
  }
}
