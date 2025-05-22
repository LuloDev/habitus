import type { Context } from "hono";

import {
	errorResponse,
	successResponse,
} from "@/core/infrastructure/helpers/api_response";
import { container } from "@/di/container";

export const deleteHabit = async (c: Context) => {
	const id = c.req.param("id");

	const result = await container.deleteHabitUseCase.execute(id);
	if (result.isErr()) {
		return c.json(errorResponse(result.error), result.error.statusCode);
	}

	return c.json(successResponse("Habit deleted", result.value));
};
