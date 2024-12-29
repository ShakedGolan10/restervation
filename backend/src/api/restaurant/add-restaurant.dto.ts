import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class AddRestaurantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  openingHours: string;
}
