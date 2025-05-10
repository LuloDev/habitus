import type { SqlHabits } from "@habitus/database";
import { ok } from "neverthrow";

export class GetHabitsUseCase {
	constructor(private readonly habitRepo: SqlHabits) {}

	async execute() {
		const result = await this.habitRepo.findAll();
		if (result.isErr()) {
			return result;
		}
		return ok(result.value);
	}
}
