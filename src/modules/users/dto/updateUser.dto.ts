import { IsNotEmpty, IsEmail } from "class-validator";

export class UpdateUserDTO {
  @IsNotEmpty()
  username?: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  picture!: string;
}
