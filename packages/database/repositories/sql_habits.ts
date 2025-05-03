import type { Prisma } from "../generated/prisma";
import db from "../prisma_client";

export class SqlHabits {
	async create(habit: Prisma.HabitCreateInput) {
		const result = await db.habit.create({
			data: habit,
		});
		return result;
	}

	async findById(id: string) {
		const result = await db.habit.findUnique({
			where: {
				id,
			},
		});
		return result;
	}

	async update(id: string, habit: Prisma.HabitUpdateInput) {
		const result = await db.habit.update({
			data: habit,
			where: {
				id,
			},
		});
		return result;
	}

	async delete(id: string) {
		const result = await db.habit.delete({
			where: {
				id,
			},
		});
		return result;
	}

	async findAll() {
		const result = await db.habit.findMany();
		return result;
	}
}
