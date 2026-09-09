export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  status: "ACTIVE" | "INACTIVE";
}

export interface CreateProductRequest {
  name: string;
  sku: string;
  price: number;
  stock: number;
  status?: "ACTIVE" | "INACTIVE";
}

export interface UpdateProductRequest {
  name?: string;
  sku?: string;
  price?: number;
  stock?: number;
  status?: "ACTIVE" | "INACTIVE";
}
