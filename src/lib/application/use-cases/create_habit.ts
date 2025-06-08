import type { CreateHabit, Habit } from "$lib/core/domain/habit";
import type { HabitRepository } from "$lib/core/ports/habit_repository";
import type { Result } from "neverthrow";

export class CreateHabitUseCase {

  constructor(private readonly habitRepository: HabitRepository) { }

  async execute(habit: CreateHabit): Promise<Result<Habit, Error>> {
    return this.habitRepository.create(habit);
  }
}

