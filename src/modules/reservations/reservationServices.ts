import { reservationModel as ReservationModel } from "./reservationModel";
import { type ReservationDTO } from "./dto";
import { ApiError, ReservationSchema } from "../../utils";
import { Reservation } from "./Reservation";
import { StatusCodes } from "http-status-codes";

export abstract class ReservationServices {
  static async create(data: ReservationSchema) {
    const service = (await new ReservationModel(
      data
    ).save()) as unknown as ReservationSchema;
    return new Reservation(service).details();
  }

  static async getAll() {
    return await ReservationModel.find();
  }

  static async getById(id: string) {
    return (await ReservationModel.findById(id)) ?? "";
  }

  static async getByUserId(userId: string) {
    return (await ReservationModel.find({ "client.id": userId })) ?? "";
  }

  static async getByName(name: string) {
    return (
      ((await ReservationModel.findOne({
        name,
      })) as unknown as ReservationDTO) ?? ""
    );
  }

  static async update(id: string, data: ReservationDTO) {
    const service = ReservationModel.findByIdAndUpdate(id, data);
    if (!service)
      throw new ApiError(StatusCodes.BAD_REQUEST, "incorrect category id");
    return service;
  }

  static async delete(id: string) {
    const succes = ReservationModel.findByIdAndDelete(id);
    if (!succes)
      throw new ApiError(StatusCodes.BAD_REQUEST, "incorrect service id");
    return succes;
  }
}
