import type { Context } from "hono";
import { parse } from "valibot";

import { CreateHabitSchema } from "@habitus/validation";
import { container } from "@/di/container";

export const postHabit = async (c: Context) => {
	const body = await c.req.json();

	const parsedBody = parse(CreateHabitSchema, body);
	const result = await container.createHabitUseCase.execute(parsedBody);

	return c.json(result);
};
