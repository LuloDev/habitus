import type {
	CreateHabitInstanceDto,
	UpdateHabitInstanceDto,
} from "@habitus/validation";
import type { Prisma } from "../../generated/prisma";

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
		notes: dto.notes,
	};
	return habitInstance;
};
