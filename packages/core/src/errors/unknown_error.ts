import { AppError } from "./app_error";

export class UnknownError extends AppError {
  public readonly statusCode = 500;
  public readonly code = "UNKNOWN_ERROR";
}
