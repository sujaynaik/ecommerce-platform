import express from "express";
import cors from "cors";

import authRoutes from "./auth/auth.routes.js";
import productRoutes from "./products/product.routes.js";
import { authenticate } from "./auth/auth.middleware.js";
import orderRoutes from "./orders/order.routes.js";
import userRoutes from "./users/user.routes.js";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/auth", authRoutes);
  app.use("/products", authenticate, productRoutes);
  app.use("/orders", authenticate, orderRoutes);
  app.use("/users", authenticate, userRoutes);

  app.get("/health", (_, res) => {
    res.json({
      status: "ok",
    });
  });

  return app;
}
