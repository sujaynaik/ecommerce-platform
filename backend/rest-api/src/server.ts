import dotenv from "dotenv";
dotenv.config();

import { createApp } from "./app";

const app = createApp();

const PORT = Number(process.env.PORT ?? 4000);

app.listen(PORT, () => {
  console.log(`REST API listening on http://localhost:${PORT}`);
});