import { validate } from "class-validator";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../utils";
import { CategorySevices } from "./categoryServices";
import { CategoryDTO } from "./dto";

export class CategorieController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const category = new CategoryDTO();
      category.title = req.body.title ?? "";
      category.summary = req.body.summary ?? "";

      const errors = await validate(category);

      if (errors.length)
        throw new ApiError(StatusCodes.BAD_REQUEST, "bad request");

      res.status(200).json(await CategorySevices.create(category));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json(await CategorySevices.getAll());
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const category = new CategoryDTO();
      category.title = req.body.title;
      category.summary = req.body.summary;

      const errors = await validate(category);

      if (!id) new ApiError(StatusCodes.BAD_REQUEST, "category id must be provided");
      
      if (errors.length)
        throw new ApiError(StatusCodes.BAD_REQUEST, "wrong informations");

      res.status(200).json(await CategorySevices.update(id,category));
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      if (!id)
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          "category id must be provided"
        );
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}
