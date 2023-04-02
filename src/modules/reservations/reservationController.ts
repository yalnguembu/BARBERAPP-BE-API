import { validate } from "class-validator";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError, areBothObjectsEqual } from "../../utils";
import { ReservationServices } from "./reservationServices";
import { ReservationDTO } from "./dto";
import { UserSevices } from "../users";
import { UpdateReservationDTO } from "./dto/updateReservation.dto";

export class ReservationController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const reservation = new ReservationDTO();
      reservation.service = req.body.service ?? "";
      reservation.date = req.body.date ?? "";
      reservation.time = req.body.time ?? "";
      reservation.client = req.body.client ?? "";
      reservation.maker = req.body.maker ?? "";
      const errors = await validate(reservation);

      if (errors.length)
        throw new ApiError(StatusCodes.BAD_REQUEST, "bad request");

      res
        .status(StatusCodes.ACCEPTED)
        .json(await ReservationServices.create(reservation));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    const userId = req.query["user-id"];
    try {
      if (userId) {
        res
          .status(StatusCodes.ACCEPTED)
          .json(
            await ReservationServices.getByUserId(userId as unknown as string)
          );
      } else {
        res
          .status(StatusCodes.ACCEPTED)
          .json(await ReservationServices.getAll());
      }
    } catch (error) {
      next(error);
    }
  }

  static async getArchived(req: Request, res: Response, next: NextFunction) {
    const userId = req.query["user-id"];
    try {
      if (userId) {
        res
          .status(StatusCodes.ACCEPTED)
          .json(
            await ReservationServices.getArchivedByUserId(
              userId as unknown as string
            )
          );
      } else {
        res
          .status(StatusCodes.ACCEPTED)
          .json(await ReservationServices.getArchived());
      }
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id ?? "";

      if (!id)
        new ApiError(StatusCodes.BAD_REQUEST, "service id must be provided");

      res
        .status(StatusCodes.ACCEPTED)
        .json(await ReservationServices.getById(id));
    } catch (error) {
      next(error);
    }
  }

  static async getByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.query.id ?? "";

      if (!userId)
        new ApiError(StatusCodes.BAD_REQUEST, "service id must be provided");

      const user = await UserSevices.getById(userId as unknown as string);

      if (!user) new ApiError(StatusCodes.BAD_REQUEST, "wrong user id");

      res
        .status(StatusCodes.ACCEPTED)
        .json(
          await ReservationServices.getByUserId(userId as unknown as string)
        );
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id ?? "";
      if (!id)
        new ApiError(StatusCodes.BAD_REQUEST, "service id must be provided");

      const reservation = new UpdateReservationDTO();
      reservation.service = req.body.service ?? "";
      reservation.date = req.body.date ?? "";
      reservation.time = req.body.time ?? "";
      const errors = await validate(reservation);

      if (errors.length)
        throw new ApiError(StatusCodes.BAD_REQUEST, "wrong informations");
      res
        .status(StatusCodes.ACCEPTED)
        .json(await ReservationServices.update(id, reservation));
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
      res
        .status(StatusCodes.ACCEPTED)
        .json(await ReservationServices.cancel(id));
    } catch (error) {
      next(error);
    }
  }

  static async cancel(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      if (!id)
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          "service id must be provided"
        );
      res
        .status(StatusCodes.ACCEPTED)
        .json(await ReservationServices.cancel(id));
    } catch (error) {
      next(error);
    }
  }
}
