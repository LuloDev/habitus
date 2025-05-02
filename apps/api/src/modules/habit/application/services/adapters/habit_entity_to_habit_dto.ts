import type { Habit } from "@habitus/database/generated/prisma";
import type { HabitDto } from "@habitus/validation";

export const habitEntityToHabitDto = (entity: Habit): HabitDto => {
  const habit: HabitDto = {
    id: entity.id,
    name: entity.name,
    description: entity.description,
    type: entity.type,
    autoComplete: entity.autoComplete,
    frequencyCount: entity.frequencyCount,
    goalCount: entity.goalCount,
    categoryId: entity.categoryId,
    instances: [],
    frequencyUnit: entity.frequencyUnit,
    goalMeasure: entity.goalMeasure,
    penaltyPoints: entity.penaltyPoints,
    rewardPoints: entity.rewardPoints,
    timeEstimateMins: entity.timeEstimateMins,
  };
  return habit;
};
