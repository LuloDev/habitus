import type { SqlHabitsInstance } from "@habitus/database";
import type { CreateHabitInstanceDto } from "@habitus/validation";
import { createHabitInstanceDtoToHabitInstanceEntity } from "../services/adapter/habit_instance_dto_to_habit_instance_entity";

export class CreateHabitInstanceUseCase {
  constructor(private readonly repo: SqlHabitsInstance) { }

  async execute(habitInstance: CreateHabitInstanceDto, habitId: string) {
    const result = await this.repo.create(
      createHabitInstanceDtoToHabitInstanceEntity(habitInstance, habitId),
    );
    return result;
  }
}
