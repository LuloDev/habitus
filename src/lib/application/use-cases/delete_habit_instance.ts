import type { HabitInstanceRepository } from "$lib/core/ports/habit_instance_repository";

export class DeleteHabitInstanceUseCase {

  constructor(private readonly habitInstanceRepository: HabitInstanceRepository) { }


  execute(habitId: number, id: number) {
    return this.habitInstanceRepository.delete(habitId, id);
  }
}
