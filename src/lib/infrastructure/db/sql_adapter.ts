import type { Habit } from "$lib/core/domain/habit";
import type { HabitInstance } from "$lib/core/domain/habit_instance";

export class SqlAdapter {

  static habitsToDto(habits: any): Habit {
    return {
      id: habits.id,
      emoji: habits.emoji,
      name: habits.name,
      description: habits.description,
      type: habits.type,
      dailyTarget: habits.dailyTarget,
      targetUnit: habits.targetUnit,
      integrationType: habits.integrationType,
      integrationConfig: {
        entity_id: habits.integrationConfig?.entity_id,
        property: habits.integrationConfig?.property,
        state_value: habits.integrationConfig?.state_value,
        state_regex: habits.integrationConfig?.state_regex,
      },
      habitInstances: habits.habitInstances?.map((habitInstance: any) => SqlAdapter.instancesToDto(habitInstance)),
    }
  }

  static instancesToDto(habitInstances: any): HabitInstance {
    return {
      id: habitInstances.id,
      habitId: habitInstances.habitId,
      date: new Date(habitInstances.date),
      completed: habitInstances.completed,
      targetValue: habitInstances.targetValue,
      notes: habitInstances.notes,
    }
  }
}
