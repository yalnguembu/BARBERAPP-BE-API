import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError, decodeToken } from "../utils";

export const isUserConnected = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization ?? "";
  const decodedToken = decodeToken(token.substring(7));

  if (!token && decodedToken)
    next(new ApiError(StatusCodes.UNAUTHORIZED, "Please authenticate"));

  req.body.user = {
    id: decodedToken?._id,
    email: decodedToken?.email,
    role: "admin",
  };
  next();
};

export const isUserAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.user.role !== "admin")
    next(new ApiError(StatusCodes.UNAUTHORIZED, "access forbbiden"));

  next();
};

export const isUserAgent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.user.role !== "admin")
    next(new ApiError(StatusCodes.UNAUTHORIZED, "access forbbiden"));

  next();
};
