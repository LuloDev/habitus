import type { Context } from "hono";

import { container } from "@/di/container";
import { successResponse } from "@/core/infrastructure/helpers/api_response";

export const getHabits = async (c: Context) => {
	const result = await container.getHabitsUseCase.execute();

	return c.json(successResponse("Habits retrieved", result));
};
