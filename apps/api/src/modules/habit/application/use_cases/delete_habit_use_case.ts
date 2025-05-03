import type { SqlHabits } from "@habitus/database";

export class DeleteHabitUseCase {
	constructor(private readonly habitRepository: SqlHabits) {}
	async execute(id: string) {
		const result = await this.habitRepository.delete(id);
		return result;
	}
}
