import { Request, Response } from "express";
import { UserSevices } from "../users";
import { AuthService } from "./authService";
import { AuthDTO, EditPassowrd } from ".";
import { validate } from "class-validator";
export const router = require("express").Router();

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const user = new AuthDTO();
      user.email = req.body.email;
      user.password = req.body.password;

      const errors = validate(user);

      if ((await errors).length) {
        res.status(400).json(errors);
      } else res.status(200).send(await AuthService.login(user));
    } catch (error) {
      if (error instanceof TypeError && error.message === "wrong crudentials")
        res.status(403).json(error);
      else {
        res.status(500);
      }
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const crudentials = new AuthDTO();
      crudentials.email = req.body.email;
      crudentials.password = req.body.password;

      const errors = validate(crudentials);

      if (errors) {
        res.send(400).send(errors);
      } else {
        const user = await UserSevices.getByEmail(crudentials.email);
        if (user) res.status(409).send("already exists");
        else res.status(200).json(AuthService.register(crudentials));
      }
    } catch (err) {
      res.status(500);
    }
  }

  static async editPassowrd(req: Request, res: Response) {
    const id = req.params?.id;
    const password = req.body.newPassword;
    
    if (!password) {
      res.status(400).send("Password must be filled");
    } else if (id && req.body.userId === id) {
      try {
        res.status(200).json(AuthService.editPassowrd(id, password));
      } catch (error) {
        res.status(500);
      }
    } else {
      res.status(400).send("wrong id");
    }
  }
}
