import { serve } from "@hono/node-server";
import { type Context, Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { compress } from "hono/compress";
import { habitRoutes } from "@/habit/infrastructure/http/routes";
import { errorResponse } from "@/core/infrastructure/helpers/api_response";
import { habitinstanceRoutes } from "@/habit_instance/infrastructure/http/routes";

const app = new Hono().basePath("/api");
app.use(logger());
app.use(compress());

app.route("/habits", habitRoutes);

app.route("/habits/instances", habitinstanceRoutes);

app.get("/health", (c) => {
	return c.json({ status: "ok" });
});

app.onError((err: Error, c: Context) => {
	if (err instanceof HTTPException) {
		return c.json(errorResponse(err.message, err.cause), err.status);
	}
	return c.json(errorResponse(err.message, err.stack), 500);
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
