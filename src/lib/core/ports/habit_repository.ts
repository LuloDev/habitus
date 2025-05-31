import { Result } from "neverthrow";
import type { CreateHabit, Habit, UpdateHabit } from "../domain/habit";

export interface HabitRepository {
  create(habit: CreateHabit): Promise<Result<Habit, Error>>;
  update(habit: UpdateHabit): Promise<Result<Habit, Error>>;
  findAll(): Promise<Result<Habit[], Error>>;
  findById(id: number): Promise<Result<Habit, Error>>;
  delete(id: number): Promise<Result<Habit, Error>>;
}
