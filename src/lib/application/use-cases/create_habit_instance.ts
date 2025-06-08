import type { CreateHabitInstance, HabitInstance } from "$lib/core/domain/habit_instance";
import type { HabitInstanceRepository } from "$lib/core/ports/habit_instance_repository";
import type { Result } from "neverthrow";

export class CreateHabitInstanceUseCase {

  constructor(private readonly habitInstanceRepository: HabitInstanceRepository) { }


  async execute(habitId: number, crateHabitInstanceDto: CreateHabitInstance): Promise<Result<HabitInstance, Error>> {
    const habitInstance = await this.habitInstanceRepository.create(habitId, crateHabitInstanceDto);
    return habitInstance;
  }
}
