import { NotFoundError, UnknownError } from "@habitus/core";
import type { Prisma } from "../generated/prisma";
import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";
import db from "../prisma_client";
import { err, ok } from "neverthrow";

export class SqlHabits {
	async create(habit: Prisma.HabitCreateInput) {
		const result = await db.habit.create({
			data: habit,
		});
		return result;
	}

	async findById(id: string) {
		try {
			const result = await db.habit.findUnique({
				where: {
					id,
				},
			});
			return ok(result);
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === "P2025") {
					return err(new NotFoundError("Habit", id));
				}
				return err(new UnknownError(error.message));
			}
			return err(
				new UnknownError(
					"Unknown error occurred in prisma findById habit repository",
				),
			);
		}
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
		try {
			const result = await db.habit.delete({
				where: {
					id,
				},
			});
			return ok(result);
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === "P2025") {
					return err(new NotFoundError("Habit", id));
				}
				return err(new UnknownError(error.message));
			}
			return err(
				new UnknownError(
					"Unknown error occurred in prisma delete habit repository",
				),
			);
		}
	}

	async findAll() {
		const result = await db.habit.findMany();
		return result;
	}
}
