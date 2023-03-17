import { IsNotEmpty, Length } from "class-validator";

export class EditPassowrd {
  @IsNotEmpty()
  @Length(8)
  newPassword!: string;
}
