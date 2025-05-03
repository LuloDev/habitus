import type { Context } from "hono";

import { container } from "@/di/container";
import {
	errorResponse,
	successResponse,
} from "@/core/infrastructure/helpers/api_response";

export const getHabits = async (c: Context) => {
	const result = await container.getHabitsUseCase.execute();
	if (result.isErr()) {
		return c.json(errorResponse(result.error), result.error.statusCode);
	}

	return c.json(successResponse("Habits retrieved", result.value));
};
