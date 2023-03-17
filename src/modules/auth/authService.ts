import { UserDTO, userModel as UserModel, User, UserSchema } from "../users";
import bcrypt from "bcrypt";

export class AuthService {
  static async register(user: Pick<User, "email" | "password">) {
    const salt = await bcrypt.genSalt(10);
    const hahsedPassword = await bcrypt.hash(user.password, salt);
    const newUser = new UserModel({
      email: user.email,
      password: hahsedPassword,
    });
    return await newUser.save();
  }

  static async login(userCrudential: Pick<User, "email" | "password">) {
    const user = (await UserModel.findOne({
      email: userCrudential.email,
    })) as unknown as UserSchema;

    if (!user) throw new Error("wrong crudentials");

    const validate = bcrypt.compare(
      userCrudential.password,
      user.password ?? ""
    );

    if (!validate) {
      throw new Error("wrong crudentials");
    }

    const { _id, email, username } = user;
    return { _id, email, username };
  }

  static async editPassowrd(id: string, newPassword: string) {
    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(newPassword, salt);

    const { email, username, _id } = (await UserModel.findByIdAndUpdate(
      id,
      {
        $set: { password: hashedPassword },
      },
      { new: true }
    )) as unknown as UserDTO;
    return { email, username, id: _id };
  }
}
