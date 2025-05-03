import type { SqlHabits } from "@habitus/database";
import { err, ok } from "neverthrow";

export class DeleteHabitUseCase {
	constructor(private readonly habitRepository: SqlHabits) {}
	async execute(id: string) {
		try {
			const result = await this.habitRepository.delete(id);
			return ok(result);
		} catch (error) {
			return err(error);
		}
	}
}
