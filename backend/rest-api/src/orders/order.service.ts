import { CreateOrderRequest, Order, OrderStatus } from "@commerce/api";
import { products } from "../products/products.data.js";

const orders: Order[] = [
  {
    id: "ord-1001",
    customerName: "Ava Thompson",
    customerEmail: "ava@example.com",
    status: "PAID",
    total: 2598,
    createdAt: "2026-08-28T10:30:00.000Z",
    items: [
      {
        productId: "1",
        productName: "MacBook Pro",
        quantity: 1,
        unitPrice: 2499,
      },
      {
        productId: "2",
        productName: "Magic Mouse",
        quantity: 1,
        unitPrice: 99,
      },
    ],
  },
];

export class OrderService {
  getAll() {
    return orders;
  }

  create(request: CreateOrderRequest) {
    if (
      !request.customerName?.trim() ||
      !request.customerEmail?.includes("@")
    ) {
      throw new Error("A valid customer name and email are required");
    }

    const items = request.items.map((item) => {
      const product = products.find(
        (candidate) => candidate.id === item.productId,
      );
      if (!product || !Number.isInteger(item.quantity) || item.quantity < 1) {
        throw new Error("Order contains an invalid product or quantity");
      }
      return {
        productId: product.id,
        productName: product.name,
        quantity: item.quantity,
        unitPrice: product.price,
      };
    });

    if (!items.length) throw new Error("At least one item is required");

    const order: Order = {
      id: crypto.randomUUID(),
      customerName: request.customerName.trim(),
      customerEmail: request.customerEmail.trim(),
      status: "PENDING",
      total: items.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0,
      ),
      createdAt: new Date().toISOString(),
      items,
    };

    orders.unshift(order);
    return order;
  }

  updateStatus(id: string, status: OrderStatus) {
    const order = orders.find((candidate) => candidate.id === id);
    if (!order) throw new Error("Order not found");
    if (!["PENDING", "PAID", "SHIPPED", "CANCELLED"].includes(status)) {
      throw new Error("Invalid order status");
    }
    order.status = status;
    return order;
  }
}
