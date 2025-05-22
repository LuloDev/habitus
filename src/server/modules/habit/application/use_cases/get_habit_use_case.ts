import { err, ok } from "neverthrow";

import { NotFoundError } from "@habitus/core";
import type { SqlHabits } from "@habitus/database";

export class GetHabitUseCase {
	constructor(private readonly habitRepo: SqlHabits) {}

	async execute(id: string) {
		const result = await this.habitRepo.findById(id);
		if (result.isErr()) {
			return result;
		}
		if (!result.value) return err(new NotFoundError("Habit", id));
		return ok(result.value);
	}
}
