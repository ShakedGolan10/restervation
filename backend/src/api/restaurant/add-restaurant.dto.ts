import { IsNotEmpty, IsString, IsArray } from 'class-validator/types';

export class AddRestaurantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsArray()
  openingHours: string[];
}
