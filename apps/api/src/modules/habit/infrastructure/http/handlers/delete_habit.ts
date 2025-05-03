import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

import { container } from "@/di/container";

export const deleteHabit = async (c: Context) => {
	const id = c.req.param("id");

	const result = await container.deleteHabitUseCase.execute(id);
	if (result.isErr()) {
		throw new HTTPException(404, { message: "Habit not found" });
	}

	return c.json({ message: "Habit deleted" });
};
