import { AppError } from "@habitus/core";

export type SuccessResponse<T> = {
  status: "success";
  message: string;
  data: T;
};

export type ErrorResponse = {
  status: "error";
  message: string;
  error: unknown;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export const successResponse = <T>(
  message: string,
  data: T,
): SuccessResponse<T> => {
  return {
    status: "success",
    message,
    data,
  };
};

export const errorResponse = (
  error: string | AppError,
  details: unknown = null,
): ErrorResponse => {
  if (error instanceof AppError) {
    return {
      status: "error",
      message: error.message,
      error: error.details ?? null,
    };
  }
  return {
    status: "error",
    message: error,
    error: details,
  };
};
