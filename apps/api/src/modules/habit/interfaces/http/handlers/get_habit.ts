import type { Context } from "hono";

import { SqlHabits } from "@habitus/database";
import { GetHabitUseCase } from "@habit/application/use_cases/get_habit_use_case";
import { HTTPException } from "hono/http-exception";

export const getHabit = async (c: Context) => {
  const id = c.req.param("id");

  const sqlHabits = new SqlHabits();
  const useCase = new GetHabitUseCase(sqlHabits);
  const result = await useCase.execute(id);
  if (result.isErr()) {
    throw new HTTPException(401, { message: result.error });
  }

  return c.json(result.value);
};
