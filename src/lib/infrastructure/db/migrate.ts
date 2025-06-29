import { migrate } from "drizzle-orm/bun-sqlite/migrator";

import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import { config } from "../../../env";

const sqlite = new Database(config.dbFileName);
const db = drizzle(sqlite);
migrate(db, { migrationsFolder: "./src/lib/infrastructure/db/migrations" });
