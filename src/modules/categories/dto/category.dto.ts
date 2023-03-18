import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class CategoryDTO {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsString()
  summary?: string;
}
