import * as v from "valibot";
import { HabitInstanceSchema } from "./habit_instance_schema";

export const HabitTypes = {
	GOOD: "GOOD",
	BAD: "BAD",
} as const;

export const GoalMeasureTypes = {
	STEPS: "STEPS",
	ML: "ML",
	KCAL: "KCAL",
	MINUTES: "MINUTES",
	REPETITIONS: "REPETITIONS",
	POINTS: "POINTS",
	TIMES: "TIMES",
	KILOMETERS: "KILOMETERS",
} as const;

export const HabitType = v.enum(HabitTypes);
export const GoalMeasureType = v.enum(GoalMeasureTypes);

export const CreateHabitSchema = v.object({
	name: v.string(),
	description: v.optional(v.string()),
	emoji: v.optional(v.pipe(v.string(), v.emoji())),
	type: HabitType,
	frequencyCount: v.optional(v.number()),
	goalCount: v.optional(v.number()),
	goalMeasure: v.optional(GoalMeasureType),
});

export type CreateHabitDto = v.InferInput<typeof CreateHabitSchema>;

export const UpdateHabitSchema = v.object({
	...CreateHabitSchema.entries,
});

export type UpdateHabitDto = v.InferInput<typeof UpdateHabitSchema>;

export const HabitSchema = v.object({
	id: v.string(),
	name: v.string(),
	description: v.string(),
	emoji: v.nullable(v.string()),
	type: HabitType,
	frequencyCount: v.number(),
	goalCount: v.number(),
	goalMeasure: v.nullable(GoalMeasureType),
});

export const HabitWhithInstancesSchema = v.object({
	...HabitSchema.entries,
	instances: v.array(HabitInstanceSchema),
});

export type HabitDto = v.InferInput<typeof HabitSchema>;

export type HabitWithInstancesDto = v.InferInput<
	typeof HabitWhithInstancesSchema
>;
