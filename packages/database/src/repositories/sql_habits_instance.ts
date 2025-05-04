import type { Prisma } from "../../generated/prisma";
import db from "../../prisma_client";
import { HandlerPrisma } from "../utils/handle_prisma";

export class SqlHabitsInstance {
	private readonly handler = new HandlerPrisma("HabitInstance");

	async create(habit: Prisma.HabitInstanceCreateInput) {
		return this.handler.handle(async () => {
			const result = await db.habitInstance.create({
				data: habit,
			});
			return result;
		});
	}

	async findById(id: string) {
		return this.handler.handle(
			async () => {
				const result = await db.habitInstance.findUnique({
					where: {
						id,
					},
				});
				return result;
			},
			{ resourceId: id },
		);
	}

	async update(id: string, habit: Prisma.HabitInstanceUpdateInput) {
		return this.handler.handle(
			async () => {
				const result = await db.habitInstance.update({
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
				const result = await db.habitInstance.delete({
					where: {
						id,
					},
				});
				return result;
			},
			{ resourceId: id },
		);
	}

	async findAll(search: Prisma.HabitInstanceWhereInput) {
		return this.handler.handle(async () => {
			const result = await db.habitInstance.findMany({ where: search });
			return result;
		});
	}
}
