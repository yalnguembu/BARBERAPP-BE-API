import { reservationModel as ReservationModel } from "./reservationModel";
import { type ReservationDTO } from "./dto";
import { ApiError, ReservationSchema } from "../../utils";
import { Reservation } from "./Reservation";
import { StatusCodes } from "http-status-codes";
import { UpdateReservationDTO } from "./dto/updateReservation.dto";

export abstract class ReservationServices {
  static async create(data: ReservationSchema) {
    const service = (await new ReservationModel(
      data
    ).save()) as unknown as ReservationSchema;
    return new Reservation(service).details();
  }

  static async getAll() {
    const today = new Date().toISOString();
    return (
      (await ReservationModel.find({
        date: {
          $gt: today,
        },
      })) ?? ""
    );
  }

  static async getArchived() {
    const today = new Date().toISOString();
    return (
      (await ReservationModel.find({
        date: {
          $lt: today,
        },
      })) ?? ""
    );
  }

  static async getArchivedByUserId(userId: string) {
    const today = new Date().toISOString();
    return (
      (await ReservationModel.find({
        date: {
          $lt: today,
        },
        "client.id": userId,
      })) ?? ""
    );
  }

  static async getByUserId(userId: string) {
    const today = new Date().toISOString();
    return (
      (await ReservationModel.find({
        "client.id": userId,
        date: {
          $gt: today,
        },
      })) ?? ""
    );
  }

  static async getById(id: string) {
    return (await ReservationModel.findById(id)) ?? "";
  }

  static async getByName(name: string) {
    return (
      ((await ReservationModel.findOne({
        name,
      })) as unknown as ReservationDTO) ?? ""
    );
  }

  static async update(id: string, data: UpdateReservationDTO) {
    const service = await ReservationModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!service)
      throw new ApiError(StatusCodes.BAD_REQUEST, "incorrect reservation id");
    return service;
  }

  static async delete(id: string) {
    const succes = ReservationModel.findByIdAndDelete(id);
    if (!succes)
      throw new ApiError(StatusCodes.BAD_REQUEST, "incorrect service id");
    return succes;
  }

  static async cancel(id: string) {
    const succes = ReservationModel.findByIdAndUpdate(
      id,
      {
        isCanceled: true,
      },
      {
        new: true,
      }
    );
    if (!succes)
      throw new ApiError(StatusCodes.BAD_REQUEST, "incorrect service id");
    return succes;
  }
}
