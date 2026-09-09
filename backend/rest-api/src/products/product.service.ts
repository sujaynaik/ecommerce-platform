import {
  CreateProductRequest,
  Product,
  UpdateProductRequest,
} from "@commerce/api";
import { products } from "./products.data.js";

export class ProductServiceError extends Error {
  constructor(
    message: string,
    public readonly statusCode: 400 | 404 | 409,
  ) {
    super(message);
  }
}

export class ProductService {
  getAll() {
    return products;
  }

  getById(id: string) {
    return products.find((p) => p.id === id);
  }

  create(product: CreateProductRequest): Product {
    this.validate(product);

    if (products.some((item) => item.sku === product.sku.trim())) {
      throw new ProductServiceError("SKU already exists", 409);
    }

    const newProduct: Product = {
      id: crypto.randomUUID(),
      ...product,
      name: product.name.trim(),
      sku: product.sku.trim(),
      status: product.status ?? "ACTIVE",
    };

    products.push(newProduct);

    return newProduct;
  }

  update(id: string, changes: UpdateProductRequest): Product {
    const product = this.getById(id);

    if (!product) {
      throw new ProductServiceError("Product not found", 404);
    }

    const updated = { ...product, ...changes };
    this.validate(updated);

    if (
      products.some((item) => item.id !== id && item.sku === updated.sku.trim())
    ) {
      throw new ProductServiceError("SKU already exists", 409);
    }

    Object.assign(product, {
      ...updated,
      name: updated.name.trim(),
      sku: updated.sku.trim(),
    });

    return product;
  }

  delete(id: string) {
    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
      throw new ProductServiceError("Product not found", 404);
    }

    products.splice(index, 1);
  }

  private validate(product: CreateProductRequest | Product) {
    if (!product || typeof product.name !== "string" || !product.name.trim()) {
      throw new ProductServiceError("Name is required", 400);
    }

    if (
      !product.sku ||
      typeof product.sku !== "string" ||
      !product.sku.trim()
    ) {
      throw new ProductServiceError("SKU is required", 400);
    }

    if (
      typeof product.price !== "number" ||
      !Number.isFinite(product.price) ||
      product.price < 0
    ) {
      throw new ProductServiceError("Price must be a non-negative number", 400);
    }

    if (
      typeof product.stock !== "number" ||
      !Number.isInteger(product.stock) ||
      product.stock < 0
    ) {
      throw new ProductServiceError(
        "Stock must be a non-negative integer",
        400,
      );
    }

    if (product.status && !["ACTIVE", "INACTIVE"].includes(product.status)) {
      throw new ProductServiceError("Status is invalid", 400);
    }
  }
}
