import { Hono } from "hono";
import { deleteHabit } from "./handlers/delete_habit";
import { getHabit } from "./handlers/get_habit";
import { getHabits } from "./handlers/get_habits";
import { postHabit } from "./handlers/post_habit";
import { putHabit } from "./handlers/put_habit";

export const habitRoutes = new Hono();

habitRoutes.post("/", postHabit);
habitRoutes.get("/", getHabits);
habitRoutes.get("/:id", getHabit);
habitRoutes.put("/:id", putHabit);
habitRoutes.delete("/:id", deleteHabit);
