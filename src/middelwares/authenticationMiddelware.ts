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
  if (token && decodedToken) next();
  else next(new ApiError(StatusCodes.UNAUTHORIZED, "Please authenticate"));
};

export const isUserAdmin = (req: Request, res: Response, next: NextFunction) =>
  next();

export const isUserAgent = (req: Request, res: Response, next: NextFunction) =>
  next();
