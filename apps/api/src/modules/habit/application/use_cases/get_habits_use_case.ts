import type { SqlHabits } from "@habitus/database";
import { habitEntityToHabitDto } from "../services/adapters/habit_entity_to_habit_dto";

export class GetHabitsUseCase {
  constructor(private readonly habitRepo: SqlHabits) { }

  async execute() {
    const result = await this.habitRepo.findAll();
    return result.map((habit) => habitEntityToHabitDto(habit));
  }
}
