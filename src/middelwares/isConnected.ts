import type { NextFunction, Request, Response } from "express";

export const isConnected = (req: Request, res: Response, next: NextFunction) =>
  next();
