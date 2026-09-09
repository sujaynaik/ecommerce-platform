import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { DashboardPage } from "@pages/Dashboard";
import { LoginPage } from "@pages/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

type RemoteContainer = {
  init(shareScope: unknown): Promise<void>;
  get(module: string): Promise<() => { default: React.ComponentType }>;
};

declare const __webpack_init_sharing__: (scope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: unknown };

const remoteContainers = new Map<string, Promise<RemoteContainer>>();

function loadRemote(scope: string, url: string, module: string) {
  const globalScope = window as unknown as Record<
    string,
    RemoteContainer | undefined
  >;
  let containerPromise = remoteContainers.get(scope);

  if (!containerPromise) {
    containerPromise = new Promise<RemoteContainer>((resolve, reject) => {
      const existing = globalScope[scope];
      if (existing) {
        resolve(existing);
        return;
      }

      const script = document.createElement("script");
      script.src = url;
      script.onload = () => resolve(globalScope[scope] as RemoteContainer);
      script.onerror = () =>
        reject(new Error(`Unable to load ${scope} remote`));
      document.head.appendChild(script);
    });
    remoteContainers.set(scope, containerPromise);
  }

  return containerPromise.then(async (container) => {
    await __webpack_init_sharing__("default");
    await container.init(__webpack_share_scopes__.default);
    const factory = await container.get(module);
    return factory();
  });
}

const ProductsRemote = lazy(() =>
  loadRemote("products", "http://localhost:3001/remoteEntry.js", "./App"),
);
const OrdersRemote = lazy(() =>
  loadRemote("orders", "http://localhost:3002/remoteEntry.js", "./App"),
);
const UsersRemote = lazy(() =>
  loadRemote("users", "http://localhost:3003/remoteEntry.js", "./App"),
);

function RemotePage({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<p>Loading workspace...</p>}>{children}</Suspense>;
}

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

      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <RemotePage>
              <ProductsRemote />
            </RemotePage>
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <RemotePage>
              <OrdersRemote />
            </RemotePage>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <RemotePage>
              <UsersRemote />
            </RemotePage>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
