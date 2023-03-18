import { IsEmail, IsNotEmpty, Length, IsString } from "class-validator";
import { User } from "../../users/User";

export class AuthDTO implements Pick<User, "email" | "password"> {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email!: string;

  @IsNotEmpty()
  @Length(8)
  @IsString()
  password!: string;
}
