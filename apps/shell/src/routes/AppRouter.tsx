import { Routes, Route, Navigate } from "react-router-dom";

import { DashboardPage } from "@pages/Dashboard";
import { LoginPage } from "@pages/Login";

export function AppRouter() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/dashboard"
        element={<DashboardPage />}
      />

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}