import dotenv from "dotenv";
dotenv.config();
import { createApp } from "./app.js";
import { initializeDatabase } from "./db/database.js";
const app = createApp();
const PORT = Number(process.env.PORT ?? 4000);
initializeDatabase()
    .then(() => app.listen(PORT, () => console.log(`REST API listening on http://localhost:${PORT}`)))
    .catch((error) => {
    console.error("Database initialization failed", error);
    process.exit(1);
});
