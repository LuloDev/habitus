import { getHabits } from "$lib/api";

export async function load() {
	const habits = await getHabits();
	return { habits };
}
