export class UnknownError extends Error {
	public readonly statusCode = 500;
	public readonly code = "UNKNOWN_ERROR";

	constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, new.target.prototype);
	}
}
