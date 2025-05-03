import { AppError } from "./app_error";

export class NotFoundError extends AppError {
	readonly statusCode = 404;
	readonly code = "NOT_FOUND";

	constructor(resource: string, id?: string) {
		super(`${resource} not found${id ? ` with id ${id}` : ""}`);
	}
}
