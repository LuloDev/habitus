import * as v from "valibot";

export const CreateHabitInstanceSchema = v.object({
  date: v.pipe(
    v.string(),
    v.transform((input) => new Date(input)),
  ),
  completed: v.boolean(),
  goalCount: v.number(),
  timeSpentMins: v.nullable(v.number()),
  notes: v.nullable(v.string()),
});

export type CreateHabitInstanceDto = v.InferInput<
  typeof CreateHabitInstanceSchema
>;

export const UpdateHabitInstanceSchema = v.object({
  ...CreateHabitInstanceSchema.entries,
});

export type UpdateHabitInstanceDto = v.InferInput<
  typeof UpdateHabitInstanceSchema
>;

export const HabitInstanceSchema = v.object({
  id: v.string(),
  habitId: v.string(),
  date: v.date(),
  completed: v.boolean(),
  goalCount: v.number(),
  timeSpentMins: v.nullable(v.number()),
  notes: v.nullable(v.string()),
});

export type HabitInstanceDto = v.InferInput<typeof HabitInstanceSchema>;
