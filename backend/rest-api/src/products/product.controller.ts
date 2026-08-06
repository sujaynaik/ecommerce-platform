import { Request, Response } from "express";
import { ProductService } from "./product.service";

export class ProductController {
  constructor(private readonly service = new ProductService()) {}

  getAll(req: Request, res: Response) {
    res.json(this.service.getAll());
  }

  getById(req: Request, res: Response) {
    const product = this.service.getById(req.params.id);

    if (!product) {
      return res.sendStatus(404);
    }

    res.json(product);
  }
}
