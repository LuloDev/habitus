import { Elysia, status, t } from "elysia";
import { CreateHabitSchema, UpdateHabitSchema } from "$lib/core/domain/habit";
import { CreateHabitUseCase } from "$lib/application/use-cases/create_habit";
import { SqliteHabits } from "../db/sqlite_habits";
import { GetAllHabitsUseCase } from "$lib/application/use-cases/get_all_habits";
import { DeleteHabitUseCase } from "$lib/application/use-cases/delete_habit";
import { UpdateHabitUseCase } from "$lib/application/use-cases/update_habit";
import { GetHabitByIdUseCase } from "$lib/application/use-cases/get_habit_by_id";


const repo = new SqliteHabits();
const createHabitUseCase = new CreateHabitUseCase(repo);
const getAllHabitsUseCase = new GetAllHabitsUseCase(repo);
const deleteHabitUseCase = new DeleteHabitUseCase(repo);
const updateHabitUseCase = new UpdateHabitUseCase(repo);
const getHabitByIdUseCase = new GetHabitByIdUseCase(repo);

const routes = new Elysia().group('/habits', (app) =>
  app.post('/', async ({ body }) => {
    const result = await createHabitUseCase.execute(body);
    return result.match(
      (value) => status(201, value),
      (err) => status(500, { error: err.message }),
    );
  }, {
    body: CreateHabitSchema
  })
    .get('/', async () => {
      const result = await getAllHabitsUseCase.execute();
      return result.match(
        (value) => status(200, value),
        (err) => status(500, { error: err.message }),
      );
    })
    .get('/:id', async ({ params }) => {
      const result = await getHabitByIdUseCase.execute(params.id);
      return result.match(
        (value) => status(200, value),
        (err) => status(500, { error: err.message }),
      );
    },
      {
        params: t.Object({
          id: t.Number(),
        })
      }
    )
    .delete('/:id', async ({ params }) => {
      const result = await deleteHabitUseCase.execute(params.id);
      return result.match(
        (value) => status(200, value),
        (err) => status(500, { error: err.message }),
      );
    }, {
      params: t.Object({
        id: t.Number(),
      })
    })
    .put('/', async ({ body }) => {
      const result = await updateHabitUseCase.execute(body);

      return result.match(
        (value) => status(200, value),
        (err) => status(500, { error: err.message }),
      );
    }, {
      body: UpdateHabitSchema
    })
);

export default routes;
