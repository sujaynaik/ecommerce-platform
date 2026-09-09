export class ApiError extends Error {
    statusCode;
    code;
    constructor(statusCode, code, message) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.name = "ApiError";
    }
}
export const notFoundHandler = (_req, _res, next) => {
    next(new ApiError(404, "NOT_FOUND", "The requested resource was not found"));
};
export const errorHandler = (error, _req, res, _next) => {
    const statusCode = error instanceof ApiError ? error.statusCode : 500;
    const code = error instanceof ApiError ? error.code : "INTERNAL_ERROR";
    const message = error instanceof ApiError ? error.message : "An unexpected error occurred";
    if (statusCode >= 500) {
        console.error(error);
    }
    const response = {
        error: { code, message },
    };
    res.status(statusCode).json(response);
};
