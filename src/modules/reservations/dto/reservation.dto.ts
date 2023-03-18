import { IsNotEmpty, IsString, IsNumber, IsPositive, IsDate } from "class-validator";

export class ReservationDTO {
  @IsNotEmpty()
  @IsString()
  service!: string;

  @IsNotEmpty()
  @IsString()
  @IsDate()
  date!: string;

  @IsString()
  @IsNotEmpty()
  time!: string;

  @IsPositive()
  @IsNotEmpty()
  @IsString()
  client!: string;

  @IsNotEmpty()
  @IsString()
  maker!: string;
}
