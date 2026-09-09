import { api } from "../client/api";
import { CreateOrderRequest, Order, OrderStatus } from "./types";

export const ordersApi = {
  async getAll() {
    const { data } = await api.get<Order[]>("/orders");
    return data;
  },
  async create(request: CreateOrderRequest) {
    const { data } = await api.post<Order>("/orders", request);
    return data;
  },
  async updateStatus(id: string, status: OrderStatus) {
    const { data } = await api.patch<Order>(`/orders/${id}/status`, { status });
    return data;
  },
};
