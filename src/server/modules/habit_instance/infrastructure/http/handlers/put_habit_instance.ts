import {
	errorResponse,
	successResponse,
} from "@/core/infrastructure/helpers/api_response";
import { container } from "@/di/container";
import { UpdateHabitInstanceSchema } from "@habitus/validation";
import type { Context } from "hono";
import { safeParse } from "valibot";

export const putHabitInstance = async (c: Context) => {
	const body = await c.req.json();

	const habitId = c.req.param("habitId");
	const instanceId = c.req.param("id");

	const parsedBody = safeParse(UpdateHabitInstanceSchema, body);
	if (parsedBody.success === false) {
		return c.json(errorResponse("Invalid request", parsedBody.issues), 400);
	}
	const result = await container.updateHabitInstanceUseCase.execute(
		parsedBody.output,
		habitId,
		instanceId,
	);

	if (result.isErr()) {
		return c.json(errorResponse(result.error), result.error.statusCode);
	}
	return c.json(successResponse("Habit instance updated", result.value));
};
