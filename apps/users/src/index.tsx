import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  configureApi,
  registerRequestInterceptor,
  registerResponseInterceptor,
} from "@commerce/api";
import App from "./App";
configureApi("http://localhost:4000");
registerRequestInterceptor();
registerResponseInterceptor();
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={new QueryClient()}>
    <App />
  </QueryClientProvider>,
);
