import type {
	CreateHabitDto,
	CreateHabitInstanceDto,
	HabitInstanceDto,
	HabitWithInstancesDto,
	UpdateHabitDto,
	UpdateHabitInstanceDto,
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

export const getHabitInstances = async (habitId: string, date: Date | null) => {
	//format YYYY-MM-DD
	const dateString = date ? date.toISOString().split("T")[0] : undefined;
	const queryString = dateString ? `?date=${dateString}` : "";
	const response = await fetch(
		`${API_URL}/habits/${habitId}/instances${queryString}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		},
	);
	const result: ApiResponse<HabitInstanceDto[]> = await response.json();
	if (result.status === "error") {
		throw error(500, result.message);
	}
	return result.data;
};

export const createHabitInstance = async (
	habitId: string,
	instance: CreateHabitInstanceDto,
) => {
	const response = await fetch(`${API_URL}/habits/${habitId}/instances`, {
		method: "POST",
		body: JSON.stringify(instance),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const result: ApiResponse<HabitInstanceDto> = await response.json();
	if (result.status === "error") {
		throw error(500, result.message);
	}
	return result.data;
};

export const updateHabitInstance = async (
	habitId: string,
	instanceId: string,
	instance: UpdateHabitInstanceDto,
) => {
	const response = await fetch(
		`${API_URL}/habits/${habitId}/instances/${instanceId}`,
		{
			method: "PUT",
			body: JSON.stringify(instance),
			headers: {
				"Content-Type": "application/json",
			},
		},
	);
	const result: ApiResponse<HabitInstanceDto> = await response.json();
	if (result.status === "error") {
		throw error(500, result.message);
	}
	return result.data;
};

export const deleteHabitInstance = async (
	habitId: string,
	instanceId: string,
) => {
	const response = await fetch(
		`${API_URL}/habits/${habitId}/instances/${instanceId}`,
		{
			method: "DELETE",
		},
	);
	const result: ApiResponse<HabitInstanceDto> = await response.json();
	if (result.status === "error") {
		throw error(500, result.message);
	}
	return result.data;
};
