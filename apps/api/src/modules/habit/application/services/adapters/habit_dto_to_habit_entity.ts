import type { Prisma } from "@habitus/database/generated/prisma";
import type { CreateHabitDto, UpdateHabitDto } from "@habitus/validation";

export const habitCreateDtoToHabitEntity = (
  dto: CreateHabitDto,
): Prisma.HabitCreateInput => {
  const habit: Prisma.HabitCreateInput = {
    name: dto.name,
    description: dto.description,
    type: dto.type,
    frequencyCount: dto.frequencyCount,
    goalCount: dto.goalCount,
    frequencyUnit: dto.frequencyUnit,
    goalMeasure: dto.goalMeasure,
    penaltyPoints: dto.penaltyPoints,
    rewardPoints: dto.rewardPoints,
    timeEstimateMins: dto.timeEstimateMins,
  };
  return habit;
};

export const habitUpdateDtoToHabitEntity = (
  dto: UpdateHabitDto,
): Prisma.HabitUpdateInput => {
  const habit: Prisma.HabitUpdateInput = {
    name: dto.name,
    description: dto.description,
    type: dto.type,
    frequencyCount: dto.frequencyCount,
    goalCount: dto.goalCount,
    frequencyUnit: dto.frequencyUnit,
    goalMeasure: dto.goalMeasure,
    penaltyPoints: dto.penaltyPoints,
    rewardPoints: dto.rewardPoints,
    timeEstimateMins: dto.timeEstimateMins,
  };
  return habit;
};
