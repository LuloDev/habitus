import type { Context } from "hono";

import { container } from "@/di/container";

export const getHabits = async (c: Context) => {
	const result = await container.getHabitsUseCase.execute();

	return c.json(result);
};
