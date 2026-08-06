import express from "express";
import cors from "cors";

import authRoutes from "./auth/auth.routes";
import productRoutes from "./products/product.routes";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/auth", authRoutes);
  app.use("/products", productRoutes);

  app.get("/health", (_, res) => {
    res.json({
      status: "ok",
    });
  });

  return app;
}
