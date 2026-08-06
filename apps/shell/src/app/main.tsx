import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "../shared/styles/styles.css";
import App from "./App";
import { AuthProvider } from "src/auth/AuthProvider";
import {
  configureApi,
  registerRequestInterceptor,
  registerResponseInterceptor,
} from "@commerce/api";
import { ENV as env } from "../config/env";

/** Configure @commerce/api for this app */
configureApi(env.API_BASE_URL);
registerRequestInterceptor();
registerResponseInterceptor();

const root = createRoot(document.getElementById("root")!);

root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
);
