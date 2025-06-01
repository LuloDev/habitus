import { t } from 'elysia';


export const HabitInstanceBaseSchema = t.Object({
  date: t.String(),
  completed: t.Number(),
  targetValue: t.Optional(t.Number()),
  notes: t.Optional(t.String()),
});

export const CreateHabitInstanceSchema = HabitInstanceBaseSchema;

export const UpdateHabitInstanceSchema = t.Object({
  ...HabitInstanceBaseSchema.properties,
  id: t.Number(),
});

export const HabitInstanceSchema = t.Object({
  ...UpdateHabitInstanceSchema.properties,
  habitId: t.Union([t.Number(), t.Null()]),
  date: t.Union([t.String(), t.Null()]),
  completed: t.Union([t.Number(), t.Null()]),
  targetValue: t.Union([t.Number(), t.Null()]),
  notes: t.Union([t.String(), t.Null()]),
});

export type HabitInstanceBase = typeof HabitInstanceBaseSchema.static;
export type CreateHabitInstance = typeof CreateHabitInstanceSchema.static;
export type UpdateHabitInstance = typeof UpdateHabitInstanceSchema.static;
export type HabitInstance = typeof HabitInstanceSchema.static;
