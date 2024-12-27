import { Injectable } from '@nestjs/common';

import { ClientSession, Types } from 'mongoose';
import { DbService } from '../../nest/services/db.service';
import { Reservations } from '../../db/models/reservations';
import { MongoSession, ReservationsModel, SlotsModel } from '../../db/models/index.typegoose';
import { Slots } from '../../db/models/slots';

@Injectable()
export class ReservationsService {
  constructor(private readonly dbService: DbService) {}

  async addNewReservation(
    time: Date,
    tableId: string,
    phone: string,
    slotId: string,
    restName: string,
  ) {
    return await this.dbService.createDocIfNotExists<typeof Reservations>(
      { time, tableId, reservedBy: phone, slotId, restName },
      { tableId, time },
      ReservationsModel,
    );
  }

  async removeReservation(id: string) {
    const sessionObj = await MongoSession.createInstance();
    try {
      const deletedDoc = await this.dbService.removeDoc(
        id,
        ReservationsModel,
        sessionObj,
      );
      if (!deletedDoc.$isDeleted()) {
        throw new Error('Id wasnt found to delete');
      }
      await this.changeTableAvailability(
        deletedDoc.tableId,
        deletedDoc.slotId,
        sessionObj.session,
      ).catch((err) => {
        throw new Error(`Failed to edit Slot ${err}`);
      });

      await sessionObj.commitTransaction();
    } catch (error) {
      await sessionObj.abortTransaction();
      throw error;
    }
  }

  async addReservation(
    time: Date,
    tableId: string,
    phone: string,
    slotId: string,
    restName: string,
  ) {
    const sessionObj = await MongoSession.createInstance();
    try {
      const newReservation = await this.dbService.createDocIfNotExists(
        { time, tableId, phone, slotId, restName },
        { tableId, time },
        ReservationsModel,
        sessionObj,
      );
      await this.changeTableAvailability(
        tableId,
        slotId,
        sessionObj.session,
      ).catch((err) => {
        throw new Error(`Failed to edit Slot ${err}`);
      });
      await sessionObj.commitTransaction();
      return newReservation;
    } catch (err) {
      await sessionObj.abortTransaction();
      throw err;
    }
  }

  async changeTableAvailability(
    tableId: string,
    slotId: string,
    session: ClientSession,
  ) {
    try {
      const slotTables = (
        await this.dbService.queryById<typeof Slots>(slotId, SlotsModel)
      ).tables;
      const updatedTables = slotTables.map((table) => {
        if (table.id === tableId) table.isAvailable = !table.isAvailable;
        return table;
      });
      await SlotsModel.findByIdAndUpdate(slotId, {
        $set: { tables: updatedTables },
      }).session(session);
    } catch (error) {
      throw new Error(
        `Error while trying to change tables availability ${error}`,
      );
    }
  }
}