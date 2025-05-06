import type { SqlHabitsInstance } from "@habitus/database";

export class DeleteHabitInstanceUseCase {
  constructor(private readonly repo: SqlHabitsInstance) { }

  async execute(id: string, habitId: string) {
    const result = await this.repo.delete(id, habitId);
    return result;
  }
}
