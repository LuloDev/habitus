import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import * as schema from './schema';
import { config } from '../../../env';

const sqlite = new Database(config.dbFileName);
export const db = drizzle({ client: sqlite, schema });
