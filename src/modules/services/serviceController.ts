import { validate } from "class-validator";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError, areBothObjectsEqual } from "../../utils";
import { ServiceServices } from "./serviceServices";
import { ServiceDTO } from "./dto";

export class ServiceController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const service = new ServiceDTO();
      service.name = req.body.name ?? "";
      service.description = req.body.description ?? "";
      service.category = req.body.category ?? "";
      service.picture = req.file?.filename;
      service.price = parseInt(req.body.price ?? 0);
      service.duration = parseInt(req.body.duration ?? 0);
      const errors = await validate(service);

      if (errors.length)
        throw new ApiError(StatusCodes.BAD_REQUEST, "bad request");

      const oldService = await ServiceServices.getByName(service.name);

      if (oldService)
        throw new ApiError(StatusCodes.CONFLICT, "Existing service");

      res.status(200).json(await ServiceServices.create(service));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json(await ServiceServices.getAll());
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id ?? "";

      if (!id)
        new ApiError(StatusCodes.BAD_REQUEST, "service id must be provided");

      res.status(200).json(await ServiceServices.getById(id));
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id ?? "";
      const service = new ServiceDTO();
      service.name = req.body.name ?? "";
      service.description = req.body.description ?? "";
      service.picture = req.file?.filename;
      service.price = parseInt(req.body.price ?? 1);
      service.duration = parseInt(req.body.duration ?? 1);
      service.category = req.body.category ?? "";
      const errors = await validate(service);

      if (!id)
        new ApiError(StatusCodes.BAD_REQUEST, "service id must be provided");

      const oldService = await ServiceServices.getById(id);

      if (areBothObjectsEqual(oldService as object, service))
        throw new ApiError(StatusCodes.BAD_REQUEST, "Nothing to update");

      if (errors.length)
        throw new ApiError(StatusCodes.BAD_REQUEST, "wrong informations");

      res.status(200).json(await ServiceServices.update(id, service));
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
          "service id must be provided"
        );

      if (await ServiceServices.delete(id))
        res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}
