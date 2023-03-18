import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError, decodeToken, encodeToken } from "../utils";

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
    roles: ["admin"],
  };
  next();
};

export const isUserAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const roles = req.body.user.roles;

  if (!roles.find((role: string) => role === "admin"))
    next(new ApiError(StatusCodes.UNAUTHORIZED, "access forbbiden"));

  next();
};

export const isUserAgent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { roles } = req.body;

  if (!roles.find((role: string) => role === "agent"))
    next(new ApiError(StatusCodes.UNAUTHORIZED, "access forbbiden"));

  next();
};
