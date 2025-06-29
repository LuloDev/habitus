import { Elysia, status, t } from "elysia";
import { CreateHabitInstanceSchema, } from "$lib/core/domain/habit_instance";
import { SqliteHabitInstances } from "../db/sqlite_habit_instances";
import { CreateHabitInstanceUseCase } from "$lib/application/use-cases/create_habit_instance";
import { DeleteHabitInstanceUseCase } from "$lib/application/use-cases/delete_habit_instance";
import { GetHabitInstanceByDateUseCase } from "$lib/application/use-cases/get_habit_instance_by_date";


const sql = new SqliteHabitInstances();
const createHabitInstanceUseCase = new CreateHabitInstanceUseCase(sql);
const deleteHabitInstanceUseCase = new DeleteHabitInstanceUseCase(sql);
const findByDateUseCase = new GetHabitInstanceByDateUseCase(sql);

const routes = new Elysia().group('/habits/:id/instances', (app) =>
  app.post('/', async ({ params, body }) => {
    const result = await createHabitInstanceUseCase.execute(Number(params.id), body);
    return result.match(
      (value) => status(201, value),
      (err) => status(500, { error: err.message }),
    );
  }, {
    params: t.Object({
      id: t.Number(),
    }),
    body: CreateHabitInstanceSchema
  }).delete('/:instanceId', async ({ params }) => {
    const result = await deleteHabitInstanceUseCase.execute(Number(params.id), params.instanceId);
    return result.match(
      (value) => status(200, value),
      (err) => status(500, { error: err.message }),
    );
  }, {
    params: t.Object({
      id: t.Number(),
      instanceId: t.Number(),
    })
  }).get('/:date/date', async ({ params }) => {
    console.log(params);
    const result = await findByDateUseCase.execute(Number(params.id), params.date);
    return result.match(
      (value) => value === null ? status(404) : status(200, value),
      (err) => status(500, { error: err.message }),
    );
  }, {
    params: t.Object({
      id: t.Number(),
      date: t.Date(),
    })
  })
);

export default routes;
