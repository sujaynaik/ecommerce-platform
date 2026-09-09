import { createApp } from "./app.js";
import { config } from "./config.js";
import { initializeDatabase } from "./db/database.js";

const app = createApp();

initializeDatabase()
  .then(() =>
    app.listen(config.port, () =>
      console.log(`REST API listening on http://localhost:${config.port}`),
    ),
  )
  .catch((error) => {
    console.error("Database initialization failed", error);
    process.exit(1);
  });
