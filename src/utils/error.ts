import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class ApiError extends Error {
  statusCode: number;
  rawsErrors?: string[];

  constructor(statusCode: number, message: string, rawsErrors?: string[]) {
    super(message);
    this.statusCode = statusCode;
    this.rawsErrors = rawsErrors;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends ApiError {
  constructor(path: string) {
    super(StatusCodes.NOT_FOUND, `The requested path ${path} not found!`);
  }
}

export class ErrorHandler {
  static handle = () => {
    return async (
      error: ApiError,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).send({
        success: false,
        message: error.message,
        // stack: error.stack,
        rawsError: error.rawsErrors ?? [],
      });
    };
  };
}
