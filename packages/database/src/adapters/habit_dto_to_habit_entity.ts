import type { CreateHabitDto, UpdateHabitDto } from "@habitus/validation";
import type { Prisma } from "../../generated/prisma";

export const habitCreateDtoToHabitEntity = (
	dto: CreateHabitDto,
): Prisma.HabitCreateInput => {
	const habit: Prisma.HabitCreateInput = {
		name: dto.name,
		description: dto.description,
		emoji: dto.emoji,
		type: dto.type,
		goalCount: dto.goalCount,
		goalMeasure: dto.goalMeasure,
	};
	return habit;
};

export const habitUpdateDtoToHabitEntity = (
	dto: UpdateHabitDto,
): Prisma.HabitUpdateInput => {
	const habit: Prisma.HabitUpdateInput = {
		name: dto.name,
		description: dto.description,
		emoji: dto.emoji,
		type: dto.type,
		goalCount: dto.goalCount,
		goalMeasure: dto.goalMeasure,
	};
	return habit;
};
