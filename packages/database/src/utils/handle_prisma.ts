import { type AppError, NotFoundError, UnknownError } from "@habitus/core";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { err, ok, type Result } from "neverthrow";

export class HandlerPrisma {
	constructor(private readonly entityName: string) {}

	async handle<T>(
		operation: () => Promise<T>,
		{ resourceId }: { resourceId?: string } = {},
	): Promise<Result<T, AppError>> {
		try {
			const result = await operation();
			return ok(result);
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === "P2025") {
					return err(new NotFoundError(this.entityName, resourceId));
				}
				return err(new UnknownError(error.message));
			}

			return err(
				new UnknownError(
					`Unknown error occurred in Prisma operation ${this.entityName} repository method ${operation.name}`,
				),
			);
		}
	}
}
