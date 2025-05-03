import { DeleteHabitUseCase } from "@habit/application/use_cases/delete_habit_use_case";
import { SqlHabits } from "@habitus/database";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export const deleteHabit = async (c: Context) => {
	const id = c.req.param("id");

	const sqlHabits = new SqlHabits();
	const useCase = new DeleteHabitUseCase(sqlHabits);
	const result = await useCase.execute(id);
	if (result.isErr()) {
		throw new HTTPException(404, { message: "Habit not found" });
	}

	return c.json({ message: "Habit deleted" });
};
