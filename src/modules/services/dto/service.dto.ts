import { IsNotEmpty, IsString, IsNumber, IsPositive } from "class-validator";

export class ServiceDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsString()
  description?: string;

  @IsString()
  picture?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price!: number;

  @IsNotEmpty()
  @IsString()
  category!: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  duration!: number;
}
