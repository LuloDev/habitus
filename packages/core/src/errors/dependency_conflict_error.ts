import { AppError } from "./app_error";

export class DependencyConflictError extends AppError {
	public readonly statusCode = 409;
	public readonly code = "CONFLICT";

	constructor(model: string, relation?: string, details?: unknown) {
		super(
			`Cannot delete ${model} because it has related ${relation}.`,
			details,
		);
	}
}
