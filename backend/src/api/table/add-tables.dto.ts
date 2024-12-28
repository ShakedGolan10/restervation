import { IsArray } from 'class-validator';

export class AddTablesDto {
  @IsArray()
  tables: number[]; // Array of table capacities
}
