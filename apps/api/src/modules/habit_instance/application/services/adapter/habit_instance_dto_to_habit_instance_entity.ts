import type { Prisma } from "@habitus/database/generated/prisma";
import type {
  CreateHabitInstanceDto,
  UpdateHabitInstanceDto,
} from "@habitus/validation";

export const createHabitInstanceDtoToHabitInstanceEntity = (
  dto: CreateHabitInstanceDto,
  habitId: string,
): Prisma.HabitInstanceCreateInput => {
  const habitInstance: Prisma.HabitInstanceCreateInput = {
    habit: {
      connect: {
        id: habitId,
      },
    },
    date: dto.date,
    completed: dto.completed,
    goalCount: dto.goalCount,
    timeSpentMins: dto.timeSpentMins,
    notes: dto.notes,
  };
  return habitInstance;
};

export const habitInstanceUpdateDtoToHabitInstanceEntity = (
  dto: UpdateHabitInstanceDto,
  habitId: string,
  instanceId: string,
): Prisma.HabitInstanceUpdateInput => {
  const habitInstance: Prisma.HabitInstanceUpdateInput = {
    id: instanceId,
    habit: {
      connect: {
        id: habitId,
      },
    },
    date: dto.date,
    completed: dto.completed,
    goalCount: dto.goalCount,
    timeSpentMins: dto.timeSpentMins,
    notes: dto.notes,
  };
  return habitInstance;
};
