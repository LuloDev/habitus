import type { Context } from "hono";
import { parse } from "valibot";

import { UpdateHabitSchema } from "@habitus/validation";
import { container } from "@/di/container";

export const putHabit = async (c: Context) => {
	const body = await c.req.json();

	const parsedBody = parse(UpdateHabitSchema, body);
	const result = await container.updateHabitUseCase.execute(parsedBody);

	return c.json(result);
};
