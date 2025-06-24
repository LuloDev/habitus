import type { Result } from "neverthrow";
import type { CreateHabitInstance, HabitInstance, UpdateHabitInstance } from "../domain/habit_instance";

export interface HabitInstanceRepository {
  create(habitId: number, habitInstance: CreateHabitInstance): Promise<Result<HabitInstance, Error>>;
  update(habitInstance: UpdateHabitInstance): Promise<Result<HabitInstance, Error>>;
  delete(habitId: number, id: number): Promise<Result<HabitInstance, Error>>;
  findAll(habitId: number, startDate: Date, endDate: Date): Promise<Result<HabitInstance[], Error>>;
  findBydate(habitId: number, date: Date): Promise<Result<HabitInstance | null, Error>>;
}
