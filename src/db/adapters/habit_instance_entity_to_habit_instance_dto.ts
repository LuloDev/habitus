import type { HabitInstanceDto } from "@habitus/validation";
import type { HabitInstance } from "../../generated/prisma";

export const habitInstanceEntityToHabitInstanceDto = (
	entity: HabitInstance,
): HabitInstanceDto => {
	return {
		id: entity.id,
		habitId: entity.habitId,
		date: entity.date,
		completed: entity.completed,
		goalCount: entity.goalCount,
		notes: entity.notes,
	};
};
