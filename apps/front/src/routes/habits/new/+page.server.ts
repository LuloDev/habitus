import { createHabit } from "$lib/api";
import { parseWithValibot } from "$lib/valibot_utils";
import { CreateHabitSchema } from "@habitus/validation";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
	create: async ({ request }: { request: Request }) => {
		const formData = await request.formData();
		const result = await parseWithValibot(formData, CreateHabitSchema);

		if (result.status === "error") {
			return fail(400, { errors: result.errors, values: result.values });
		}

		const validatedData = result.data;
		await createHabit(validatedData);

		throw redirect(303, "/");
	},
};
