import { Response } from 'express';
import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { ParseDatePipe } from '../../nest/pipes/parse-date.pipe';

@Controller('slots')
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @Get(':restId')
  async getSlots(
    @Param('restId') restId: string,
    @Query('time', ParseDatePipe) time: Date,
    @Res() res: Response,
  ) {
    try {
      const allSlotsForDate = await this.slotsService.getSlotsPerRest(
        restId,
        time,
      );
      res.status(200).json(allSlotsForDate);
    } catch (err) {
      console.log('Error caught at controller:', err);
      res.status(500).send({ err: `Failed at slot route ${err}` });
    }
  }
}
