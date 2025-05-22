import { CreateHabitUseCase } from "@/habit/application/use_cases/create_habit_use_case";
import { DeleteHabitUseCase } from "@/habit/application/use_cases/delete_habit_use_case";
import { GetHabitUseCase } from "@/habit/application/use_cases/get_habit_use_case";
import { GetHabitsUseCase } from "@/habit/application/use_cases/get_habits_use_case";
import { UpdateHabitUseCase } from "@/habit/application/use_cases/update_habit_use_case";
import { CreateHabitInstanceUseCase } from "@/habit_instance/application/use_cases/create_habit_instance_use_case";
import { DeleteHabitInstanceUseCase } from "@/habit_instance/application/use_cases/delete_habit_instance_use_case";
import { GetHabitInstanceUseCase } from "@/habit_instance/application/use_cases/get_habit_instance_use_case";
import { GetHabitInstancesUseCase } from "@/habit_instance/application/use_cases/get_habit_instances_use_case";
import { UpdateHabitInstanceUseCase } from "@/habit_instance/application/use_cases/update_habit_instance_use_case";
import { SqlHabits, SqlHabitsInstance } from "@habitus/database";

const habitRepository = new SqlHabits();
const habitInstanceRepository = new SqlHabitsInstance();

export const container = {
	createHabitUseCase: new CreateHabitUseCase(habitRepository),
	updateHabitUseCase: new UpdateHabitUseCase(habitRepository),
	deleteHabitUseCase: new DeleteHabitUseCase(habitRepository),
	getHabitsUseCase: new GetHabitsUseCase(habitRepository),
	getHabitUseCase: new GetHabitUseCase(habitRepository),

	createHabitInstanceUseCase: new CreateHabitInstanceUseCase(
		habitInstanceRepository,
	),
	updateHabitInstanceUseCase: new UpdateHabitInstanceUseCase(
		habitInstanceRepository,
	),
	deleteHabitInstanceUseCase: new DeleteHabitInstanceUseCase(
		habitInstanceRepository,
	),
	getHabitInstancesUseCase: new GetHabitInstancesUseCase(
		habitInstanceRepository,
	),
	getHabitInstanceUseCase: new GetHabitInstanceUseCase(habitInstanceRepository),
};
