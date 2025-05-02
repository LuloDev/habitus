import type { Context } from "hono";

import { GetHabitsUseCase } from "@habit/application/use_cases/get_habits_use_case";
import { SqlHabits } from "@habitus/database";

export const getHabits = async (c: Context) => {
  const sqlHabits = new SqlHabits();
  const useCase = new GetHabitsUseCase(sqlHabits);
  const result = await useCase.execute();

  return c.json(result);
};
