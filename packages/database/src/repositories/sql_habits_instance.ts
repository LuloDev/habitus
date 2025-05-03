import type { Prisma } from "../../generated/prisma";
import db from "../../prisma_client";
import { HandlerPrisma } from "../utils/handle_prisma";

export class SqlHabitsInstance {
	private readonly handler = new HandlerPrisma("HabitInstance");

	async create(habit: Prisma.HabitCreateInput) {
		return this.handler.handle(async () => {
			const result = await db.habit.create({
				data: habit,
			});
			return result;
		});
	}

	async findById(id: string) {
		return this.handler.handle(
			async () => {
				const result = await db.habit.findUnique({
					where: {
						id,
					},
				});
				return result;
			},
			{ resourceId: id },
		);
	}

	async update(id: string, habit: Prisma.HabitUpdateInput) {
		return this.handler.handle(
			async () => {
				const result = await db.habit.update({
					data: habit,
					where: {
						id,
					},
				});
				return result;
			},
			{ resourceId: id },
		);
	}

	async delete(id: string) {
		return this.handler.handle(
			async () => {
				const result = await db.habit.delete({
					where: {
						id,
					},
				});
				return result;
			},
			{ resourceId: id },
		);
	}

	async findAll(search: Prisma.HabitWhereInput) {
		return this.handler.handle(async () => {
			const result = await db.habit.findMany({ where: search });
			return result;
		});
	}
}
