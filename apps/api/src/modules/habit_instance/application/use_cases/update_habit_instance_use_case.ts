import type { SqlHabitsInstance } from "@habitus/database";
import type { UpdateHabitInstanceDto } from "@habitus/validation";
import { habitInstanceUpdateDtoToHabitInstanceEntity } from "../services/adapter/habit_instance_dto_to_habit_instance_entity";

export class UpdateHabitInstanceUseCase {
  constructor(private readonly repo: SqlHabitsInstance) { }

  async execute(
    habitInstance: UpdateHabitInstanceDto,
    habitId: string,
    instanceId: string,
  ) {
    const result = await this.repo.update(
      instanceId,
      habitInstanceUpdateDtoToHabitInstanceEntity(
        habitInstance,
        habitId,
        instanceId,
      ),
    );
    return result;
  }
}
