import type { HabitWithInstancesDto } from "@habitus/validation";

export type SuccessResponse<T> = {
	status: "success";
	message: string;
	data: T;
};

export type ErrorResponse = {
	status: "error";
	message: string;
	error: unknown;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

const API_URL = "http://localhost:3001/api";

export const getHabits = async (): Promise<HabitWithInstancesDto[]> => {
	const response = await fetch(`${API_URL}/habits`);
	const result: ApiResponse<HabitWithInstancesDto[]> = await response.json();
	if (result.status === "error") {
		throw new Error(result.message);
	}
	const data = result.data.map((habit) => ({
		...habit,
		instances: habit.instances.map((instance) => ({
			...instance,
			date: new Date(instance.date),
		})),
	}));
	return data;
};

export const getHabit = async (id: number): Promise<HabitWithInstancesDto> => {
	const response = await fetch(`${API_URL}/habits/${id}`);
	const result: ApiResponse<HabitWithInstancesDto> = await response.json();
	if (result.status === "error") {
		throw new Error(result.message);
	}
	const data = {
		...result.data,
		instances: result.data.instances.map((instance) => ({
			...instance,
			date: new Date(instance.date),
		})),
	};
	return data;
};
