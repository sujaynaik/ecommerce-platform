import { Request, Response } from "express";
import { ProductService, ProductServiceError } from "./product.service.js";

export class ProductController {
  constructor(private readonly service = new ProductService()) {}

  getAll(req: Request, res: Response) {
    res.json(this.service.getAll());
  }

  getById(req: Request, res: Response) {
    const id = this.getId(req);
    const product = this.service.getById(id);

    if (!product) {
      return res.sendStatus(404);
    }

    res.json(product);
  }

  create(req: Request, res: Response) {
    try {
      const product = this.service.create(req.body);

      res.status(201).json(product);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  update(req: Request, res: Response) {
    try {
      const product = this.service.update(this.getId(req), req.body);

      res.json(product);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  delete(req: Request, res: Response) {
    try {
      this.service.delete(this.getId(req));

      res.sendStatus(204);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  private getId(req: Request) {
    const { id } = req.params;

    return Array.isArray(id) ? id[0] : id;
  }

  private handleError(error: unknown, res: Response) {
    if (error instanceof ProductServiceError) {
      res.status(error.statusCode).json({ message: error.message });
      return;
    }

    res.sendStatus(500);
  }
}
