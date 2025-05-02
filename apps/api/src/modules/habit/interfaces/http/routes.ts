import { Hono } from "hono";
import { postHabit } from "./handlers/post_habit";
import { getHabits } from "./handlers/get_habits";
import { getHabit } from "./handlers/get_habit";

export const habitRoutes = new Hono();

habitRoutes.post("/", postHabit);
habitRoutes.get("/", getHabits);
habitRoutes.get("/:id", getHabit);
