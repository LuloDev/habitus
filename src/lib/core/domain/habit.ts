import { t } from 'elysia';
import { HabitInstanceSchema } from './habit_instance';

export const HabitTypeEnum = t.UnionEnum(['GOOD', 'BAD']);

export const HabitBaseSchema = t.Object({
  emoji: t.Optional(t.String()),
  name: t.String(),
  description: t.String(),
  type: HabitTypeEnum,
  dailyTarget: t.Optional(t.Union([t.Number(), t.Null()])),
  targetUnit: t.Optional(t.Union([t.String(), t.Null()])),
});

export const CreateHabitSchema = HabitBaseSchema;

export const UpdateHabitSchema = t.Object({
  ...HabitBaseSchema.properties,
  id: t.Number(),
});

export const HabitSchema = t.Object({
  ...UpdateHabitSchema.properties,
  emoji: t.Union([t.String(), t.Null()]),
  dailyTarget: t.Union([t.Number(), t.Null()]),
  targetUnit: t.Union([t.String(), t.Null()]),
  habitInstances: t.Array(HabitInstanceSchema),
});

export type HabitType = typeof HabitTypeEnum.static;
export type HabitBase = typeof HabitBaseSchema.static;
export type CreateHabit = typeof CreateHabitSchema.static;
export type UpdateHabit = typeof UpdateHabitSchema.static;
export type Habit = typeof HabitSchema.static;
