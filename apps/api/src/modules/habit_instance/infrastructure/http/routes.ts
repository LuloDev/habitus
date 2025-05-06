import { Hono } from "hono";
import { postHabitInstance } from "./handlers/post_habit_instance";
import { getHabitInstances } from "./handlers/get_habit_instances";
import { putHabitInstance } from "./handlers/put_habit_instance";
import { deleteHabitInstance } from "./handlers/delete_habit_instance";
import { getHabitInstance } from "./handlers/get_habit_instance";

export const habitinstanceRoutes = new Hono();

habitinstanceRoutes.post("/", postHabitInstance);
habitinstanceRoutes.get("/", getHabitInstances);
habitinstanceRoutes.get("/:id", getHabitInstance);
habitinstanceRoutes.put("/:id", putHabitInstance);
habitinstanceRoutes.delete("/:id", deleteHabitInstance);
