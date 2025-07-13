import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import * as schema from './schema';
import { env } from '../../../env';

const sqlite = new Database(env.dbFileName);
export const db = drizzle({ client: sqlite, schema, logger: process.env.NODE_ENV !== 'production' });
