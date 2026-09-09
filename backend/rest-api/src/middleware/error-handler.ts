import type { ErrorRequestHandler, RequestHandler } from "express";

export type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const notFoundHandler: RequestHandler = (_req, _res, next) => {
  next(new ApiError(404, "NOT_FOUND", "The requested resource was not found"));
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const statusCode = error instanceof ApiError ? error.statusCode : 500;
  const code = error instanceof ApiError ? error.code : "INTERNAL_ERROR";
  const message =
    error instanceof ApiError ? error.message : "An unexpected error occurred";

  if (statusCode >= 500) {
    console.error(error);
  }

  const response: ApiErrorResponse = {
    error: { code, message },
  };

  res.status(statusCode).json(response);
};
