import { CreateOrderRequest, OrderStatus } from "@commerce/api";
import { orderRepository } from "../db/order.repository.js";

export class OrderService {
  getAll() {
    return orderRepository.getAll();
  }

  async create(request: CreateOrderRequest) {
    if (
      !request.customerName?.trim() ||
      !request.customerEmail?.includes("@")
    ) {
      throw new Error("A valid customer name and email are required");
    }
    return orderRepository.create(request);
  }

  async updateStatus(id: string, status: OrderStatus) {
    if (!["PENDING", "PAID", "SHIPPED", "CANCELLED"].includes(status)) {
      throw new Error("Invalid order status");
    }
    if (!(await orderRepository.updateStatus(id, status)))
      throw new Error("Order not found");
    const orders = await orderRepository.getAll();
    return orders.find((order) => order.id === id);
  }
}
