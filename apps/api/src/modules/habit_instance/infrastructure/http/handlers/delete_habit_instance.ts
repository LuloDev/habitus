import {
	errorResponse,
	successResponse,
} from "@/core/infrastructure/helpers/api_response";
import { container } from "@/di/container";
import type { Context } from "hono";

export const deleteHabitInstance = async (c: Context) => {
	const id = c.req.param("id");

	const result = await container.deleteHabitInstanceUseCase.execute(id);
	if (result.isErr()) {
		return c.json(errorResponse(result.error), result.error.statusCode);
	}

	return c.json(successResponse("Habit instance deleted", result.value));
};
