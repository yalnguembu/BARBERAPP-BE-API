import { IsNotEmpty, IsEmail } from "class-validator";

export class CategoryDTO {
  @IsNotEmpty()
  _id!: string;

  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  @IsEmail()
  summary?: string;
}
