import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import type { CreateHabit } from "$lib/core/domain/habit";


function formDataToObject<T>(formData: FormData): T {
  const obj: { [key: string]: any } = {};
  for (const key of Array.from(formData.keys())) {
    const values = formData.getAll(key);
    obj[key] = values.length > 1 ? values : values[0];
    if (obj[key] === "") {
      delete obj[key];
    }
  }
  return obj as T;
}
export const actions: Actions = {
  create: async ({ request, fetch }: { request: Request }) => {
    const formData = await request.formData();
    // conmvert form data to habit
    const habit: CreateHabit = formDataToObject<CreateHabit>(formData);

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
