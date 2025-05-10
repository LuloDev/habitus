import { errorResponse } from "@/core/infrastructure/helpers/api_response";
import { habitRoutes } from "@/habit/infrastructure/http/routes";
import { habitinstanceRoutes } from "@/habit_instance/infrastructure/http/routes";
import { serve } from "@hono/node-server";
import { type Context, Hono } from "hono";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";

const app = new Hono().basePath("/api");
app.use(logger());
app.use(compress());

app.use(
	"*",
	cors({
		origin: "*",
	}),
);

app.route("/habits", habitRoutes);

app.route("/habits/:habitId/instances", habitinstanceRoutes);

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
