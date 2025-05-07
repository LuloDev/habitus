import db from "../../prisma_client";
import { HandlerPrisma } from "../utils/handle_prisma";
import type { CreateHabitDto, UpdateHabitDto } from "@habitus/validation";
import {
  habitCreateDtoToHabitEntity,
  habitUpdateDtoToHabitEntity,
} from "../adapters/habit_dto_to_habit_entity";
import { habitEntityToHabitDto } from "../adapters/habit_entity_to_habit_dto";

export class SqlHabits {
  private readonly handler = new HandlerPrisma("Habit");

  async create(habitDto: CreateHabitDto) {
    const habit = habitCreateDtoToHabitEntity(habitDto);

    return this.handler.handle(async () => {
      const result = await db.habit.create({
        data: habit,
      });
      return habitEntityToHabitDto(result);
    });
  }

  async findById(id: string) {
    return this.handler.handle(
      async () => {
        const result = await db.habit.findUnique({
          where: {
            id,
          },
        });
        if (!result) {
          return null;
        }
        return habitEntityToHabitDto(result);
      },
      { resourceId: id },
    );
  }

  async update(id: string, habit: UpdateHabitDto) {
    return this.handler.handle(
      async () => {
        const result = await db.habit.update({
          data: habitUpdateDtoToHabitEntity(habit),
          where: {
            id,
          },
        });
        return habitEntityToHabitDto(result);
      },
      { resourceId: id },
    );
  }

  async delete(id: string) {
    return this.handler.handle(
      async () => {
        const result = await db.habit.delete({
          where: {
            id,
          },
        });
        return habitEntityToHabitDto(result);
      },
      { resourceId: id },
    );
  }

  async findAll() {
    return this.handler.handle(async () => {
      const result = await db.habit.findMany();

      return result.map((habit) => habitEntityToHabitDto(habit));
    });
  }
}
