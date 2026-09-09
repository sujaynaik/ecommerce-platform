import { OrderService } from "./order.service.js";
export class OrderController {
    service;
    constructor(service = new OrderService()) {
        this.service = service;
    }
    async getAll(_req, res) {
        res.json(await this.service.getAll());
    }
    async create(req, res) {
        try {
            res.status(201).json(await this.service.create(req.body));
        }
        catch (error) {
            res.status(400).json({
                message: error instanceof Error ? error.message : "Invalid order",
            });
        }
    }
    async updateStatus(req, res) {
        try {
            const id = Array.isArray(req.params.id)
                ? req.params.id[0]
                : req.params.id;
            res.json(await this.service.updateStatus(id, req.body.status));
        }
        catch (error) {
            res.status(400).json({
                message: error instanceof Error ? error.message : "Invalid order",
            });
        }
    }
}
