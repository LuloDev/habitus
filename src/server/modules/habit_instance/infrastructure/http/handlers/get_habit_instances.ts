import {
	errorResponse,
	successResponse,
} from "@/core/infrastructure/helpers/api_response";
import { container } from "@/di/container";
import type { Context } from "hono";

export const getHabitInstances = async (c: Context) => {
	const habitId = c.req.param("habitId");
	const date = c.req.query("date");
	const isDateValid = date && /^\d{4}-\d{2}-\d{2}$/.test(date);

	if (!habitId) {
		return c.json(
			errorResponse(
				"Invalid parameters",
				"Missing or invalid parameters, the request should be: /habits/:habitId/instances?date=YYYY-MM-DD",
			),
			400,
		);
	}
	let dateObj: Date | null = null;
	if (isDateValid) {
		dateObj = new Date(date);
		if (Number.isNaN(dateObj.getTime())) {
			return c.json(
				errorResponse("Invalid date", "The date parameter is not a valid date"),
				400,
			);
		}
	}

	const result = await container.getHabitInstancesUseCase.execute(
		habitId,
		dateObj,
	);
	if (result.isErr()) {
		return c.json(errorResponse(result.error), result.error.statusCode);
	}

	return c.json(successResponse("Habit instances retrieved", result.value));
};
