import { Response } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ReservationsService } from './reservation.service';
import { AddReservPayload } from './add-reserv.dto';
import { DbService } from '../../nest/services/db.service';
import { Reservations } from '../../db/models/reservations';
import { ReservationsModel } from '../../db/models/index.typegoose';
import { StringToDatePipe } from '../../nest/pipes/body-parse-date.pipe';

@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly reservService: ReservationsService,
    readonly dbService: DbService,
  ) {}
  @Get(':phone')
  async getReservationsByPhone(
    @Param('phone') phone: string,
    @Res() res: Response,
  ) {
    try {
      const reservations = await this.dbService.queryAllDocs<
        typeof Reservations
      >({ reservedBy: phone }, ReservationsModel);
      res.status(200).json(reservations);
    } catch (err) {
      console.log('Error caught at controller:', err);
      res.status(500).send({ err: `Failed at reservation route ${err}` });
    }
  }

  @Delete(':id')
  async deleteReservation(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.reservService.removeReservation(id);
      res.status(200).json('success');
    } catch (err) {
      console.log('Error caught at controller:', err);
      res.status(500).send({ err: `Failed at reservation route ${err}` });
    }
  }

  @Post()
  async addReservation(
    @Body(StringToDatePipe) addReservPayload: AddReservPayload,
    @Res() res: Response,
  ) {
    try {
      const { tableId, phone, slotId, restName, time } = addReservPayload;
      const newReservation = await this.dbService.createDocIfNotExists<
        typeof Reservations
      >(
        { time, tableId, phone, slotId, restName },
        { tableId, time: new Date(addReservPayload.time) },
        ReservationsModel,
      );
      res.status(200).json(newReservation);
    } catch (err) {
      console.log('Error caught at controller:', err);
      res.status(500).send({ err: `Failed at reservation route ${err}` });
    }
  }
}
