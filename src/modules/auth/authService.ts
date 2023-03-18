import { UserDTO, userModel as UserModel, User } from "../users";
import bcrypt from "bcrypt";
import { ApiError, encodeToken, UserSchema } from "../../utils";
import { StatusCodes } from "http-status-codes";

export class AuthService {
  static async register(crudentials: Pick<User, "email" | "password">) {
    const salt = await bcrypt.genSalt(10);
    const hahsedPassword = await bcrypt.hash(crudentials.password, salt);
    const newUser = new UserModel({
      email: crudentials.email,
      password: hahsedPassword,
    });

    const { _id, email, username } = await newUser.save();
    const token = encodeToken({ _id: _id as unknown as string, email });
    return { _id, email, username, token };
  }

  static async login(userCrudential: Pick<User, "email" | "password">) {
    const user = (await UserModel.findOne({
      email: userCrudential.email,
    })) as unknown as UserSchema;

    if (!user)
      throw new ApiError(StatusCodes.UNAUTHORIZED, "wrong crudentials");

    const validate = await bcrypt.compare(
      userCrudential.password,
      user.password ?? ""
    );

    if (!validate) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "wrong crudentials");
    }

    console.log(
      await bcrypt.compare(userCrudential.password, user.password ?? "")
    );

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
