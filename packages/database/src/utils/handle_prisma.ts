import {
  type AppError,
  DependencyConflictError,
  NotFoundError,
  UnknownError,
} from "@habitus/core";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { err, ok, type Result } from "neverthrow";

export class HandlerPrisma {
  constructor(private readonly entityName: string) { }

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
        if (error.code === "P2003") {
          return err(new DependencyConflictError(this.entityName));
        }
        return err(new UnknownError(error.message, error.code));
      }

      if (error instanceof Error) {
        return err(
          new UnknownError(
            `Unknown error occurred in Prisma operation ${this.entityName} repository method ${operation.name} ErrorClass: ${error.constructor.name}`,
            error.message,
          ),
        );
      }
      return err(
        new UnknownError(
          `Unknown error occurred in Prisma operation ${this.entityName} repository method ${operation.name} ErrorClass: NOT_FOUND_CLASS`,
        ),
      );
    }
  }
}
