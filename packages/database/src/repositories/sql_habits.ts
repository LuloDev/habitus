import { NotFoundError, UnknownError } from "@habitus/core";
import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/library";
import db from "../../prisma_client";
import { err, ok } from "neverthrow";
import { handlePrisma } from "../utils/handle_prisma";
import type { Prisma } from "../../generated/prisma";

export class SqlHabits {
	async create(habit: Prisma.HabitCreateInput) {
		const result = await db.habit.create({
			data: habit,
		});
		return result;
	}

	async findById(id: string) {
		return handlePrisma(async () => {
			const result = await db.habit.findUnique({
				where: {
					id,
				},
			});
			return result;
		}, `Habit with ID ${id} not found`);
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
		return handlePrisma(async () => {
			const result = await db.habit.delete({
				where: {
					id,
				},
			});
			return result;
		}, `Habit with ID ${id} not found`);
	}

	async findAll() {
		const result = await db.habit.findMany();
		return result;
	}
}
