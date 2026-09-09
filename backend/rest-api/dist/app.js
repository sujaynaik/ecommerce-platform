import express from "express";
import cors from "cors";
import authRoutes from "./auth/auth.routes.js";
import productRoutes from "./products/product.routes.js";
import { authenticate } from "./auth/auth.middleware.js";
import orderRoutes from "./orders/order.routes.js";
import userRoutes from "./users/user.routes.js";
import { config } from "./config.js";
import { errorHandler, notFoundHandler } from "./middleware/error-handler.js";
export function createApp() {
    const app = express();
    app.use(cors({
        origin: config.corsOrigins,
        credentials: true,
    }));
    app.use(express.json({ limit: "1mb" }));
    app.use("/auth", authRoutes);
    app.use("/products", authenticate, productRoutes);
    app.use("/orders", authenticate, orderRoutes);
    app.use("/users", authenticate, userRoutes);
    app.get("/health", (_, res) => {
        res.json({
            status: "ok",
        });
    });
    app.use(notFoundHandler);
    app.use(errorHandler);
    return app;
}
