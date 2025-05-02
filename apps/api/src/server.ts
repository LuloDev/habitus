import { serve } from "@hono/node-server";
import { type Context, Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { compress } from "hono/compress";

import { habitRoutes } from "./modules/habit/interfaces/http/routes";

const app = new Hono().basePath("/api");
app.use(logger());
app.use(compress());

app.route("/habits", habitRoutes);

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

app.onError((err: Error, c: Context) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return new HTTPException(500, {
    res: c.json({
      message: err.message,
    }),
  }).getResponse();
});

serve(
  {
    fetch: app.fetch,
    port: 3001,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
