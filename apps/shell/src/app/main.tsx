import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "../shared/styles/styles.css";
import App from "./App";
import { AuthProvider } from "src/auth/AuthProvider";
import {
  configureApi,
  registerRequestInterceptor,
  registerResponseInterceptor,
} from "@commerce/api";
import { ENV as env } from "../config/env";
import { queryClient } from "src/lib/react-query/query-client";

/** Configure @commerce/api for this app */
configureApi(env.API_BASE_URL);
registerRequestInterceptor();
registerResponseInterceptor();

const root = createRoot(document.getElementById("root")!);

root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>,
);
