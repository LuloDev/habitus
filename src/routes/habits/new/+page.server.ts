import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import type { CreateHabit } from "$lib/core/domain/habit";
import { transformHabit } from "$lib/utils";

export const actions: Actions = {
  create: async ({ request, fetch }) => {
    const formData = await request.formData();
    // conmvert form data to habit
    const habit: CreateHabit = transformHabit(formData);

    const response = await fetch("/api/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(habit),
    });

    if (response.ok) {
      throw redirect(303, "/");
    }
    if (response.status === 400) {
      const error = await response.json();
      return { errors: error };
    }
    return { errors: { message: "Something went wrong" } };

  },
};
