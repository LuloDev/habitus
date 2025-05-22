import type { SqlHabitsInstance } from "@habitus/database";

export class GetHabitInstancesUseCase {
	constructor(private readonly habitRepo: SqlHabitsInstance) {}

	async execute(habitId: string, date: Date | null) {
		const result = await this.habitRepo.findAll({ habitId }, date);
		return result;
	}
}
