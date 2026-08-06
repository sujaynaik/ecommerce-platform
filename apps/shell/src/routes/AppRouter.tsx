import { Routes, Route, Navigate } from "react-router-dom";

import { DashboardPage } from "@pages/Dashboard";
import { LoginPage } from "@pages/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { ProductsPage } from "@features/products/pages/ProductsPage";

export function AppRouter() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route path="/products" element={<ProductsPage />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
