import type { Prisma } from "@habitus/database/generated/prisma";
import type { CreateHabitDto, UpdateHabitDto } from "@habitus/validation";

export const habitCreateDtoToHabitEntity = (
  dto: CreateHabitDto,
): Prisma.HabitCreateInput => {
  const habit: Prisma.HabitCreateInput = {
    name: dto.name,
    description: dto.description,
    type: dto.type,
    autoComplete: dto.autoComplete,
    frequencyCount: dto.frequencyCount,
    goalCount: dto.goalCount,
    frequencyUnit: dto.frequencyUnit,
    goalMeasure: dto.goalMeasure,
    penaltyPoints: dto.penaltyPoints,
    rewardPoints: dto.rewardPoints,
    timeEstimateMins: dto.timeEstimateMins,
  };
  if (dto.categoryId) {
    habit.category = {
      connect: {
        id: dto.categoryId,
      },
    };
  }
  return habit;
};

export const habitUpdateDtoToHabitEntity = (
  dto: UpdateHabitDto,
): Prisma.HabitUpdateInput => {
  const habit: Prisma.HabitUpdateInput = {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    type: dto.type,
    autoComplete: dto.autoComplete,
    frequencyCount: dto.frequencyCount,
    goalCount: dto.goalCount,
    frequencyUnit: dto.frequencyUnit,
    goalMeasure: dto.goalMeasure,
    penaltyPoints: dto.penaltyPoints,
    rewardPoints: dto.rewardPoints,
    timeEstimateMins: dto.timeEstimateMins,
  };
  if (dto.categoryId) {
    habit.category = {
      connect: {
        id: dto.categoryId,
      },
    };
  }
  return habit;
};
