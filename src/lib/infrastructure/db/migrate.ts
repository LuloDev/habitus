import { migrate } from "drizzle-orm/bun-sqlite/migrator";

import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import { env } from "../../../env";

const sqlite = new Database(env.dbFileName);
const db = drizzle(sqlite);
migrate(db, { migrationsFolder: "./src/lib/infrastructure/db/migrations" });
