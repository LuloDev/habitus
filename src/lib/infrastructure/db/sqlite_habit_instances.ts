import type { CreateHabitInstance, HabitInstance, UpdateHabitInstance } from "$lib/core/domain/habit_instance";
import type { HabitInstanceRepository } from "$lib/core/ports/habit_instance_repository";
import { err, ok, type Result } from "neverthrow";
import { habitInstancesTable } from "./schema";
import { db } from "./drizzle";
import { and, between, eq, sql } from "drizzle-orm";

export class SqliteHabitInstances implements HabitInstanceRepository {
  async create(habitId: number, habitInstance: CreateHabitInstance): Promise<Result<HabitInstance, Error>> {
    try {
      const [created] = await db.insert(habitInstancesTable).values({
        habitId,
        ...habitInstance,
      }).returning();
      return created ? ok(created) : err(new Error("Habit creation failed"));
    } catch (e) {
      return err(new Error("Database error during create: " + (e as Error).message));
    }

  }

  async update(habitInstance: UpdateHabitInstance): Promise<Result<HabitInstance, Error>> {
    try {
      const [updated] = await db.update(habitInstancesTable)
        .set({ ...habitInstance, updatedAt: sql`CURRENT_TIMESTAMP` })
        .where(eq(habitInstancesTable.id, habitInstance.id))
        .returning();

      return updated ? ok(updated) : err(new Error(`Habit with ID ${habitInstance.id} not found for update`));
    } catch (e) {
      return err(new Error("Database error during update: " + (e as Error).message));
    }
  }

  async delete(habitId: number, id: number): Promise<Result<HabitInstance, Error>> {
    try {
      const [deleted] = await db.delete(habitInstancesTable).where(and(eq(habitInstancesTable.id, id), eq(habitInstancesTable.habitId, habitId))).returning();
      return deleted ? ok(deleted) : err(new Error(`Habit with ID ${id} not found for delete`));
    } catch (e) {
      return err(new Error("Database error during delete: " + (e as Error).message));
    }
  }

  async findAll(habitId: number, startDate: Date, endDate: Date): Promise<Result<HabitInstance[], Error>> {
    try {
      const habitInstances = await db.query.habitInstancesTable.findMany({
        where: and(eq(habitInstancesTable.habitId, habitId), between(habitInstancesTable.date, startDate.toISOString(), endDate.toISOString())),
        orderBy: habitInstancesTable.date,
      });
      return ok(habitInstances);
    } catch (e) {
      return err(new Error("Database error during findAll: " + (e as Error).message));
    }
  }
}
