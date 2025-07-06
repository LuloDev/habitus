import { Elysia } from 'elysia';
import HabitsRoute from '$lib/infrastructure/routes/habits';
import HabitInstancesRoute from '$lib/infrastructure/routes/habit_instances';
import { cron, Patterns } from '@elysiajs/cron';
import { SyncHabitUseCase } from '$lib/application/use-cases/sync_habit';
import { SqliteHabitInstances } from '$lib/infrastructure/db/sqlite_habit_instances';
import { SqliteHabits } from '$lib/infrastructure/db/sqlite_habits';

const habitRepository = new SqliteHabits();
const habitInstanceRepository = new SqliteHabitInstances();
const syncHabitUseCase = new SyncHabitUseCase(habitRepository, habitInstanceRepository);

const app = new Elysia({ prefix: '/api' })
  .use(HabitsRoute)
  .use(HabitInstancesRoute)
  .use(
    cron({
      name: 'syncHabits',
      pattern: Patterns.everyMinutes(15),
      async run() {
        console.log('Syncing habits...');
        const habits = await habitRepository.findAll();
        if (habits.isOk()) {
          for (const habit of habits.value) {
            if (habit.integrationType === 'home_assistant') {
              await syncHabitUseCase.execute(habit.id);
            }
          }
        }
      },
    })
  );

type RequestHandler = (v: { request: Request }) => Response | Promise<Response>

export const GET: RequestHandler = ({ request }) => app.handle(request)
export const POST: RequestHandler = ({ request }) => app.handle(request)
export const PUT: RequestHandler = ({ request }) => app.handle(request)
export const DELETE: RequestHandler = ({ request }) => app.handle(request)
export const PATCH: RequestHandler = ({ request }) => app.handle(request)
