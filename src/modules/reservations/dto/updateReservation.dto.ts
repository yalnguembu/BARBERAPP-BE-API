import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  IsDate,
  IsObject,
} from "class-validator";
import { ServiceDTO } from "../../services";

export class UpdateReservationDTO {
  @IsNotEmpty()
  service!: ServiceDTO;

  @IsNotEmpty()
  @IsString()
  date!: string;

  @IsString()
  @IsNotEmpty()
  time!: string;
}
