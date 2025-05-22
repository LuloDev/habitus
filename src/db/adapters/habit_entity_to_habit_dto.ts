import type { HabitDto, HabitWithInstancesDto } from "$core";
import type { Prisma } from "generated/prisma";
import { habitInstanceEntityToHabitInstanceDto } from "./habit_instance_entity_to_habit_instance_dto";

export function habitEntityToHabitDto(
	entity: Prisma.HabitGetPayload<{ include: { instances: true } }>,
): HabitWithInstancesDto;
export function habitEntityToHabitDto(
	entity: Prisma.HabitGetPayload<{ include: { instances: false } }>,
): HabitDto;
export function habitEntityToHabitDto(
	entity:
		| Prisma.HabitGetPayload<{ include: { instances: false } }>
		| Prisma.HabitGetPayload<{ include: { instances: true } }>,
): HabitDto | HabitWithInstancesDto {
	const habit = {
		id: entity.id,
		name: entity.name,
		emoji: entity.emoji,
		description: entity.description,
		type: entity.type,
		goalCount: entity.goalCount,
		goalMeasure: entity.goalMeasure,
	};
	if ("instances" in entity && Array.isArray(entity.instances)) {
		const instances = entity.instances.map((instance) =>
			habitInstanceEntityToHabitInstanceDto(instance),
		);
		return {
			...habit,
			instances,
		};
	}
	return habit;
}
