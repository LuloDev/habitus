import { ok, err } from "neverthrow";

import type { SqlHabits } from "@habitus/database";
import { NotFoundError } from "@habitus/core";

export class GetHabitUseCase {
  constructor(private readonly habitRepo: SqlHabits) { }

  async execute(id: string) {
    const result = await this.habitRepo.findById(id);
    if (result.isErr()) {
      return result;
    }
    if (!result.value) return err(new NotFoundError("Habit", id));
    return ok(result.value);
  }
}
