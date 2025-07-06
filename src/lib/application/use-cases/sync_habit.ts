
import type { HabitInstanceRepository } from "$lib/core/ports/habit_instance_repository";
import type { HabitRepository } from "$lib/core/ports/habit_repository";
import { IntegrationFactory } from "$lib/integrations/factory";
import { err, ok, Result } from "neverthrow";

export class SyncHabitUseCase {
  constructor(
    private readonly habitRepository: HabitRepository,
    private readonly habitInstanceRepository: HabitInstanceRepository
  ) { }

  async execute(habitId: number): Promise<Result<void, Error>> {
    const habitResult = await this.habitRepository.findById(habitId);
    if (habitResult.isErr()) {
      return err(new Error("Habit not found"));
    }
    const habit = habitResult.value;

    if (!habit.integrationType) {
      return err(new Error("Habit does not have an integration configured"));
    }

    try {
      const integration = IntegrationFactory.create(habit);

      const endDate = new Date();
      endDate.setHours(23, 59, 59, 999);
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 365);
      startDate.setHours(0, 0, 0, 0);

      const syncedData = await integration.sync(habit, startDate, endDate);

      for (const [dateString, value] of syncedData.entries()) {
        await this.habitInstanceRepository.upsert(habit.id, {
          date: new Date(dateString),
          completed: 1,
          targetValue: typeof value === 'number' ? value : undefined
        });
      }

      return ok(undefined);
    } catch (error) {
      return err(error as Error);
    }
  }
}
