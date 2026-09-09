import { ProductService, ProductServiceError } from "./product.service.js";
export class ProductController {
    service;
    constructor(service = new ProductService()) {
        this.service = service;
    }
    async getAll(req, res) {
        res.json(await this.service.getAll());
    }
    async getById(req, res) {
        const id = this.getId(req);
        const product = await this.service.getById(id);
        if (!product) {
            return res.sendStatus(404);
        }
        res.json(product);
    }
    async create(req, res) {
        try {
            const product = await this.service.create(req.body);
            res.status(201).json(product);
        }
        catch (error) {
            this.handleError(error, res);
        }
    }
    async update(req, res) {
        try {
            const product = await this.service.update(this.getId(req), req.body);
            res.json(product);
        }
        catch (error) {
            this.handleError(error, res);
        }
    }
    async delete(req, res) {
        try {
            await this.service.delete(this.getId(req));
            res.sendStatus(204);
        }
        catch (error) {
            this.handleError(error, res);
        }
    }
    getId(req) {
        const { id } = req.params;
        return Array.isArray(id) ? id[0] : id;
    }
    handleError(error, res) {
        if (error instanceof ProductServiceError) {
            res.status(error.statusCode).json({ message: error.message });
            return;
        }
        res.sendStatus(500);
    }
}
