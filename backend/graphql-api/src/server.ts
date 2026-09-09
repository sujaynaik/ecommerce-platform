import cors from "cors";
import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";

const products = [
  {
    id: "1",
    name: "MacBook Pro",
    sku: "MBP-001",
    price: 2499,
    stock: 12,
    status: "ACTIVE",
  },
  {
    id: "2",
    name: "Magic Mouse",
    sku: "MM-002",
    price: 99,
    stock: 45,
    status: "ACTIVE",
  },
  {
    id: "3",
    name: "Mechanical Keyboard",
    sku: "KB-003",
    price: 129,
    stock: 20,
    status: "ACTIVE",
  },
];

const schema = buildSchema(`
  type Product { id: ID!, name: String!, sku: String!, price: Float!, stock: Int!, status: String! }
  type Order { id: ID!, customerName: String!, customerEmail: String!, status: String!, total: Float!, createdAt: String! }
  type User { id: ID!, name: String!, email: String!, role: String!, status: String! }
  type Dashboard { productCount: Int!, orderCount: Int!, userCount: Int!, revenue: Float! }
  type Query {
    products: [Product!]!
    orders: [Order!]!
    users: [User!]!
    dashboard: Dashboard!
  }
`);

const orders = [
  {
    id: "ord-1001",
    customerName: "Ava Thompson",
    customerEmail: "ava@example.com",
    status: "PAID",
    total: 2598,
    createdAt: "2026-08-28T10:30:00.000Z",
  },
];

const users = [
  {
    id: "1",
    name: "Commerce Admin",
    email: "admin@commerce.com",
    role: "ADMIN",
    status: "ACTIVE",
  },
  {
    id: "2",
    name: "Store Staff",
    email: "staff@commerce.com",
    role: "STAFF",
    status: "ACTIVE",
  },
];

const root = {
  products: () => products,
  orders: () => orders,
  users: () => users,
  dashboard: () => ({
    productCount: products.length,
    orderCount: orders.length,
    userCount: users.length,
    revenue: orders.reduce((sum, order) => sum + order.total, 0),
  }),
};

const app = express();
app.use(cors());
app.all("/graphql", createHandler({ schema, rootValue: root }));
app.get("/health", (_req, res) => res.json({ status: "ok" }));

const port = Number(process.env.PORT ?? 4001);
app.listen(port, () =>
  console.log(`GraphQL API listening on http://localhost:${port}/graphql`),
);
