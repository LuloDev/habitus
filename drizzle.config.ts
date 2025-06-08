import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src/lib/infrastructure/db/migrations',
  schema: './src/lib/infrastructure/db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DB_FILE_NAME!,
  },
});
