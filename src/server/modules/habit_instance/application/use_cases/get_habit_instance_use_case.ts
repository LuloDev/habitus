import { NotFoundError } from "@habitus/core";
import type { SqlHabitsInstance } from "@habitus/database";
import { err } from "neverthrow";

export class GetHabitInstanceUseCase {
	constructor(private readonly habitRepo: SqlHabitsInstance) {}

	async execute(habitId: string, instanceId: string) {
		const result = await this.habitRepo.findById(instanceId, habitId);
		if (result.isErr()) {
			return result;
		}
		if (result.value === null) {
			return err(new NotFoundError("HabitInstance", instanceId));
		}
		return result;
	}
}
