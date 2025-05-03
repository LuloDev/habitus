import { NotFoundError, UnknownError } from "@habitus/core";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { err, ok, type Result } from "neverthrow";

export async function handlePrisma<T>(
	operation: () => Promise<T>,
	notFoundMessage?: string,
): Promise<Result<T, Error>> {
	try {
		const result = await operation();
		return ok(result);
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			if (error.code === "P2025" && notFoundMessage) {
				return err(new NotFoundError(notFoundMessage));
			}
			return err(new UnknownError(error.message));
		}

		return err(new UnknownError("Unknown error occurred in Prisma operation"));
	}
}
