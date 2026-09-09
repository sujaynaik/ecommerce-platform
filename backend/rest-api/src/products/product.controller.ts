import { Request, Response } from "express";
import { ProductService, ProductServiceError } from "./product.service.js";

export class ProductController {
  constructor(private readonly service = new ProductService()) {}

  async getAll(req: Request, res: Response) {
    res.json(await this.service.getAll());
  }

  async getById(req: Request, res: Response) {
    const id = this.getId(req);
    const product = await this.service.getById(id);

    if (!product) {
      return res.sendStatus(404);
    }

    res.json(product);
  }

  async create(req: Request, res: Response) {
    try {
      const product = await this.service.create(req.body);

      res.status(201).json(product);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const product = await this.service.update(this.getId(req), req.body);

      res.json(product);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.service.delete(this.getId(req));

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
