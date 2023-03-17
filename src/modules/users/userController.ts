import type { Request, Response } from "express";
// import User from "./userSchema";
import { UserSevices } from "./userServices";

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
    res.send(400).send("Bad request");
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
    // if (req.body.userId === req.params.id) {
    //   if (req.body.password) {
    //     res.status(403).json("you can't update your pasword here!");
    //   } else {
    //     try {
    //       const updateUser = await User.findByIdAndUpdate(
    //         req.params.id,
    //         {
    //           $set: req.body,
    //         },
    //         { new: true }
    //       );
    //       const { __v, password, ...others } = updateUser._doc;
    //       res.status(200).json(others);
    //     } catch (err) {
    //       res.status(500).json(err);
    //     }
    //   }
    // } else {
    //   res.status(401).json("you can only update your account!");
    // }
  }

  static async delete(req: Request, res: Response) {
    //   if (req.body.userId === req.params.id) {
    //     try {
    //       const user = await User.findById(req.params.id);
    //       try {
    //         await User.findByIdAndDelete(req.params.id);
    //         res.status(200).json("user has been deleted");
    //       } catch (err) {
    //         res.status(500).json(err);
    //       }
    //     } catch (err) {
    //       res.status(404).json("user not found");
    //     }
    //   } else {
    //     res.status(401).json("you can only delete your account!");
    //   }
  }
}
