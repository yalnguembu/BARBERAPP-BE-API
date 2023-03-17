import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";
import { ApiError } from "./error";
import { StatusCodes } from "http-status-codes";

dotenv.config();

export const encodeToken = (payload: { _id: string; email: string }) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "14 days",
  });
};

export const decodeToken = (token: string) => {
  let user: JwtPayload | string = "";
  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (error, payload) => {
    if (error) throw new ApiError(StatusCodes.UNAUTHORIZED, error.message);
    user = payload ?? "";
  });
  return user;
};
