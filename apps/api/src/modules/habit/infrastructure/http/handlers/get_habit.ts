import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

import { container } from "@/di/container";

export const getHabit = async (c: Context) => {
	const id = c.req.param("id");

	const result = await container.getHabitUseCase.execute(id);
	if (result.isErr()) {
		throw new HTTPException(401, { message: result.error });
	}

	return c.json(result.value);
};
