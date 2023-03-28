import { serviceModel as ServiceModel } from "./serviceModel";
import { type ServiceDTO } from "./dto";
import { ApiError, ServiceSchema } from "../../utils";
import { Service } from "./Service";
import { StatusCodes } from "http-status-codes";

export abstract class ServiceServices {
  static async create(data: ServiceSchema) {
    const service = (await new ServiceModel(
      data
    ).save()) as unknown as ServiceSchema;
    return new Service(service).details();
  }

  static async getAll() {
    return await ServiceModel.find();
  }

  static async getById(id: string) {
    return (await ServiceModel.findById(id)) ?? "";
  }

  static async getByName(name: string) {
    return (
      ((await ServiceModel.findOne({ name })) as unknown as ServiceDTO) ?? ""
    );
  }

  static async update(id: string, data: ServiceDTO) {
    const service = ServiceModel.findByIdAndUpdate(id, data);
    if (!service)
      throw new ApiError(StatusCodes.BAD_REQUEST, "incorrect category id");
    return service;
  }

  static async delete(id: string) {
    const succes = ServiceModel.findByIdAndDelete(id);
    if (!succes)
      throw new ApiError(StatusCodes.BAD_REQUEST, "incorrect service id");
    return succes;
  }
}
