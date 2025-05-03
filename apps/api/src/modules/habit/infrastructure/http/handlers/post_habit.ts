import type { Context } from "hono";
import { CreateHabitSchema } from "@habitus/validation";
import { parse } from "valibot";
import { SqlHabits } from "@habitus/database";
import { CreateHabitUseCase } from "@habit/application/use_cases/create_habit_use_case";

export const postHabit = async (c: Context) => {
	const body = await c.req.json();

	const parsedBody = parse(CreateHabitSchema, body);
	const sqlHabits = new SqlHabits();
	const useCase = new CreateHabitUseCase(sqlHabits);
	const result = await useCase.execute(parsedBody);

	return c.json(result);
};
