export abstract class AppError extends Error {
	public abstract readonly statusCode: number;
	public abstract readonly code: string;
	public readonly details?: unknown;

	constructor(message: string, details?: unknown) {
		super(message);
		this.details = details;
		Object.setPrototypeOf(this, new.target.prototype);
	}
}
