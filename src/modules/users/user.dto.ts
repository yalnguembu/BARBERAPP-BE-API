import { IsNotEmpty, IsEmail } from "class-validator";

export class UserDTO {
  @IsNotEmpty()
  _id!: string;

  @IsNotEmpty()
  username?: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;
}
