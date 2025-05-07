import type { SqlHabits } from "@habitus/database";
import type { CreateHabitDto } from "@habitus/validation";
import { ok } from "neverthrow";

export class CreateHabitUseCase {
  constructor(private readonly habitRepo: SqlHabits) { }

  async execute(habit: CreateHabitDto) {
    const result = await this.habitRepo.create(habit);
    if (result.isErr()) {
      return result;
    }
    return ok(result.value);
  }
}
