import * as v from "valibot";

export const CreateHabitInstanceSchema = v.object({
	habitId: v.string(),
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
	id: v.string(),
});

export type UpdateHabitInstanceDto = v.InferInput<
	typeof UpdateHabitInstanceSchema
>;

export const HabitInstanceSchema = v.object({
	habit: v.object({
		id: v.string(),
		name: v.string(),
	}),
	date: v.date(),
	completed: v.boolean(),
	goalCount: v.number(),
	timeSpentMins: v.nullable(v.number()),
	notes: v.nullable(v.string()),
});

export type HabitInstanceDto = v.InferInput<typeof HabitInstanceSchema>;
