import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { transformHabit } from "$lib/utils";

export const load: PageServerLoad = async ({ params, fetch }) => {
  const habitId = params.id;
  const response = await fetch("/api/habits/" + habitId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw error(404, "habit not found id " + habitId);
  }
  const habit = await response.json();

  return {
    habit,
  };
};

export const actions: Actions = {
  update: async ({ request, params, fetch }) => {
    const habitId = Number(params.id);
    const formData = await request.formData();

    const habit = transformHabit(formData, habitId);

    const response = await fetch("/api/habits", {
      method: "PUT",
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
