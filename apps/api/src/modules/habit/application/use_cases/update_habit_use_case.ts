import type { SqlHabits } from "@habitus/database";
import type { UpdateHabitDto } from "@habitus/validation";
import { habitEntityToHabitDto } from "../services/adapters/habit_entity_to_habit_dto";
import { habitUpdateDtoToHabitEntity } from "../services/adapters/habit_dto_to_habit_entity";
import { ok } from "neverthrow";

export class UpdateHabitUseCase {
	constructor(private readonly habitRepository: SqlHabits) {}

	async execute(habit: UpdateHabitDto) {
		const result = await this.habitRepository.update(
			habit.id,
			habitUpdateDtoToHabitEntity(habit),
		);
		if (result.isErr()) {
			return result;
		}
		return ok(habitEntityToHabitDto(result.value));
	}
}
