import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const App = () => {
  return (
    <h1>
      Commerce Platform Shell
    </h1>
  );
};

const root = createRoot(
 document.getElementById("root")!
);

root.render(
 <App />
);