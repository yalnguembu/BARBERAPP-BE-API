import { userModel as UserModel } from "./userModel";
import { User, type UserDTO } from "../users/";
import { UserSchema } from "../../utils";

export abstract class UserSevices {
  static async getById(id: string) {
    const { email, username, _id } = (await UserModel.findById(
      id
    )) as unknown as UserDTO;
    return { email, username, id: _id };
  }

  static async getByEmail(userEmail: string) {
    const finedUser = (await UserModel.findOne({
      email: userEmail,
    })) as UserSchema;

    if (finedUser) return new User(finedUser).details();
    return "";
  }

  static async getAll() {
    const users = (await UserModel.find()) as unknown as UserDTO[];
    return users.map((user: UserDTO) => {
      const { email, username, _id } = user;
      return { email, username, id: _id };
    });
  }

  static async update(id: number, user: { username: string; email: string }) {
    const { email, username, _id } = (await UserModel.findByIdAndUpdate(
      id,
      { $set: user },
      { new: true }
    )) as unknown as UserDTO;
    return { email, username, id: _id };
  }

  static async delete(id: string) {}
}
