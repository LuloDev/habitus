import { relations, sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

const timestamps = {
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),

  updatedAt: text("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}

export const habitsTable = sqliteTable("habits", {
  id: int().primaryKey({ autoIncrement: true }),
  emoji: text(),
  name: text().notNull(),
  description: text().notNull(),
  type: text({
    enum: ["GOOD", "BAD"],
  }).notNull(),
  dailyTarget: int('daily_target'),
  targetUnit: text('target_unit'),
  integrationType: text('integration_type'),
  integrationConfig: text('integration_config', { mode: 'json' }),

  ...timestamps,

});

export const habitInstancesTable = sqliteTable("habit_instances", {
  id: int("id").primaryKey({ autoIncrement: true }),
  habitId: int("habit_id")
    .notNull()
    .references(() => habitsTable.id, { onDelete: "cascade" }),
  date: text("date").notNull(),
  completed: int("completed").default(0).notNull(),
  targetValue: int("traget_value"),
  notes: text("notes"),

  ...timestamps,
});

export const habistRelations = relations(habitsTable, ({ many }) => ({
  habitInstances: many(habitInstancesTable),
}))

export const habitsInstancesRelations = relations(habitInstancesTable, ({ one }) => ({
  habit: one(habitsTable, {
    fields: [habitInstancesTable.habitId],
    references: [habitsTable.id],
  }),
}))
