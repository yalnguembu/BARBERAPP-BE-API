import { categoryModel as CategoryModel } from "./categoryModel";
import { type CategoryDTO } from "./dto";
import { ApiError, CategorySchema } from "../../utils";
import { Category } from "./Category";
import { StatusCodes } from "http-status-codes";

export abstract class CategorySevices {
  static async create(data: CategorySchema) {
    const category = (await new CategoryModel(
      data
    ).save()) as unknown as CategorySchema;
    return new Category(category).details();
  }

  static async getAll() {
    return (await CategoryModel.find()) as unknown as CategoryDTO[];
  }

  static async getByTile(title: string) {
    return (
      ((await CategoryModel.findOne({ title })) as unknown as CategoryDTO) ?? ""
    );
  }

  static async update(id: string, data: CategoryDTO) {
    const category = CategoryModel.findByIdAndUpdate(id, data);
    if (!category)
      throw new ApiError(StatusCodes.BAD_REQUEST, "Wrong categry id");
    return category;
  }

  static async delete(id: string) {
    const succes = CategoryModel.findByIdAndDelete(id);
    if (!succes) throw new ApiError(StatusCodes.BAD_REQUEST, "wrong category");
    return succes;
  }
}
