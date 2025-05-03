import { UpdateHabitUseCase } from "@habit/application/use_cases/update_habit_use_case";
import { SqlHabits } from "@habitus/database";
import { UpdateHabitSchema } from "@habitus/validation";
import type { Context } from "hono";
import { parse } from "valibot";

export const putHabit = async (c: Context) => {
  const body = await c.req.json();
  console.log(body);

  const parsedBody = parse(UpdateHabitSchema, body);
  const sqlHabits = new SqlHabits();
  const useCase = new UpdateHabitUseCase(sqlHabits);
  const result = await useCase.execute(parsedBody);

  return c.json(result);
};
