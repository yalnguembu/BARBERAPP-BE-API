import { validate } from "class-validator";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError, areBothObjectsEqual } from "../../utils";
import { ReservationServices } from "./reservationServices";
import { ReservationDTO } from "./dto";

export class ReservationController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const reservation = new ReservationDTO();
      reservation.service = req.body.service ?? "";
      reservation.date = req.body.date ?? "";
      reservation.time = req.body.time ?? "";
      reservation.client = req.body.client ?? "service-default.png";
      reservation.maker = req.body.maker ?? "";
      const errors = await validate(reservation);

      if (errors.length)
        throw new ApiError(StatusCodes.BAD_REQUEST, "bad request");

      res.status(200).json(await ReservationServices.create(reservation));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json(await ReservationServices.getAll());
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id ?? "";

      if (!id)
        new ApiError(StatusCodes.BAD_REQUEST, "service id must be provided");

      res.status(200).json(await ReservationServices.getById(id));
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id ?? "";
      const reservation = new ReservationDTO();
      reservation.service = req.body.service ?? "";
      reservation.date = req.body.date ?? "";
      reservation.time = req.body.time ?? "";
      reservation.client = req.body.client ?? "";
      reservation.maker = req.body.maker ?? "";
      const errors = await validate(reservation);

      if (!id)
        new ApiError(StatusCodes.BAD_REQUEST, "service id must be provided");

      if (errors.length)
        throw new ApiError(StatusCodes.BAD_REQUEST, "wrong informations");

      res.status(200).json(await ReservationServices.update(id, reservation));
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
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}
