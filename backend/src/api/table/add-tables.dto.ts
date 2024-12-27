import { IsArray } from 'class-validator/types';

export class AddTablesDto {
  @IsArray()
  tables: number[]; // Array of table capacities
}
