import { pool } from "./database.js";
const mapProduct = (row) => ({
    ...row,
    price: Number(row.price),
});
export const productRepository = {
    async getAll() {
        const result = await pool.query("SELECT id, name, sku, price, stock, status FROM products ORDER BY created_at DESC");
        return result.rows.map(mapProduct);
    },
    async getById(id) {
        const result = await pool.query("SELECT id, name, sku, price, stock, status FROM products WHERE id = $1", [id]);
        return result.rows[0] ? mapProduct(result.rows[0]) : undefined;
    },
    async create(product) {
        const result = await pool.query("INSERT INTO products (id, name, sku, price, stock, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, sku, price, stock, status", [
            crypto.randomUUID(),
            product.name.trim(),
            product.sku.trim(),
            product.price,
            product.stock,
            product.status ?? "ACTIVE",
        ]);
        return mapProduct(result.rows[0]);
    },
    async update(id, changes) {
        const current = await this.getById(id);
        if (!current)
            return undefined;
        const next = { ...current, ...changes };
        const result = await pool.query("UPDATE products SET name = $1, sku = $2, price = $3, stock = $4, status = $5, updated_at = NOW() WHERE id = $6 RETURNING id, name, sku, price, stock, status", [
            next.name.trim(),
            next.sku.trim(),
            next.price,
            next.stock,
            next.status,
            id,
        ]);
        return mapProduct(result.rows[0]);
    },
    async delete(id) {
        const result = await pool.query("DELETE FROM products WHERE id = $1", [id]);
        return result.rowCount === 1;
    },
};
