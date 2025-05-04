import {
	errorResponse,
	successResponse,
} from "@/core/infrastructure/helpers/api_response";
import { container } from "@/di/container";
import type { Context } from "hono";

export const getHabitInstances = async (c: Context) => {
	const habitId = c.req.param("habitId");

	const result = await container.getHabitInstancesUseCase.execute(habitId);
	if (result.isErr()) {
		return c.json(errorResponse(result.error), result.error.statusCode);
	}

	return c.json(successResponse("Habit instances retrieved", result.value));
};
