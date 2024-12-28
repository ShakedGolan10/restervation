import { IsArray, IsNotEmpty, IsString, Length } from 'class-validator';

export class AddReservPayload {
  @IsNotEmpty()
  tableId: string;

  @IsString()
  @Length(10, 10, { message: 'The string must be exactly 10 characters long.' })
  phone: string;

  @IsNotEmpty()
  slotId: string;

  @IsString()
  restName: string;

  @IsNotEmpty()
  time: string;
}
