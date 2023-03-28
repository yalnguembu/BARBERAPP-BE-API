import { validate } from "class-validator";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../utils";
import { CategorySevices } from "./categoryServices";
import { CategoryDTO } from "./dto";

export class CategoryController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const category = new CategoryDTO();
      category.title = req.body.title ?? "";
      category.summary = req.body.summary ?? "";
      const errors = await validate(category);

      if (errors.length)
        throw new ApiError(StatusCodes.BAD_REQUEST, "bad request");
      const oldCategory = await CategorySevices.getByTile(category.title);

      if (oldCategory)
        throw new ApiError(StatusCodes.CONFLICT, "Existing category");

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

      if (!id)
        new ApiError(StatusCodes.BAD_REQUEST, "category id must be provided");

      const oldCategory = await CategorySevices.getByTile(category.title);

      if (oldCategory && oldCategory.summary == category.summary)
        throw new ApiError(StatusCodes.BAD_REQUEST, "Nothing to update");

      if (errors.length)
        throw new ApiError(StatusCodes.BAD_REQUEST, "wrong informations");

      res.status(200).json(await CategorySevices.update(id, category));
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
      if (await CategorySevices.delete(id))
        res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}
