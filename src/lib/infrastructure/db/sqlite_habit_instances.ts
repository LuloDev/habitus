import type { CreateHabitInstance, HabitInstance, UpdateHabitInstance } from "$lib/core/domain/habit_instance";
import type { HabitInstanceRepository } from "$lib/core/ports/habit_instance_repository";
import { err, ok, type Result } from "neverthrow";
import { habitInstancesTable } from "./schema";
import { db } from "./drizzle";
import { and, between, eq, sql } from "drizzle-orm";
import { SqlAdapter } from "./sql_adapter";

export class SqliteHabitInstances implements HabitInstanceRepository {
  async create(habitId: number, habitInstance: CreateHabitInstance): Promise<Result<HabitInstance, Error>> {
    try {
      const [created] = await db.insert(habitInstancesTable).values({
        habitId,
        ...habitInstance,
        date: habitInstance.date.toISOString(),
      }).returning();
      return created ? ok(SqlAdapter.instancesToDto(created)) : err(new Error("Habit creation failed"));
    } catch (e) {
      return err(new Error("Database error during create: " + (e as Error).message));
    }

  }

  async update(habitInstance: UpdateHabitInstance): Promise<Result<HabitInstance, Error>> {
    try {
      const [updated] = await db.update(habitInstancesTable)
        .set({ ...habitInstance, date: habitInstance.date.toISOString(), updatedAt: sql`CURRENT_TIMESTAMP` })
        .where(eq(habitInstancesTable.id, habitInstance.id))
        .returning();

      return updated ? ok(SqlAdapter.instancesToDto(updated)) : err(new Error(`Habit with ID ${habitInstance.id} not found for update`));
    } catch (e) {
      return err(new Error("Database error during update: " + (e as Error).message));
    }
  }

  async delete(habitId: number, id: number): Promise<Result<HabitInstance, Error>> {
    try {
      const [deleted] = await db.delete(habitInstancesTable).where(and(eq(habitInstancesTable.id, id), eq(habitInstancesTable.habitId, habitId))).returning();
      return deleted ? ok(SqlAdapter.instancesToDto(deleted)) : err(new Error(`Habit with ID ${id} not found for delete`));
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
      return ok(habitInstances.map(SqlAdapter.instancesToDto));
    } catch (e) {
      return err(new Error("Database error during findAll: " + (e as Error).message));
    }
  }

  async findBydate(habitId: number, date: Date): Promise<Result<HabitInstance | null, Error>> {
    try {
      const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
      const habitInstance = await db.query.habitInstancesTable.findFirst({
        where: and(eq(habitInstancesTable.habitId, habitId), between(habitInstancesTable.date, startDate.toISOString(), endDate.toISOString())),
      });
      return habitInstance ? ok(SqlAdapter.instancesToDto(habitInstance)) : ok(null);
    } catch (e) {
      return err(new Error("Database error during findBydate: " + (e as Error).message));
    }
  }
}
