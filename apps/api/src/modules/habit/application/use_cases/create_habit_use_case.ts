import type { SqlHabits } from "@habitus/database";
import { habitCreateDtoToHabitEntity } from "../services/adapters/habit_dto_to_habit_entity";
import { habitEntityToHabitDto } from "../services/adapters/habit_entity_to_habit_dto";
import type { CreateHabitDto } from "@habitus/validation";

export class CreateHabitUseCase {
  constructor(private readonly habitRepo: SqlHabits) { }

  async execute(habit: CreateHabitDto) {
    const result = await this.habitRepo.create(
      habitCreateDtoToHabitEntity(habit),
    );
    return habitEntityToHabitDto(result);
  }
}
