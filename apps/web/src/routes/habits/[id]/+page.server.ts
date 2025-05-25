import { getHabit, updateHabit } from "$lib/api";
import { parseWithValibot } from "$lib/valibot_utils";
import { UpdateHabitSchema } from "@habitus/validation";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const habitId = params.id;
	const habit = await getHabit(habitId);

	return {
		habit,
	};
};

export const actions: Actions = {
	update: async ({ request, params }) => {
		const formData = await request.formData();
		const habitId = params.id;

		const result = await parseWithValibot(formData, UpdateHabitSchema);

		if (result.status === "error") {
			return fail(400, { errors: result.errors, values: result.values });
		}

		const validatedData = result.data;
		await updateHabit(habitId, validatedData);

		throw redirect(303, "/");
	},
};
