import type {
	CreateHabitInstanceDto,
	UpdateHabitInstanceDto,
} from "@habitus/validation";
import type { Prisma } from "../../generated/prisma";
import db from "../../prisma_client";
import {
	createHabitInstanceDtoToHabitInstanceEntity,
	habitInstanceUpdateDtoToHabitInstanceEntity,
} from "../adapters/habit_instance_dto_to_habit_instance_entity";
import { habitInstanceEntityToHabitInstanceDto } from "../adapters/habit_instance_entity_to_habit_instance_dto";
import { HandlerPrisma } from "../utils/handle_prisma";

export class SqlHabitsInstance {
	private readonly handler = new HandlerPrisma("HabitInstance");

	async create(habitDto: CreateHabitInstanceDto, habitId: string) {
		const habit = createHabitInstanceDtoToHabitInstanceEntity(
			habitDto,
			habitId,
		);
		return this.handler.handle(async () => {
			const result = await db.habitInstance.create({
				data: habit,
			});
			return habitInstanceEntityToHabitInstanceDto(result);
		});
	}

	async findById(id: string, habitId: string) {
		return this.handler.handle(
			async () => {
				const result = await db.habitInstance.findUnique({
					where: {
						id,
						habitId: habitId,
					},
				});

				if (!result) {
					return null;
				}
				return habitInstanceEntityToHabitInstanceDto(result);
			},
			{ resourceId: id },
		);
	}

	async update(
		habitId: string,
		instanceId: string,
		habit: UpdateHabitInstanceDto,
	) {
		return this.handler.handle(
			async () => {
				const result = await db.habitInstance.update({
					data: habitInstanceUpdateDtoToHabitInstanceEntity(
						habit,
						habitId,
						instanceId,
					),
					where: {
						id: instanceId,
					},
				});
				return habitInstanceEntityToHabitInstanceDto(result);
			},
			{ resourceId: instanceId },
		);
	}

	async delete(id: string, habitId: string) {
		return this.handler.handle(
			async () => {
				const result = await db.habitInstance.delete({
					where: {
						id,
						habitId: habitId,
					},
				});

				return habitInstanceEntityToHabitInstanceDto(result);
			},
			{ resourceId: id },
		);
	}

	async findAll(search: Prisma.HabitInstanceWhereInput, date: Date | null) {
		if (date) {
			const endDate = new Date(date.getTime());
			endDate.setHours(23, 59, 59, 999);
			const startDate = new Date(date.getTime());
			startDate.setHours(0, 0, 0, 0);
			search.date = {
				gte: startDate,
				lte: endDate,
			};
		}
		return this.handler.handle(async () => {
			const result = await db.habitInstance.findMany({ where: search });
			return result.map((habit) =>
				habitInstanceEntityToHabitInstanceDto(habit),
			);
		});
	}
}
