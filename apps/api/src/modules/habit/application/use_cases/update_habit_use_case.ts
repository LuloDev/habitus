import type { SqlHabits } from "@habitus/database";
import type { UpdateHabitDto } from "@habitus/validation";
import { ok } from "neverthrow";

export class UpdateHabitUseCase {
  constructor(private readonly habitRepository: SqlHabits) { }

  async execute(habit: UpdateHabitDto, id: string) {
    const result = await this.habitRepository.update(id, habit);
    if (result.isErr()) {
      return result;
    }
    return ok(result.value);
  }
}
