import type { Habit } from "$lib/core/domain/habit";
import type { HabitRepository } from "$lib/core/ports/habit_repository";
import type { Result } from "neverthrow";

export class DeleteHabitUseCase {
  constructor(private readonly habitRepository: HabitRepository) { }

  async execute(id: number): Promise<Result<Habit, Error>> {
    return this.habitRepository.delete(id);
  }
}
