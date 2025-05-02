import { ok, err } from "neverthrow";

import type { SqlHabits } from "@habitus/database";
import { habitEntityToHabitDto } from "../services/adapters/habit_entity_to_habit_dto";

export class GetHabitUseCase {
  constructor(private readonly habitRepo: SqlHabits) { }

  async execute(id: string) {
    const result = await this.habitRepo.findById(id);
    if (!result) return err(`Habit with id ${id} not found`);
    return ok(habitEntityToHabitDto(result));
  }
}
