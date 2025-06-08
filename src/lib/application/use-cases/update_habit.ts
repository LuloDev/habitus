import type { Habit, UpdateHabit } from "$lib/core/domain/habit";
import type { HabitRepository } from "$lib/core/ports/habit_repository";
import type { Result } from "neverthrow";

export class UpdateHabitUseCase {

  constructor(private readonly habitRepository: HabitRepository) { }


  async execute(habit: UpdateHabit): Promise<Result<Habit, Error>> {
    return this.habitRepository.update(habit);
  }

}
