import type {
	CreateHabitDto,
	HabitWithInstancesDto,
	UpdateHabitDto,
} from "@habitus/validation";
import { error } from "@sveltejs/kit";

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
		throw error(500, result.message);
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

export const getHabit = async (id: string): Promise<HabitWithInstancesDto> => {
	const response = await fetch(`${API_URL}/habits/${id}`);
	const result: ApiResponse<HabitWithInstancesDto> = await response.json();
	if (result.status === "error") {
		if (response.status === 404) {
			throw error(404, "Habit not found");
		}
		throw error(500, result.message);
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

export const createHabit = async (habit: CreateHabitDto) => {
	const response = await fetch(`${API_URL}/habits`, {
		method: "POST",
		body: JSON.stringify(habit),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const result: ApiResponse<HabitWithInstancesDto> = await response.json();
	if (result.status === "error") {
		throw error(500, result.message);
	}
	return result.data;
};

export const updateHabit = async (id: string, habit: UpdateHabitDto) => {
	const response = await fetch(`${API_URL}/habits/${id}`, {
		method: "PUT",
		body: JSON.stringify(habit),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const result: ApiResponse<HabitWithInstancesDto> = await response.json();
	if (result.status === "error") {
		throw error(500, result.message);
	}
	return result.data;
};
