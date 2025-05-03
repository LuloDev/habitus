import { CreateHabitUseCase } from "@/habit/application/use_cases/create_habit_use_case";
import { DeleteHabitUseCase } from "@/habit/application/use_cases/delete_habit_use_case";
import { GetHabitUseCase } from "@/habit/application/use_cases/get_habit_use_case";
import { GetHabitsUseCase } from "@/habit/application/use_cases/get_habits_use_case";
import { UpdateHabitUseCase } from "@/habit/application/use_cases/update_habit_use_case";
import { SqlHabits } from "@habitus/database";

const habitRepository = new SqlHabits();

export const container = {
	createHabitUseCase: new CreateHabitUseCase(habitRepository),
	updateHabitUseCase: new UpdateHabitUseCase(habitRepository),
	deleteHabitUseCase: new DeleteHabitUseCase(habitRepository),
	getHabitsUseCase: new GetHabitsUseCase(habitRepository),
	getHabitUseCase: new GetHabitUseCase(habitRepository),
};
