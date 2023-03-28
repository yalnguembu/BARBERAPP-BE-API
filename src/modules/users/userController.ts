import type { NextFunction, Request, Response } from "express";
import { UserSevices } from "./userServices";
import { validate } from "class-validator";
import { UserDTO, UpdateUserDTO } from "./dto";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../utils";

export class UserController {
  static async getById(req: Request, res: Response, next: NextFunction) {
    const userId = req.params?.id;
    if (userId) {
      try {
        const user = await UserSevices.getById(userId);
        if (user) res.status(200).json(user);
        else res.status(422).json("user not found");
      } catch (error) {
        next(error);
      }
    } else
      next(new ApiError(StatusCodes.BAD_REQUEST, "user id must be provided"));
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserSevices.getAll();
      res.status(StatusCodes.ACCEPTED).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const userId = req.params?.id;
    if (userId && !req.body.password) {
      const user = new UserDTO();
      if (req.body.username) user.username = req.body.username;
      if (req.body.email) user.email = req.body.email;
      if (req.body.picture) user.picture = req.body.picture;

      try {
        const updatedUser = await UserSevices.update(userId, user);
        if (updatedUser) res.status(StatusCodes.ACCEPTED).json(updatedUser);
        else res.status(StatusCodes.NOT_ACCEPTABLE).json("user not found");
      } catch (error) {
        next(error);
      }
    } else next(new ApiError(StatusCodes.BAD_REQUEST, "user must be provided"));
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const userId = req.params?.id;
    if (userId && !req.body.password) {
      try {
        if (await UserSevices.delete(userId))
          res.status(StatusCodes.ACCEPTED).json({ success: true });
        else next(new ApiError(StatusCodes.NOT_ACCEPTABLE, "user not found"));
      } catch (error) {
        next(error);
      }
    } else
      next(new ApiError(StatusCodes.BAD_REQUEST, "user id must be provide"));
  }
}
