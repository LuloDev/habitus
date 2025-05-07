import type { SqlHabitsInstance } from "@habitus/database";
import type { UpdateHabitInstanceDto } from "@habitus/validation";

export class UpdateHabitInstanceUseCase {
  constructor(private readonly repo: SqlHabitsInstance) { }

  async execute(
    habitInstance: UpdateHabitInstanceDto,
    habitId: string,
    instanceId: string,
  ) {
    const result = await this.repo.update(habitId, instanceId, habitInstance);
    return result;
  }
}
