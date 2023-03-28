import { IsNotEmpty, IsString, IsNumber, IsPositive, IsDate } from "class-validator";
import { ServiceDTO } from "../../services";
import { UpdateUserDTO } from "../../users";

export class ReservationDTO {
  @IsNotEmpty()
  service!: ServiceDTO;

  @IsNotEmpty()
  @IsString()
  date!: string;

  @IsString()
  @IsNotEmpty()
  time!: string;

  @IsNotEmpty()
  client!: UpdateUserDTO;

  @IsNotEmpty()
  @IsString()
  maker!: string;
}
