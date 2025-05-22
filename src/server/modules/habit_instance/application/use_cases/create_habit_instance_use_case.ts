import type { SqlHabitsInstance } from "@habitus/database";
import type { CreateHabitInstanceDto } from "@habitus/validation";

export class CreateHabitInstanceUseCase {
	constructor(private readonly repo: SqlHabitsInstance) {}

	async execute(habitInstance: CreateHabitInstanceDto, habitId: string) {
		const result = await this.repo.create(habitInstance, habitId);
		return result;
	}
}
