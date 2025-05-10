import type { Context } from "hono";
import { safeParse } from "valibot";

import {
	errorResponse,
	successResponse,
} from "@/core/infrastructure/helpers/api_response";
import { container } from "@/di/container";
import { UpdateHabitSchema } from "@habitus/validation";

export const putHabit = async (c: Context) => {
	const body = await c.req.json();
	const id = c.req.param("id");

	const parsedBody = safeParse(UpdateHabitSchema, body);
	if (parsedBody.success === false) {
		return c.json(errorResponse("Invalid request", parsedBody.issues), 400);
	}
	const result = await container.updateHabitUseCase.execute(
		parsedBody.output,
		id,
	);

	if (result.isErr()) {
		return c.json(errorResponse(result.error), result.error.statusCode);
	}
	return c.json(successResponse("Habit updated", result.value));
};
