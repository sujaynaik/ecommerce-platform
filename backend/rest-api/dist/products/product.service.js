import { productRepository } from "../db/product.repository.js";
export class ProductServiceError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
export class ProductService {
    getAll() {
        return productRepository.getAll();
    }
    getById(id) {
        return productRepository.getById(id);
    }
    async create(product) {
        this.validate(product);
        try {
            return await productRepository.create(product);
        }
        catch (error) {
            this.handleConflict(error);
            throw error;
        }
    }
    async update(id, changes) {
        const current = await productRepository.getById(id);
        if (!current)
            throw new ProductServiceError("Product not found", 404);
        this.validate({ ...current, ...changes });
        try {
            const product = await productRepository.update(id, changes);
            if (!product)
                throw new ProductServiceError("Product not found", 404);
            return product;
        }
        catch (error) {
            this.handleConflict(error);
            throw error;
        }
    }
    async delete(id) {
        if (!(await productRepository.delete(id))) {
            throw new ProductServiceError("Product not found", 404);
        }
    }
    validate(product) {
        if (!product?.name?.trim())
            throw new ProductServiceError("Name is required", 400);
        if (!product?.sku?.trim())
            throw new ProductServiceError("SKU is required", 400);
        if (typeof product.price !== "number" ||
            !Number.isFinite(product.price) ||
            product.price < 0) {
            throw new ProductServiceError("Price must be a non-negative number", 400);
        }
        if (!Number.isInteger(product.stock) || product.stock < 0) {
            throw new ProductServiceError("Stock must be a non-negative integer", 400);
        }
        if (product.status && !["ACTIVE", "INACTIVE"].includes(product.status)) {
            throw new ProductServiceError("Status is invalid", 400);
        }
    }
    handleConflict(error) {
        if (error &&
            typeof error === "object" &&
            "code" in error &&
            error.code === "23505") {
            throw new ProductServiceError("SKU already exists", 409);
        }
    }
}
