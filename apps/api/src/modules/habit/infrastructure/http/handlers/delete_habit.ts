import type { Context } from "hono";

import { container } from "@/di/container";
import {
	errorResponse,
	successResponse,
} from "@/core/infrastructure/helpers/api_response";

export const deleteHabit = async (c: Context) => {
	const id = c.req.param("id");

	const result = await container.deleteHabitUseCase.execute(id);
	if (result.isErr()) {
		return c.json(errorResponse(result.error));
	}

	return c.json(successResponse("Habit deleted", result.value));
};
