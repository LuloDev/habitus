import { Elysia, t } from 'elysia';
import HabitsRoute from '$lib/infrastructure/routes/habits';
import HabitInstancesRoute from '$lib/infrastructure/routes/habit_instances';

const app = new Elysia({ prefix: '/api' })
  .use(HabitsRoute)
  .use(HabitInstancesRoute);

type RequestHandler = (v: { request: Request }) => Response | Promise<Response>

export const GET: RequestHandler = ({ request }) => app.handle(request)
export const POST: RequestHandler = ({ request }) => app.handle(request)
export const PUT: RequestHandler = ({ request }) => app.handle(request)
export const DELETE: RequestHandler = ({ request }) => app.handle(request)
export const PATCH: RequestHandler = ({ request }) => app.handle(request)
