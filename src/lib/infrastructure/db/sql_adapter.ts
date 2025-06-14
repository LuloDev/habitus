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
      dailyTarget: habits.daily_target,
      targetUnit: habits.target_unit,
      habitInstances: habits.habitInstances?.map((habitInstance: any) => SqlAdapter.instancesToDto(habitInstance)),
    }
  }

  static instancesToDto(habitInstances: any): HabitInstance {
    return {
      id: habitInstances.id,
      habitId: habitInstances.habit_id,
      date: new Date(habitInstances.date),
      completed: habitInstances.completed,
      targetValue: habitInstances.target_value,
      notes: habitInstances.notes,
    }
  }
}
