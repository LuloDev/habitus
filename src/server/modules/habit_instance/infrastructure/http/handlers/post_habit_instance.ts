import {
	errorResponse,
	successResponse,
} from "@/core/infrastructure/helpers/api_response";
import { container } from "@/di/container";
import { CreateHabitInstanceSchema } from "@habitus/validation";
import type { Context } from "hono";
import { safeParse } from "valibot";

export const postHabitInstance = async (c: Context) => {
	const body = await c.req.json();
	const habitId = c.req.param("habitId");

	const parsedBody = safeParse(CreateHabitInstanceSchema, body);
	if (parsedBody.success === false) {
		return c.json(errorResponse("Invalid request", parsedBody.issues), 400);
	}
	const result = await container.createHabitInstanceUseCase.execute(
		parsedBody.output,
		habitId,
	);

	if (result.isErr()) {
		return c.json(errorResponse(result.error), result.error.statusCode);
	}

	return c.json(successResponse("Habit instance created", result.value));
};
