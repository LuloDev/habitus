import * as v from "valibot";

export const HabitTypes = {
  GOOD: "GOOD",
  BAD: "BAD",
} as const;

export const FrequencyUnits = {
  DAY: "DAY",
  WEEK: "WEEK",
  MONTH: "MONTH",
} as const;

export const GoalMeasureTypes = {
  STEPS: "STEPS",
  ML: "ML",
  KCAL: "KCAL",
  MINUTES: "MINUTES",
  REPETITIONS: "REPETITIONS",
  POINTS: "POINTS",
  TIMES: "TIMES",
} as const;

export const HabitType = v.enum(HabitTypes);
export const FrequencyUnit = v.enum(FrequencyUnits);
export const GoalMeasureType = v.enum(GoalMeasureTypes);

export const CreateHabitSchema = v.object({
  name: v.string(),
  description: v.optional(v.string()),
  type: HabitType,
  frequencyUnit: FrequencyUnit,
  frequencyCount: v.optional(v.number()),
  goalCount: v.optional(v.number()),
  goalMeasure: GoalMeasureType,
  timeEstimateMins: v.nullable(v.number()),
  rewardPoints: v.number(),
  penaltyPoints: v.number(),
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
  type: HabitType,
  frequencyCount: v.number(),
  goalCount: v.number(),
  instances: v.array(v.string()),
  frequencyUnit: FrequencyUnit,
  goalMeasure: v.nullable(GoalMeasureType),
  penaltyPoints: v.number(),
  rewardPoints: v.number(),
  timeEstimateMins: v.nullable(v.number()),
});

export type HabitDto = v.InferInput<typeof HabitSchema>;
