import { api } from "../client/api";
import { Product, CreateProductRequest, UpdateProductRequest } from "./types";

class ProductsApi {
  async getAll() {
    const { data } = await api.get<Product[]>("/products");

    return data;
  }

  async getById(id: string) {
    const { data } = await api.get<Product>(`/products/${id}`);

    return data;
  }

  async create(request: CreateProductRequest) {
    const { data } = await api.post<Product>("/products", request);

    return data;
  }

  async update(id: string, request: UpdateProductRequest) {
    const { data } = await api.put<Product>(`/products/${id}`, request);

    return data;
  }

  async delete(id: string) {
    await api.delete(`/products/${id}`);
  }
}

export const productsApi = new ProductsApi();
