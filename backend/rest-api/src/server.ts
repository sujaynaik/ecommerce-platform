import dotenv from "dotenv";

import { createApp } from "./app";

dotenv.config();

const app = createApp();

const PORT = Number(process.env.PORT ?? 4000);

app.listen(PORT, () => {
  console.log(`REST API listening on http://localhost:${PORT}`);
});