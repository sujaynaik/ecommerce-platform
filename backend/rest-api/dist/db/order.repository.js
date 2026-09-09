import { pool } from "./database.js";
export const orderRepository = {
    async create(request) {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            const products = await client.query("SELECT id, name, price FROM products WHERE id = ANY($1) AND status = 'ACTIVE' FOR SHARE", [request.items.map((item) => item.productId)]);
            const productMap = new Map(products.rows.map((product) => [product.id, product]));
            const items = request.items.map((item) => {
                const product = productMap.get(item.productId);
                if (!product || !Number.isInteger(item.quantity) || item.quantity < 1)
                    throw new Error("Order contains an invalid product or quantity");
                return {
                    productId: product.id,
                    productName: product.name,
                    quantity: item.quantity,
                    unitPrice: Number(product.price),
                };
            });
            if (!items.length)
                throw new Error("At least one item is required");
            const order = {
                id: crypto.randomUUID(),
                customerName: request.customerName.trim(),
                customerEmail: request.customerEmail.trim(),
                status: "PENDING",
                total: items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0),
                createdAt: new Date().toISOString(),
                items,
            };
            await client.query("INSERT INTO orders (id, customer_name, customer_email, status, total, created_at) VALUES ($1, $2, $3, $4, $5, $6)", [
                order.id,
                order.customerName,
                order.customerEmail,
                order.status,
                order.total,
                order.createdAt,
            ]);
            for (const item of items)
                await client.query("INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price) VALUES ($1, $2, $3, $4, $5)", [
                    order.id,
                    item.productId,
                    item.productName,
                    item.quantity,
                    item.unitPrice,
                ]);
            await client.query("COMMIT");
            return order;
        }
        catch (error) {
            await client.query("ROLLBACK");
            throw error;
        }
        finally {
            client.release();
        }
    },
    async getAll() {
        const orders = await pool.query("SELECT id, customer_name, customer_email, status, total, created_at FROM orders ORDER BY created_at DESC");
        const items = orders.rows.length
            ? await pool.query("SELECT order_id, product_id, product_name, quantity, unit_price FROM order_items WHERE order_id = ANY($1)", [orders.rows.map((order) => order.id)])
            : { rows: [] };
        return orders.rows.map((order) => ({
            id: order.id,
            customerName: order.customer_name,
            customerEmail: order.customer_email,
            status: order.status,
            total: Number(order.total),
            createdAt: new Date(order.created_at).toISOString(),
            items: items.rows
                .filter((item) => item.order_id === order.id)
                .map((item) => ({
                productId: item.product_id,
                productName: item.product_name,
                quantity: item.quantity,
                unitPrice: Number(item.unit_price),
            })),
        }));
    },
    async updateStatus(id, status) {
        const result = await pool.query("UPDATE orders SET status = $1 WHERE id = $2 RETURNING id", [status, id]);
        return result.rowCount === 1;
    },
};
