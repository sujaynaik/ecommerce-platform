import "dotenv/config";
import { Pool } from "pg";

import { config } from "../config.js";

export const pool = new Pool({
  connectionString: config.databaseUrl,
  max: config.databasePoolMax,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
  ssl:
    config.nodeEnv === "production" ? { rejectUnauthorized: false } : undefined,
});

export async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY, name TEXT NOT NULL, sku TEXT NOT NULL UNIQUE,
      price NUMERIC(12, 2) NOT NULL CHECK (price >= 0), stock INTEGER NOT NULL CHECK (stock >= 0),
      status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY, customer_name TEXT NOT NULL, customer_email TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PAID', 'SHIPPED', 'CANCELLED')),
      total NUMERIC(12, 2) NOT NULL CHECK (total >= 0), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS order_items (
      order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      product_id TEXT NOT NULL REFERENCES products(id), product_name TEXT NOT NULL,
      quantity INTEGER NOT NULL CHECK (quantity > 0), unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
      PRIMARY KEY (order_id, product_id)
    );
    INSERT INTO products (id, name, sku, price, stock) VALUES
      ('1', 'MacBook Pro', 'MBP-001', 2499, 12), ('2', 'Magic Mouse', 'MM-002', 99, 45), ('3', 'Mechanical Keyboard', 'KB-003', 129, 20)
    ON CONFLICT (id) DO NOTHING;
  `);
}

export async function closeDatabase() {
  await pool.end();
}
