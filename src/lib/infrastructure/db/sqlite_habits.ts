import type { CreateHabit, Habit, UpdateHabit } from "$lib/core/domain/habit";
import type { HabitRepository } from "$lib/core/ports/habit_repository";
import { eq, sql } from "drizzle-orm";
import { db } from "./drizzle";
import { ok, err, Result } from "neverthrow";
import { habitsTable } from "./schema";
import { SqlAdapter } from "./sql_adapter";

export class SqliteHabits implements HabitRepository {

  async create(habit: CreateHabit): Promise<Result<Habit, Error>> {
    try {
      const [created] = await db.insert(habitsTable).values(habit).returning();
      return created ? ok(SqlAdapter.habitsToDto(created)) : err(new Error("Habit creation failed"));
    } catch (e) {
      return err(new Error("Database error during create: " + (e as Error).message));
    }
  }

  async update(habit: UpdateHabit): Promise<Result<Habit, Error>> {
    try {
      const [updated] = await db.update(habitsTable)
        .set({ ...habit, updatedAt: sql`CURRENT_TIMESTAMP` })
        .where(eq(habitsTable.id, habit.id))
        .returning();

      return updated ? ok(SqlAdapter.habitsToDto(updated)) : err(new Error(`Habit with ID ${habit.id} not found for update`));
    } catch (e) {
      return err(new Error("Database error during update: " + (e as Error).message));
    }
  }

  async delete(id: number): Promise<Result<Habit, Error>> {
    try {
      const [deleted] = await db.delete(habitsTable).where(eq(habitsTable.id, id)).returning();
      return deleted ? ok(SqlAdapter.habitsToDto(deleted)) : err(new Error(`Habit with ID ${id} not found for delete`));
    } catch (e) {
      return err(new Error("Database error during delete: " + (e as Error).message));
    }
  }

  async findAll(): Promise<Result<Habit[], Error>> {
    try {
      const habits = await db.query.habitsTable.findMany({
        with: {
          habitInstances: true
        },
      });
      return ok(habits.map(SqlAdapter.habitsToDto));
    } catch (e) {
      return err(new Error("Database error during findAll: " + (e as Error).message));
    }
  }

  async findById(id: number): Promise<Result<Habit, Error>> {
    try {
      const habit = await db.query.habitsTable.findFirst({ where: eq(habitsTable.id, id), with: { habitInstances: true } })
      return habit ? ok(SqlAdapter.habitsToDto(habit)) : err(new Error(`Habit with ID ${id} not found`));
    } catch (e) {
      return err(new Error("Database error during findById: " + (e as Error).message));
    }
  }
}

