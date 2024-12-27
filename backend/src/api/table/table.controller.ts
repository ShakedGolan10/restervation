import { Response } from 'express';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { AddTablesDto } from './add-tables.dto';
import { TablesService } from './table.service';

@Controller('table')
export class TablesController {
  constructor(private readonly tableService: TablesService) {}

  @Post(':restId')
  async addTables(
    @Param('restId') restId: string,
    @Body() addTablesDto: AddTablesDto,
    @Res() res: Response,
  ) {
    try {
      await this.tableService.addTables(restId, addTablesDto.tables);
      res.status(201).json('Success');
    } catch (error) {
      res.status(500).send({ err: `Failed to at table route ${error}` });
    }
  }
}
