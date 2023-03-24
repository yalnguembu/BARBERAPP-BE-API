import type { Request, Response } from "express";
import { UserSevices } from "./userServices";
import { validate } from "class-validator";
import { UserDTO, UpdateUserDTO } from "./dto";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../utils";

export class UserController {
  static async getById(req: Request, res: Response) {
    const userId = req.params?.id;
    if (userId) {
      try {
        const user = await UserSevices.getById(userId);
        if (user) res.status(200).json(user);
        else res.status(422).json("user not found");
      } catch (error) {
        res.status(500).send(error);
      }
    }
    res.status(400).send("Bad request");
  }

  static async getAll(req: Request, res: Response) {
    try {
      const user = await UserSevices.getAll();
      console.log(user);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async update(req: Request, res: Response) {
    const userId = req.params?.id;
    if (userId && !req.body.password) {
      const user = new UserDTO();
      if (req.body.username) user.username = req.body.username;
      if (req.body.email) user.email = req.body.email;
      if (req.body.picture) user.picture = req.body.picture;

      try {
        const updatedUser = await UserSevices.update(userId, user);
        if (updatedUser) res.status(200).json(updatedUser);
        else res.status(422).json("user not found");
      } catch (error) {
        res.status(500).send(error);
      }
    }
    res.status(400).send("Bad request");
  }

  static async delete(req: Request, res: Response) {
    const userId = req.params?.id;
    if (userId && !req.body.password) {
      try {
        if (await UserSevices.delete(userId))
          res.status(200).json({ success: true });
        else res.status(422).json("user not found");
      } catch (error) {
        res.status(500).send(error);
      }
    }
    res.status(400).send("Bad request");
  }
}
