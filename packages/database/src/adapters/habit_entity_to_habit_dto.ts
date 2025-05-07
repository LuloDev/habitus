import type { HabitDto } from "@habitus/validation";
import type { Habit } from "../../generated/prisma";

export const habitEntityToHabitDto = (entity: Habit): HabitDto => {
  const habit: HabitDto = {
    id: entity.id,
    name: entity.name,
    description: entity.description,
    type: entity.type,
    frequencyCount: entity.frequencyCount,
    goalCount: entity.goalCount,
    instances: [],
    frequencyUnit: entity.frequencyUnit,
    goalMeasure: entity.goalMeasure,
    penaltyPoints: entity.penaltyPoints,
    rewardPoints: entity.rewardPoints,
    timeEstimateMins: entity.timeEstimateMins,
  };
  return habit;
};
