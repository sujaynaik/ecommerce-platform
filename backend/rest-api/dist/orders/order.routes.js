import { Router } from "express";
import { OrderController } from "./order.controller.js";
const router = Router();
const controller = new OrderController();
router.get("/", controller.getAll.bind(controller));
router.post("/", controller.create.bind(controller));
router.patch("/:id/status", controller.updateStatus.bind(controller));
export default router;
