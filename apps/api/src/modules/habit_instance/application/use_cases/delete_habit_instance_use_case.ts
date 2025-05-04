import type { SqlHabitsInstance } from "@habitus/database";

export class DeleteHabitInstanceUseCase {
	constructor(private readonly repo: SqlHabitsInstance) {}

	async execute(id: string) {
		const result = await this.repo.delete(id);
		return result;
	}
}
