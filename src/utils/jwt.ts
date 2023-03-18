import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";
import { ApiError } from "./error";
import { StatusCodes } from "http-status-codes";
import { DecodedToken } from "./type";

dotenv.config();

export const encodeToken = (payload: DecodedToken) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "14 days",
  });
};

export const decodeToken = (token: string): DecodedToken | undefined => {
  let user: JwtPayload | string = "";
  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (error, payload) => {
    if (error) throw new ApiError(StatusCodes.UNAUTHORIZED, error.message);
    user = payload ?? "";
  });
  return user as unknown as DecodedToken;
};
