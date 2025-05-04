import { Hono } from "hono";
import { postHabitInstance } from "./handlers/post_habit_instance";
import { getHabitInstances } from "./handlers/get_habit_instances";
import { putHabitInstance } from "./handlers/put_habit_instance";
import { deleteHabitInstance } from "./handlers/delete_habit_instance";

export const habitinstanceRoutes = new Hono();

habitinstanceRoutes.post("/", postHabitInstance);
habitinstanceRoutes.get("/:habitId", getHabitInstances);
habitinstanceRoutes.put("/", putHabitInstance);
habitinstanceRoutes.delete("/:id", deleteHabitInstance);
