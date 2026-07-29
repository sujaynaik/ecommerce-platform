import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "../shared/styles/styles.css"
import App from "./App";
import { AuthProvider } from "src/auth/AuthProvider";

const root = createRoot(
 document.getElementById("root")!
);

root.render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
);