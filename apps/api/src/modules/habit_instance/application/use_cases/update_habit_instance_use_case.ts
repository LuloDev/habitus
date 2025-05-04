import type { SqlHabitsInstance } from "@habitus/database";
import type { UpdateHabitInstanceDto } from "@habitus/validation";

export class UpdateHabitInstanceUseCase {
	constructor(private readonly repo: SqlHabitsInstance) {}

	async execute(habitInstance: UpdateHabitInstanceDto) {
		const result = await this.repo.update(
			habitInstance.id,
			habitInstanceUpdateDtoToHabitInstanceEntity(habitInstance),
		);
		return result;
	}
}
