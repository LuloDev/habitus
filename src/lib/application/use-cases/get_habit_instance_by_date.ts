import type { HabitInstanceRepository } from "$lib/core/ports/habit_instance_repository";

export class GetHabitInstanceByDateUseCase {
  constructor(private readonly habitInstanceRepository: HabitInstanceRepository) { }

  async execute(habitId: number, date: Date) {
    return this.habitInstanceRepository.findBydate(habitId, date);
  }
}
