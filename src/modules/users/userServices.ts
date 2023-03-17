import { userModel as User } from "./userModel";
import type { UserDTO } from "../users/";

export abstract class UserSevices {
  static async getById(id: string) {
    const { email, username, _id } = (await User.findById(
      id
    )) as unknown as UserDTO;
    return { email, username, id: _id };
  }

  static async getByEmail(userEmail: string) {
    const { email, username, _id } = (await User.findOne({
      email: userEmail,
    })) as unknown as UserDTO;
    return { email, username, id: _id };
  }

  static async getAll() {
    const users = (await User.find()) as unknown as UserDTO[];
    return users.map((user: UserDTO) => {
      const { email, username, _id } = user;
      return { email, username, id: _id };
    });
  }

  static async update(id: number, user: { username: string; email: string }) {
    const { email, username, _id } = (await User.findByIdAndUpdate(
      id,
      { $set: user },
      { new: true }
    )) as unknown as UserDTO;
    return { email, username, id: _id };
  }

  static async delete(id: string) {}
}
