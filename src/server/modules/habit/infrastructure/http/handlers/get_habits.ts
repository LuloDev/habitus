import type { Context } from "hono";

import {
	errorResponse,
	successResponse,
} from "@/core/infrastructure/helpers/api_response";
import { container } from "@/di/container";

export const getHabits = async (c: Context) => {
	const result = await container.getHabitsUseCase.execute();
	if (result.isErr()) {
		return c.json(errorResponse(result.error), result.error.statusCode);
	}

	return c.json(successResponse("Habits retrieved", result.value));
};
